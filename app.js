// Entry point: app.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

// Session & Flash
app.use(session({
  secret: process.env.SESSION_SECRET || "super-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// View Engine
app.set("view engine", "ejs");

// Global template variables
app.use((req, res, next) => {
  res.locals.messages = {
    success_msg: req.flash("success_msg"),
    error_msg: req.flash("error_msg"),
    error: req.flash("error") // used by Passport for login errors
  };
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/lessons", require("./routes/lessonRoutes"));
app.use("/logs", require("./routes/practiceLogRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

app.get("/", (req, res) => res.render("index"));

app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);

  res.locals.user = req.user || null;
  res.locals.messages = {
    success_msg: req.flash?.("success_msg") || null,
    error_msg: req.flash?.("error_msg") || err.message || null,
    error: err.message || "Something went wrong"
  };

  if (res.headersSent) return next(err);
  res.status(500).render("error", { error: err.message || "Something went wrong" });
});

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

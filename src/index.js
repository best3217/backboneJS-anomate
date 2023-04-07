const Backbone = require("backbone");

const AppRouter = require("./app.router");

Backbone.$(function () {
  new AppRouter();

  Backbone.history.start();
});

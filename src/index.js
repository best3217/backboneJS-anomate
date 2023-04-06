var Backbone = require('backbone');

var AppRouter = require('./app.router');

Backbone.$(function () {
  new AppRouter();
  
  Backbone.history.start();
});
const Backbone = require('backbone');

const AppView = require('./views/app.view');

const routerOptions = {
  routes: {
    '*path': function () {
      new AppView();
    }
  }
};

module.exports = Backbone.Router.extend(routerOptions);
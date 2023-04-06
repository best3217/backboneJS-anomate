const Backbone = require("backbone");

const viewOptions = {
  el: "body",

  initialize: function () {
    this.render();
  },

  render: function () {
    const renderedHtml = "App Ready";
    this.$el.html(renderedHtml);
  },
};

module.exports = Backbone.View.extend(viewOptions);

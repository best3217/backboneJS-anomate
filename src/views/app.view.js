const Backbone = require("backbone");
let ChartWidget = require("./chartWidget.view");

const data = {
  datasets: [
    {
      label: "Opened",
      backgroundColor: ["rgba(125, 226, 255, 1)"],
      data: [80],
    },
    {
      label: "Clicked",
      backgroundColor: ["rgba(179, 127, 235, 1)"],
      data: [60],
    },
    {
      label: "Purchased",
      backgroundColor: ["rgba(255, 133, 192, 1)"],
      data: [50],
    },
    {
      label: "Unsubscribed",
      backgroundColor: ["rgba(255, 229, 143, 1)"],
      data: [20],
    },
  ],
};

const viewOptions = {
  el: "body",

  initialize: function () {
    this.render();
  },

  render: function () {
    const chartWidget = new ChartWidget({
      type: "doughnut",
      chartTitle: {
        title: 625,
        label: "Received",
      },
      header: {
        title: "<h3>Campaign performance</h3>",
        label: "<span>Label</span>",
      },
      data: data,
      labels: true
    });
    chartWidget.render();
    this.$el.append(chartWidget.$el);
  },
};

module.exports = Backbone.View.extend(viewOptions);

const Backbone = require("backbone");
const _ = require("underscore");
const $ = require("jquery");
const Template = require("../templates/widgets/chart.html");
const Chart = require("chart.js/auto");

Chart.controllers.DoughnutController.prototype.calculateTotal = function () {
  return 100; // all data now has to be in the range [0, 100]
};

const ChartConfigsGlobals = {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: 4,
  padding: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  legend: {
    display: false,
  },
};

// Define chart configs

const ChartConfigs = {
  line: {
    type: "line",
    options: {
      responsive: ChartConfigsGlobals.responsive,
      maintainAspectRatio: ChartConfigsGlobals.maintainAspectRatio,
      devicePixelRatio: ChartConfigsGlobals.devicePixelRatio,
      layout: {
        padding: ChartConfigsGlobals.padding,
      },
      elements: {
        line: {
          tension: 0.5,
          borderJoinStyle: "round",
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            color: "#FFF",
          },
          ticks: {
            color: "#BFBFBF",
          },
        },
        y: {
          lineWidth: 5,
          grid: {
            color: "#D9D9D9",
          },
          ticks: {
            color: "#BFBFBF",
            stepSize: 3,
          },
        },
      },
      animation: true,
      plugins: {
        legend: ChartConfigsGlobals.legend,
      },
    },
  },
  scatter: {
    type: "scatter",
    options: {
      responsive: ChartConfigsGlobals.responsive,
      maintainAspectRatio: ChartConfigsGlobals.maintainAspectRatio,
      devicePixelRatio: ChartConfigsGlobals.devicePixelRatio,
      layout: {
        padding: ChartConfigsGlobals.padding,
      },
      elements: {
        line: {
          tension: 0.5,
          borderJoinStyle: "round",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#BFBFBF",
          },
        },
      },
      animation: true,
      plugins: [
        {
          legend: ChartConfigsGlobals.legend,
        },
      ],
    },
  },
  doughnut: {
    type: "doughnut",
    options: {
      responsive: ChartConfigsGlobals.responsive,
      maintainAspectRatio: true,
      devicePixelRatio: 1,
      layout: {
        padding: ChartConfigsGlobals.padding,
      },
      elements: {
        arc: {
          borderWidth: 5,
          hoverBorderColor: "#FFF",
          borderRadius: 50,
          borderColor: "#FFF",
          background: "#0000",
        },
      },
      animation: true,
      plugins: {
        legend: {
          position: "top",
          display: true,
        },
      },
    },
  },
};

module.exports = Backbone.View.extend({
  tagName: "div",
  // Define template data
  data: {
    header: {
      title: "<h3>Chart Widget </h3>",
      label: "<span>Label </span>",
    },
  },
  initialize: function (config) {
    // Define config
    this.config = config;
    // Check if header exist
    if (this.config.header) {
      this.data.header = this.config.header;
      this.data.chartTitle = this.config.chartTitle
    }

    // Check if labels are allowed
    if (this.config.labels) {
      this.navigation();
    }

    // Define chart settings
    this._chart = ChartConfigs[this.config.type];
    this._chart.data = this.config.data;
  },
  renderRadialProgressChart: function () {},
  navigation: function () {
    this.data.labels = {};

    if (this.config.data.datasets) {
      _.each(
        this.config.data.datasets,
        function (value, key) {
          this.data.labels[key] = {
            title: value.label,
            style: value.backgroundColor[0],
            id: key,
          };
        },
        this
      );
    }
  },
  events: {
    "click a": function (e) {
      this.label = this.$(e.currentTarget);
      if (this.label.data("status")) {
        this.chart.hide(this.label.data("index"));
        this.label.data("status", false);
      } else {
        this.chart.show(this.label.data("index"));
        this.label.data("status", true);
      }
      e.preventDefault();
      e.stopPropagation();
    },
  },
  // Render widget
  render: function () {
    // Widget Template
    this.template = _.template(Template.default);
    this.$el.html(this.template(this.data));

    // Init chart.
    if (typeof Chart === "function") {
      this.chart = new Chart(this.$("canvas"), this._chart);
    }
    return this;
  },
});

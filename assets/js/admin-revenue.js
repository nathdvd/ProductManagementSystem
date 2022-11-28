import "https://cdn.plot.ly/plotly-2.16.3.min.js"

var data = [
    {
      x: ['July', 'August', 'September', 'October', 'November'],
      y: [753.50, 921.25, 879.00, 1035.75, 684.25],
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('revenue-graph', data);
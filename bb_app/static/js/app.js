var buildMetadata = (sample) => {

    var url = `/metadata/${sample}`;

    d3.json(url).then(sample => {
      console.log(sample);
      var selectData = d3.select('#sample-metadata');
      selectData.html("");
      Object.entries(sample).forEach(([key, value]) => {
        console.log(key, value);
        var row = selectData.append("p");
        row.text(`${key}: ${value}`);
      });
  });
};

var ultimateColors = [
    ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
    ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
    ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
    ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
];

var buildCharts = (sample) => {
  var url = `/samples/${sample}`;
  d3.json(url).then(data => {
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      },
    };
    var data1 = [trace1];

    Plotly.newPlot('bubble', data1);  
  });
    d3.json(url).then(data => {
      var trace2 = {
        values: data.sample_values.slice(0,10),
        labels: data.otu_ids.slice(0,10),
        text: data.otu_labels.slice(0,10),
        marker: {
          colors: ultimateColors[0]
        },
        type: 'pie'
      };
      var data2 = [trace2];
    Plotly.newPlot('pie', data2)
  });
};
var init = () => {
  var selector = d3.select("#selDataset");
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};
var optionChanged = (newSample) => {
  buildCharts(newSample);
  buildMetadata(newSample);
};

init();


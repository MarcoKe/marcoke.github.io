var x = [1, 4, 5, 6];
var data = { title: 'A set of vectors',
  xaxis: {
    range: [-5, 5],
    autorange: false
  },
  yaxis: {
    range: [-5, 5],
    autorange: false
  },

  annotations: [{
      text: 'a',
    axref: 'x',
    ax: 0.0,

    aref: 'x',
    x: 0.0,

    ayref: 'y',
    ay: 0.0,

    aref: 'y',
    y: 1.0,
    arrowcolor: 'red',


}, {
  axref: 'x',
  ax: 0.0,

  aref: 'x',
  x: 2.0,

  ayref: 'y',
  ay: 0.0,

  aref: 'y',
  y: 3.0,
  arrowcolor: 'green',


}, {
  axref: 'x',
  ax: 0,

  aref: 'x',
  x: 1,

  ayref: 'y',
  ay: 0,

  aref: 'y',
  y: 0,


}]
};

var data2 = { title: 'Rotation',
  xaxis: {
    range: [-5, 5],
    autorange: false
  },
  yaxis: {
    range: [-5, 5],
    autorange: false
  },

  annotations: [{
      text: 'a',
    axref: 'x',
    ax: 0.0,

    aref: 'x',
    x: -1.0,

    ayref: 'y',
    ay: 0.0,

    aref: 'y',
    y: 0.0,
    arrowcolor: 'red',


}, {
  axref: 'x',
  ax: 0.0,

  aref: 'x',
  x: -3.0,

  ayref: 'y',
  ay: 0.0,

  aref: 'y',
  y: 2.0,
  arrowcolor: 'green',


}, {
  axref: 'x',
  ax: 0,

  aref: 'x',
  x: 0,

  ayref: 'y',
  ay: 0,

  aref: 'y',
  y: 1,


}]
};


Plotly.plot('graph', [{
  type: 'scatter'
}], data)

Plotly.plot('graph2', [{
  type: 'scatter'
}], data2)

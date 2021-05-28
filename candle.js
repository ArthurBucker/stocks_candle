//Init stocks
const stocks = new Stocks;

const txt = document.querySelector('.pesquisar-txt'),
      select = document.querySelector('#time-frame'),
      grafico = document.querySelector('#chart'),
      button = document.querySelector('.pesquisar');
      

//Fetch data e renderizar gráfico pelo botão pesquisar
button.addEventListener('click', (e) => {
  grafico.innerHTML ='';
  stocks.getDia(txt.value)
  .then(dados => {
    const stocksTempo = dados.dia['Time Series (Daily)'];
    
    let dias = [];
    let medidas = [];
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let posicao = 0

    for (key in stocksTempo) {
      dias.push(key);
    }
    for (key in stocksTempo[dias[0]]) {
      medidas.push(key)
    }
    for (key in stocksTempo) {
      open.push(stocksTempo[key][medidas[0]]);
      high.push(stocksTempo[key][medidas[1]]);
      low.push(stocksTempo[key][medidas[2]]);
      close.push(stocksTempo[key][medidas[3]]);
    }
    let data = []
   
    for (key in stocksTempo) {
      data[posicao] = ({
        x: key,
        y: [open[posicao], high[posicao], low[posicao], close[posicao]]
      })
      posicao++
    }
    console.log(posicao)
    var options = {
      series: [{
      data
    }],
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
    };
 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
  })
  
  e.preventDefault()
})

// Trocar tempos
let tempo = '';

select.addEventListener('change', () => {
  grafico.innerHTML = '';
  if (select.value === '60min') {
    tempo = 'TIME_SERIES_INTRADAY';
  } else if (select.value === 'dia') {
    tempo = 'TIME_SERIES_DAILY';
  } else if (select.value === 'semana') {
    tempo = 'TIME_SERIES_WEEKLY';
  } else if (select.value === 'mes') {
    tempo = 'TIME_SERIES_MONTHLY';
  }
  
  switch (tempo) {
    //60min
    case 'TIME_SERIES_INTRADAY':
      stocks.get60min(txt.value,tempo)
  .then(dados => {
    const stocksTempo = dados.min60['Time Series (60min)'];
    
    let dias = [];
    let medidas = [];
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let posicao = 0
    for (key in stocksTempo) {
      dias.push(key);
      console.log(key)
    }
    for (key in stocksTempo[dias[0]]) {
      medidas.push(key)
    }
    for (key in stocksTempo) {
      open.push(stocksTempo[key][medidas[0]]);
      high.push(stocksTempo[key][medidas[1]]);
      low.push(stocksTempo[key][medidas[2]]);
      close.push(stocksTempo[key][medidas[3]]);
    }
    let data = []
   
    for (key in stocksTempo) {
      data[posicao] = ({
        x: key,
        y: [open[posicao], high[posicao], low[posicao], close[posicao]]
      })
      posicao++
    }
    var options = {
      series: [{
      data
    }],
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
    };
 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  );
  break;

  //Semana
  case 'TIME_SERIES_WEEKLY':
      stocks.getSemana(txt.value,tempo)
  .then(dados => {
    const stocksTempo = dados.semana['Weekly Time Series'];
    
    let dias = [];
    let medidas = [];
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let posicao = 0

    for (key in stocksTempo) {
      dias.push(key);
    }
    for (key in stocksTempo[dias[0]]) {
      medidas.push(key)
    }
    for (key in stocksTempo) {
      open.push(stocksTempo[key][medidas[0]]);
      high.push(stocksTempo[key][medidas[1]]);
      low.push(stocksTempo[key][medidas[2]]);
      close.push(stocksTempo[key][medidas[3]]);
    }
    let data = []
   
    for (key in stocksTempo) {
      data[posicao] = ({
        x: key,
        y: [open[posicao], high[posicao], low[posicao], close[posicao]]
      })
      posicao++
    }
    var options = {
      series: [{
      data
    }],
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
    };
 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  );
  break;

  //Mês
  case 'TIME_SERIES_MONTHLY':
    stocks.getMes(txt.value,tempo)
.then(dados => {
  const stocksTempo = dados.mes['Monthly Time Series'];
  
  let dias = [];
  let medidas = [];
  let open = [];
  let high = [];
  let low = [];
  let close = [];
  let posicao = 0

  for (key in stocksTempo) {
    dias.push(key);
  }
  for (key in stocksTempo[dias[0]]) {
    medidas.push(key)
  }
  for (key in stocksTempo) {
    open.push(stocksTempo[key][medidas[0]]);
    high.push(stocksTempo[key][medidas[1]]);
    low.push(stocksTempo[key][medidas[2]]);
    close.push(stocksTempo[key][medidas[3]]);
  }
  let data = []
 
  for (key in stocksTempo) {
    data[posicao] = ({
      x: key,
      y: [open[posicao], high[posicao], low[posicao], close[posicao]]
    })
    posicao++
  }
  var options = {
    series: [{
    data
  }],
  chart: {
    type: 'candlestick',
    height: 350
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

);
break;

default:

 stocks.getDia(txt.value)
  .then(dados => {
    const stocksTempo = dados.dia['Time Series (Daily)'];
    
    let dias = [];
    let medidas = [];
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let posicao = 0

    for (key in stocksTempo) {
      dias.push(key);
    }
    for (key in stocksTempo[dias[0]]) {
      medidas.push(key)
    }
    for (key in stocksTempo) {
      open.push(stocksTempo[key][medidas[0]]);
      high.push(stocksTempo[key][medidas[1]]);
      low.push(stocksTempo[key][medidas[2]]);
      close.push(stocksTempo[key][medidas[3]]);
    }
    let data = []
   
    for (key in stocksTempo) {
      data[posicao] = ({
        x: key,
        y: [open[posicao], high[posicao], low[posicao], close[posicao]]
      })
      posicao++
    }
    console.log(posicao)
    var options = {
      series: [{
      data
    }],
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
    };
 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
  });

}


})


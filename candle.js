//Init stocks
const stocks = new Stocks;

const txt = document.querySelector('.pesquisar-txt'),
      select = document.querySelector('#time-frame'),
      grafico = document.querySelector('#chart'),
      txtErro = document.querySelector('.erro'),
      txtResult = document.querySelector('.best-results'),
      button = document.querySelector('.pesquisar');
      
//Erros
function erro(res) {
  if(txt.value === '') {
    throw new Error(txtErro.innerHTML = 'Favor digitar código da ação desejada');
  }
  if(!res.ok) {
    throw  new Error(txtErro.innerHTML =`${res.statusText}`);
  }
  return res
}
//Fetch Buscar

let globalTimeout = null;

txt.addEventListener('keyup', (e) => {
  txtResult.innerHTML = '';
  if(globalTimeout !== null) {
    clearTimeout(globalTimeout)
  } 
  globalTimeout = setTimeout(searchFunc,500)

  function searchFunc(){
    globalTimeout = null;
    stocks.getCod(e.target.value)
    .then(dados => {
      const buscador = dados.cod['bestMatches'];
      
      let objetos = [];
      let stk = [];
      let posicao = 0;
      for (key in buscador) {
        objetos.push(buscador[key])
      }
      
      for (key in buscador) {
        stk.push(objetos[posicao]['1. symbol']);
        txtResult.innerHTML += `<p class="resultados">${stk[posicao]}</p>`;
        posicao++
      }
      console.log(posicao)
      
  
    })
    .catch(erro)
     
    txt.style.borderBottom = 'none';
    txtResult.style.display = 'block';

    
    
  }
    
})

txtResult.addEventListener('click', (e) => {
  txt.value = e.target.textContent;
  txtResult.style.display = 'none';
  txt.style.borderBottom = 'solid 2px #ddd';
  e.preventDefault()
})





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
  
  )
  
  .catch(erro);
  e.preventDefault()
})

// Trocar tempos
let tempo = '';

select.addEventListener('change', () => {
  grafico.innerHTML = '';
   if (select.value === 'dia') {
    tempo = 'TIME_SERIES_DAILY';
  } else if (select.value === 'semana') {
    tempo = 'TIME_SERIES_WEEKLY';
  } else if (select.value === 'mes') {
    tempo = 'TIME_SERIES_MONTHLY';
  }
  
  switch (tempo) {
  
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

    )
    .catch(erro);
    
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

)
.catch(erro);;
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
    
  })
  .catch(erro);

}


})


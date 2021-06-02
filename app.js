//Init stocks
const stocks = new Stocks;

let err = false

const txt = document.querySelector('.pesquisar-txt'),
      formulario = document.querySelector('.formulario'),
      select = document.querySelector('#time-frame'),
      grafico = document.querySelector('#chart'),
      txtErro = document.querySelector('.erro'),
      txtResult = document.querySelector('.best-results'),
      nomeAcao = document.querySelector('.nome-acao'),
      novaPesquisa = document.querySelector('.nova-p'),
      button = document.querySelector('.pesquisar');
      
//Erros
function erro(res) {
  if(txt.value === '') {
    throw new Error(
      txtErro.style.display = 'block',
      txtErro.innerHTML = 'Favor digitar código da ação desejada',
      err = true,
      setTimeout(() => {
        err = false
      },800),
      setTimeout(() => {
        txtErro.style.display = 'none';
        
      }, 3000)
      );
  }
  if(!res.ok) {
    throw  new Error(txtErro.style.display = 'block',
    txtErro.innerHTML = 'SINTO MUITO! Código inválido ou limite de pesquisa atingido',
    err = true,
    setTimeout(() => {
      err = false
    },800),
    setTimeout(() => {
      txtErro.style.display = 'none';
      
    }, 3000)
    );
  }
  return res
}
//Fetch Buscar

let globalTimeout = null;

txt.addEventListener('keypress', (e) => {
  if (e.keyCode !== 13) {
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
        
    
      })
      .catch(erro)
      
      txt.style.borderBottom = 'none';
      txtResult.style.display = 'block';
    }
  }
  
  if(e.keyCode === 13) {
    setTimeout(() => {
      txtResult.innerHTML = '';
    }, 900);
    
  }
    
})

txtResult.addEventListener('click', (e) => {
  txt.value = e.target.textContent;
  txtResult.style.display = 'none';
  grafico.innerHTML = ''
  stocks.getDia(e.target.textContent)
  .then(dados => {
    const nome = dados.dia['Meta Data']['2. Symbol'];
    const nomeU = nome.toUpperCase();
    const stocksTempo = dados.dia['Time Series (Daily)'];
    nomeAcao.textContent = nome;
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
      text: nomeU,
      align: 'left',
      style: {
        fontSize: '20px',
        color: 'rgb(59, 144, 200)',
        background: '#00E396'
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
      
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
    }
    };

 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  })

  .catch(erro);
  setTimeout(() => {
    if(err == false ) {
    formulario.style.display = 'none';
    grafico.style.background = '#333';
    txtResult.innerHTML = '';
    if (formulario.style.display === 'none') {
      select.style.display = 'block';
      select.style.opacity = '1';
      novaPesquisa.style.display = 'block';
      novaPesquisa.style.opacity = '1';
    }
    }
    
  },1000)
  e.preventDefault()
})





//Fetch data e renderizar gráfico pelo botão pesquisar
button.addEventListener('click', (e) => {
  grafico.innerHTML = ''
  stocks.getDia(txt.value)
  .then(dados => {
    const nome = dados.dia['Meta Data']['2. Symbol'];
    const nomeU = nome.toUpperCase();
    const stocksTempo = dados.dia['Time Series (Daily)'];
    nomeAcao.textContent = nome;
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
      text: nomeU,
      align: 'left',
      style: {
        fontSize: '20px',
        color: 'rgb(59, 144, 200)',
        background: '#00E396'
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
      
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
    }
    };

 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  })
  
  .catch(erro);
  
  
  setTimeout(() => {

    if (err == false && txt.value !== '') {
      formulario.style.display = 'none';
    grafico.style.background = '#333';
    txtResult.innerHTML = '';
    if (formulario.style.display === 'none') {
      select.style.display = 'block';
      select.style.opacity = '1';
      novaPesquisa.style.display = 'block';
      novaPesquisa.style.opacity = '1';
    }
    }
    
    
  },1000)
  
  

  
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
    stocks.getSemana(nomeAcao.textContent,tempo)
    .then(dados => {
      const nome = dados.semana['Meta Data']['2. Symbol'];
      const nomeU = nome.toUpperCase();
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
        text: nomeU,
        align: 'left',
        style: {
          fontSize: '20px',
          color: 'rgb(59, 144, 200)',
          background: '#00E396'
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            fontSize: '12px',
            colors: '#fff',
            background: '#00E396'
          },
        },
        
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            fontSize: '12px',
            colors: '#fff',
            background: '#00E396'
          },
        },
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
    stocks.getMes(nomeAcao.textContent,tempo)
    .then(dados => {
      const nome = dados.mes['Meta Data']['2. Symbol'];
      const nomeU = nome.toUpperCase();
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
        height: 350,
      },
      title: {
        text: nomeU,
        align: 'left',
        style: {
          fontSize: '20px',
          color: 'rgb(59, 144, 200)',
          background: '#00E396'
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            fontSize: '12px',
            colors: '#fff',
            background: '#00E396'
          },
        },
        
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            fontSize: '12px',
            colors: '#fff',
            background: '#00E396'
          },
        },
      }
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }

    )
    .catch(erro);;
    break;

default:

 stocks.getDia(nomeAcao.textContent)
  .then(dados => {
    const nome = dados.dia['Meta Data']['2. Symbol'];
    const nomeU = nome.toUpperCase()
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
      text: nomeU,
      align: 'left',
      style: {
        fontSize: '20px',
        color: 'rgb(59, 144, 200)',
        background: '#00E396'
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
      
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          fontSize: '12px',
          colors: '#fff',
          background: '#00E396'
        },
      },
    }
    };
 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
  })
  .catch(erro);

}


});

novaPesquisa.addEventListener('click', (e) => {
  document.location.reload()

  e.preventDefault()
})



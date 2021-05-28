class Stocks {
  constructor() {
    this.time = 'TIME_SERIES_DAILY';
    this.apiKey = '30HFNYXW9PH2RC1M';
  }

  //Dia
  async getDia(simbolo) {
    const respostaDia = await fetch(`https://www.alphavantage.co/query?function=${this.time}&symbol=${simbolo}&apikey=${this.apiKey}`);

    const dia = await respostaDia.json();

    return {
      dia
    }
  }

  //60 Minutos
  async get60min(simbolo, tempo) {
    const resposta60 = await fetch(`https://www.alphavantage.co/query?function=${tempo}&symbol=${simbolo}&interval=60min&apikey=${this.apiKey}`);

    const min60 = await resposta60.json();

    return {
      min60
    }
  }

  //Semana
  async getSemana(simbolo, tempo) {
    const respostaSemana = await fetch(`https://www.alphavantage.co/query?function=${tempo}&symbol=${simbolo}&apikey=${this.apiKey}`);

    const semana = await respostaSemana.json();

    return {
      semana
    }
  }

  //Mês
  async getMes(simbolo, tempo) {
    const respostaMes = await fetch(`https://www.alphavantage.co/query?function=${tempo}&symbol=${simbolo}&apikey=${this.apiKey}`);

    const mes = await respostaMes.json();

    return {
      mes
    }
  }
}
// Milestone 1:
// Facendo una chiamata GET all’endpoint /sales​ , ​
// l’API ci ritornerà la lista di tutte le
// vendite fatte dai venditori dell’azienda:
//
// Da questi dati dobbiamo creare due grafici:
// 1. Andamento delle vendite totali della nostra azienda con un grafico di tipo Line
// (http://www.chartjs.org/docs/latest/charts/line.html) con un unico dataset che
// conterrà il numero di vendite totali mese per mese nel 2017.

//Simone: http://157.230.17.132:4015/sales

$(document).ready(function(){

  var url__personale = "http://157.230.17.132:4015/sales/";

  $.ajax({
    url: url__personale,
    type: 'GET',
    success: function(risposta){
      console.log(risposta);

      var array__obj__mese__vendita = [];

      for (var i = 0; i < risposta.length; i++) {
        var obj__mese__vendita = {};
        //console.log(risposta[i].date);
        var data__obj = risposta[i].date;
        // console.log(Object.entries(data__obj));
        //console.log(data__obj);
        var moment__date = moment(data__obj, "DD-MM-YYYY");
        var moment__mese = moment__date.format('MMMM');
        obj__mese__vendita.mese = moment__mese;
        obj__mese__vendita.vendita = risposta[i].amount;
        array__obj__mese__vendita.push(obj__mese__vendita);
        // lista__date.push(data__obj);
        // lista__date.push(risposta[i].amount);
      }

      //console.log(array__obj__mese__vendita);

      //////////////////////////////////////////////////////////////

      var mesi = [];
      var vendite = [];

      for (var i = 0; i < array__obj__mese__vendita.length; i++) {
        var mese__corrente = array__obj__mese__vendita[i].mese;
        //console.log(mese__corrente);
        //console.log(vendita__corrente);
        if (!mesi.includes(mese__corrente)) {
          mesi.push(mese__corrente);
        }
      }

      for (var j = 0; j < mesi.length; j++) {
        var somma = 0;
        var mese__inserito = mesi[j];
        console.log(mesi[j]);
        //console.log(mese__corrente);
        for (var v = 0; v < array__obj__mese__vendita.length; v++) {
          var vendita__corrente__mese = array__obj__mese__vendita[v].vendita;

          if (mese__inserito == array__obj__mese__vendita[v].mese) {
            somma += vendita__corrente__mese;
          }

        }

        vendite.push(somma);

      }

      console.log(mesi);
      console.log(vendite);

      //////////////////////////////////////////////////////////////

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mesi,
            datasets: [{
                label: '# of Votes',
                data: vendite,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });

      var array__obj__venditore__vendite = [];

      for (var i = 0; i < risposta.length; i++) {
        var obj__nome__vendita = {};

        obj__nome__vendita.nome = risposta[i].salesman;
        obj__nome__vendita.vendita = risposta[i].amount;
        array__obj__venditore__vendite.push(obj__nome__vendita);

        console.log(obj__nome__vendita);
      }

      console.log(array__obj__venditore__vendite);

      //////////////////////////////////////////////////////////////

      var nomi = [];
      var vendite__nomi = [];

      for (var i = 0; i < array__obj__venditore__vendite.length; i++) {
        var nome__corrente = array__obj__venditore__vendite[i].nome;
        //console.log(mese__corrente);
        //console.log(vendita__corrente);
        if (!nomi.includes(nome__corrente)) {
          nomi.push(nome__corrente);
        }
      }

      console.log(nomi);

      for (var j = 0; j < nomi.length; j++) {
        var add = 0;
        var nome__inserito = nomi[j];
        console.log(nomi[j]);
        //console.log(mese__corrente);
        for (var v = 0; v < array__obj__venditore__vendite.length; v++) {
          var vendita__corrente__nome = array__obj__venditore__vendite[v].vendita;

          if (nome__inserito == array__obj__venditore__vendite[v].nome) {
            add += vendita__corrente__nome;
          }
        }
        vendite__nomi.push(add);
      }

      console.log(nomi);
      console.log(vendite__nomi);

      var ctx = document.getElementById('myChart__1').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nomi,
            datasets: [{
                label: '# of Votes',
                data: vendite__nomi,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });

    },
    error: function(errori){
      console.log(errori);
    }
  });


















});

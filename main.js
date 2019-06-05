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

  //funzione per generare grafico lineare
  function grafico_linea(label, data){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: label,
          datasets: [{
              label: 'tot vendite mesili',
              data: data,
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
              borderWidth: 1,
              fill: false, //<-- toglie lo sfondo
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
  }

  //funzione per generare grafico torta
  function grafico_torta(label, data){
    var ctx = document.getElementById('myChart__1').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: label,
          datasets: [{
              label: 'tot vendite mesili',
              data: data,
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
              borderWidth: 1,
              fill: false, //<-- toglie lo sfondo
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
  }

  //funzione creazione e lettura dati
  function create_dashboard_kpi(url__personale){

    $.ajax({
      url: url__personale,
      type: 'GET',
      success: function(risposta){
        console.log(risposta);

        //preparo il primo oggetto per il primo grafico
          var mese_vendita = {
            'Jan': 0,
            'Feb': 0,
            'Mar': 0,
            'Apr': 0,
            'May': 0,
            'Jun': 0,
            'Jul': 0,
            'Aug': 0,
            'Sep': 0,
            'Oct': 0,
            'Nov': 0,
            'Dec': 0
          }

          var prova = {
            'Q1': 0,
            'Q2': 0,
            'Q3': 0,
            'Q4': 0
          }

          //----------------------------------------------------------------//

          var q1 = {
            'Jan': 0,
            'Feb': 0,
            'Mar': 0
          }

          var array_q1 = Object.keys(q1);

          var q2 = {
            'Apr': 0,
            'May': 0,
            'Jun': 0
          }

          var array_q2 = Object.keys(q2);

          var q3 = {
            'Jul': 0,
            'Aug': 0,
            'Sep': 0
          }

          var array_q3 = Object.keys(q3);

          var q4 = {
            'Oct': 0,
            'Nov': 0,
            'Dec': 0
          }

          var array_q4 = Object.keys(q4);
          //----------------------------------------------------------------//

        //ciclo i dati ricevuti
        for (var i = 0; i < risposta.length; i++) {
          //console.log(risposta[i]);
          //assegno le date
          var data_corrente = risposta[i].date;
          //console.log(data_corrente);
          //assegno le date correnti a moment
          var moment_data_corrente = moment(data_corrente, 'DD-MM-YYYY');
          //console.log(moment_data_corrente.format('MMM'));
          var moment_mese_corrente = moment_data_corrente.format('MMM')
          //console.log(moment_mese_corrente);
          //assegno importi correnti
          var importo_vendita_corrente = risposta[i].amount;
          //console.log(importo_vendita_corrente);
          mese_vendita[moment_mese_corrente] += importo_vendita_corrente;
          //console.log(mese_vendita);

          //----------------------------------------------------------------//
          //ciclo chiavi oggetto (q1) e se sono uguali alle chiavi oggetto (risposta) aggiungo il rispettivo totale
          for (var j = 0; j < array_q1.length; j++) {
            if (array_q1[j] == moment_mese_corrente) {
              q1[moment_mese_corrente] += importo_vendita_corrente;
            }
          }
          for (var x = 0; x < array_q2.length; x++) {
            if (array_q2[x] == moment_mese_corrente) {
              q2[moment_mese_corrente] += importo_vendita_corrente;
            }
          }
          for (var z = 0; z < array_q3.length; z++) {
            if (array_q3[z] == moment_mese_corrente) {
              q3[moment_mese_corrente] += importo_vendita_corrente;
            }
          }
          for (var s = 0; s < array_q4.length; s++) {
            if (array_q4[s] == moment_mese_corrente) {
              q4[moment_mese_corrente] += importo_vendita_corrente;
            }
          }
          //----------------------------------------------------------------//

        }

        //----------------------------------------------------------------//
        // console.log(mese_vendita);

        //console.log(q1);
        // console.log(q2);
        // console.log(q3);
        // console.log(q4);

        var q1_val = Object.values(q1);
        console.log(q1_val);
        var q1_add = 0;
        for (var i = 0; i < q1_val.length; i++) {
          console.log(q1_val[i]);
          q1_add += q1_val[i];
        }
        console.log(q1_add);
        prova.Q1 = q1_add;
        console.log(prova);
        var q2_val = Object.values(q2);
        var q2_add = 0;
        for (var i = 0; i < q2_val.length; i++) {
          console.log(q2_val[i]);
          q2_add += q2_val[i];
        }
        console.log(q2_add);
        prova.Q2 = q2_add;
        console.log(prova);
        var q3_val = Object.values(q3);
        var q3_add = 0;
        for (var i = 0; i < q3_val.length; i++) {
          console.log(q3_val[i]);
          q3_add += q3_val[i];
        }
        console.log(q3_add);
        prova.Q3 = q3_add;
        console.log(prova);
        var q4_val = Object.values(q4);
        var q4_add = 0;
        for (var i = 0; i < q4_val.length; i++) {
          console.log(q4_val[i]);
          q4_add += q4_val[i];
        }
        console.log(q4_add);
        prova.Q4 = q4_add;
        console.log(prova);

        var label_quarter = Object.keys(prova);
        var data_quarter = Object.values(prova);
        //----------------------------------------------------------------//


        var myChart = new Chart($('#myChart__2'), {
          type: 'bar',
          data: {
              labels: label_quarter,
              datasets: [{
                  label: 'vendite per quarter',
                  data: data_quarter,
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

        /////////////////////////////////////////////////////////////////////////

        var array_mesi = Object.keys(mese_vendita); //<-- restituisce array di chiavi
        // console.log(array_mesi);
        var array_vedite_per_mese = Object.values(mese_vendita); //<-- restituisce array di valori
        // console.log(array_vedite_per_mese);

        grafico_linea(array_mesi, array_vedite_per_mese);

        /////////////////////////////////////////////////////////////////////////

        //dichiaro il secondo oggetto per il secondo grafico
        var venditore_vendita = {};

        //inizializzo variabile per il tot
        var tot_vendite = 0;

        //ciclo i dati ricevuti
        for (var i = 0; i < risposta.length; i++) {
         var venditore_corrente = risposta[i].salesman;
         // console.log(venditore_corrente);
         var vendita__corrente = risposta[i].amount;
         // console.log(vendita__corrente);
         if (!Object.keys(venditore_vendita).includes(venditore_corrente)) {
           venditore_vendita[venditore_corrente] = vendita__corrente;
         }else{
           venditore_vendita[venditore_corrente] += vendita__corrente;
         }
         tot_vendite += vendita__corrente;
        }
        //accedo a ogni singolo valore dell'oggetto trasformandolo in percentuale
        for (var field in venditore_vendita) {
          //variabile d'appoggio per il toFixed
          var percentuale = venditore_vendita[field] * 100 / tot_vendite;
          //assegno percentuale ad ogni tot vendita
          venditore_vendita[field] = percentuale.toFixed(1);
        }

        // console.log(venditore_vendita);
        // console.log(tot_vendite);

        var array_venditori = Object.keys(venditore_vendita);
        var array_vendite = Object.values(venditore_vendita);

        grafico_torta(array_venditori, array_vendite);

        //popolo le select
        for (var i = 0; i < array_venditori.length; i++) {
          //appendo i nomi
          $('#venditori').append('<option>' + array_venditori[i] + '</option>');
        }

        //popolo il mese
        for (var i = 0; i < array_mesi.length; i++) {
          //appendo i mesi
          $('#mesi').append('<option>' + array_mesi[i] + '</option>');
        }

        //////////////////////////////////////////////////////////////
        ///---------------------METODO 1---------------------------///
        //////////////////////////////////////////////////////////////

        // var array__obj__mese__vendita = [];
        //
        // for (var i = 0; i < risposta.length; i++) {
        //   var obj__mese__vendita = {};
        //   //console.log(risposta[i].date);
        //   var data__obj = risposta[i].date;
        //   // console.log(Object.entries(data__obj));
        //   //console.log(data__obj);
        //   var moment__date = moment(data__obj, "DD-MM-YYYY");
        //   var moment__mese = moment__date.format('MMMM');
        //   obj__mese__vendita.mese = moment__mese;
        //   obj__mese__vendita.vendita = risposta[i].amount;
        //   array__obj__mese__vendita.push(obj__mese__vendita);
        //   // lista__date.push(data__obj);
        //   // lista__date.push(risposta[i].amount);
        // }
        //
        // console.log(array__obj__mese__vendita);
        //
        // //////////////////////////////////////////////////////////////
        //
        // var mesi = [];
        // var vendite = [];
        //
        // for (var i = 0; i < array__obj__mese__vendita.length; i++) {
        //   var mese__corrente = array__obj__mese__vendita[i].mese;
        //   //console.log(mese__corrente);
        //   //console.log(vendita__corrente);
        //   if (!mesi.includes(mese__corrente)) {
        //     mesi.push(mese__corrente);
        //   }
        // }
        //
        // for (var j = 0; j < mesi.length; j++) {
        //   var somma = 0;
        //   var mese__inserito = mesi[j];
        //   console.log(mesi[j]);
        //   //console.log(mese__corrente);
        //   for (var v = 0; v < array__obj__mese__vendita.length; v++) {
        //     var vendita__corrente__mese = array__obj__mese__vendita[v].vendita;
        //
        //     if (mese__inserito == array__obj__mese__vendita[v].mese) {
        //       somma += vendita__corrente__mese;
        //     }
        //
        //   }
        //
        //   vendite.push(somma);
        //
        // }
        //
        // console.log(mesi);
        // console.log(vendite);
        //
        // //////////////////////////////////////////////////////////////
        //
        // var array__obj__venditore__vendite = [];
        //
        // for (var i = 0; i < risposta.length; i++) {
        //   var obj__nome__vendita = {};
        //
        //   obj__nome__vendita.nome = risposta[i].salesman;
        //   obj__nome__vendita.vendita = risposta[i].amount;
        //   array__obj__venditore__vendite.push(obj__nome__vendita);
        //
        //   console.log(obj__nome__vendita);
        // }
        //
        // console.log(array__obj__venditore__vendite);
        //
        // //////////////////////////////////////////////////////////////
        //
        // var nomi = [];
        // var vendite__nomi = [];
        //
        // for (var i = 0; i < array__obj__venditore__vendite.length; i++) {
        //   var nome__corrente = array__obj__venditore__vendite[i].nome;
        //   //console.log(mese__corrente);
        //   //console.log(vendita__corrente);
        //   if (!nomi.includes(nome__corrente)) {
        //     nomi.push(nome__corrente);
        //   }
        // }
        //
        // console.log(nomi);
        //
        // for (var j = 0; j < nomi.length; j++) {
        //   var add = 0;
        //   var nome__inserito = nomi[j];
        //   console.log(nomi[j]);
        //   //console.log(mese__corrente);
        //   for (var v = 0; v < array__obj__venditore__vendite.length; v++) {
        //     var vendita__corrente__nome = array__obj__venditore__vendite[v].vendita;
        //
        //     if (nome__inserito == array__obj__venditore__vendite[v].nome) {
        //       add += vendita__corrente__nome;
        //     }
        //   }
        //   vendite__nomi.push(add);
        // }
        //
        // console.log(nomi);
        // console.log(vendite__nomi);

        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////

      },
      error: function(errori){
        console.log(errori);
      }
    });
  }

  create_dashboard_kpi(url__personale);

  $('#send__data').click(function(){
    //ripristino le select


    //recupero il mome del venditore selezionato
    var venditore_scelto_ajax_add = $('#venditori').val();
    console.log(venditore_scelto_ajax_add);

    var mese_scelto = $('#mesi').val();
    //uso moment per risalire al mese
    var mese_scelto_moment = moment(mese_scelto, 'MMM');
    //strutturo stringa riconoscibile
    var mese_ajax_add = mese_scelto_moment.format('DD-MM-' + '2017');
    console.log(mese_ajax_add);

    //recupero l'inserimento del valore
    var inserimento_importo_ajax_add = parseInt($('#add__value').val());
    console.log(inserimento_importo_ajax_add);
    //limito l'inserimento a un numero
    if (isNaN(inserimento_importo_ajax_add)) {
      alert('inserimento non valido');
      //pulisco l'input
      $('#add__value').val('');
      ////////////////////////////
      // $('#add__value').empty();
    }

    //eseguo controllo prima di aggiungere il venditore

    $.ajax({
      url: url__personale,
      type: 'POST',
      contentType: 'application/Json',
      data: JSON.stringify({
        'salesman': venditore_scelto_ajax_add,
        'date': mese_ajax_add,
        'amount': inserimento_importo_ajax_add
      }),
      success: function(risposta){
        console.log(risposta);
        create_dashboard_kpi(url__personale);

      },
      error: function(errori){
        console.log(errori);
      }
    })



  });








});

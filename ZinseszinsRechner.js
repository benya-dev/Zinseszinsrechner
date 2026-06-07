"use strict";

class ZinseszinsRechner {

  constructor(startKapital, monatlicheEinzahlung, zinssatz, laufzeit, ausschüttungsIntervall) {
    this.startKapital = startKapital || 0;
    this.monatlicheEinzahlung = monatlicheEinzahlung || 0;
    this.zinssatz = zinssatz || 0;
    this.laufzeit = laufzeit || 0;
    this.ausschüttungsIntervall = ausschüttungsIntervall;
    this.results = [];
    this.jahren = [];
    this.einzahlungen = [];
  }

  PrufeData() {
    if(this.startKapital <= 0) {
      return this.monatlicheEinzahlung ? true : alert("Bitte Geben Sie eine Betrag an!");
    } else if(this.zinssatz <= 0) {
      alert("Bitte Geben Sie die Zinssatz an!");
    } else if(this.laufzeit <= 0) {
      alert("Bitte Geben Sie die Laufzeit an!");
    } else {
      return true;
    }
  }

calculate() {

  let n; 
  let f = 12;

 this.ausschüttungsIntervall === "Monatlich" ? n = 12 : n = 1; 
 
  for(let a = 1; a < this.laufzeit + 1; a++) {

  this.jahren.push(`Jahr ${a}`);
  this.einzahlungen.push(this.startKapital + (this.monatlicheEinzahlung * f));
  

  // Monatszins
  const i = this.ausschüttungsIntervall === "Monatlich" ? this.zinssatz / 12 : this.zinssatz;
  let startkapitalEndwert;
  let sparplanEndwert;
  
  if(this.ausschüttungsIntervall === "Monatlich") {
    // Wachstum des Startkapitals
     startkapitalEndwert = this.startKapital * Math.pow(1 + i, n);

  // Sparplan mit Einzahlung am Monatsanfang
      sparplanEndwert =
      this.monatlicheEinzahlung *
      ((Math.pow(1 + i, n) - 1) / i) *
      (1 + i);
  } else {
    const jahresSumme = this.monatlicheEinzahlung * 12;
    startkapitalEndwert = this.startKapital * Math.pow(1 + i, n);
    sparplanEndwert = jahresSumme * ((Math.pow(1 + i, n) - 1) / i);
  }
  
  // Gesamtwert
  let endkapital;

  if(!this.startKapital) {
    endkapital = sparplanEndwert;
  } else if(!this.monatlicheEinzahlung) {
    endkapital = startkapitalEndwert;
  }  else {
    endkapital = Math.round(startkapitalEndwert + sparplanEndwert);
  }
  
  this.results.push(endkapital.toFixed(2));
  
  f += 12;
  
  this.ausschüttungsIntervall === "Monatlich" ? n += 12 : n += 1;
 }
}

  showResult() {
    const form = document.querySelector("form");
    let chartContainer = document.querySelectorAll(".chart-container");
    let ergebnise = document.querySelectorAll(".ergebnise");
    let endkapital = this.results[this.results.length - 1];
    let gesamteEinzahlungen = (this.monatlicheEinzahlung * this.laufzeit * 12) + this.startKapital;

    function formatEuro(num) {
    num = new Decimal(num);

    // Unter 1 Milliarde normal anzeigen
    if (num.lt(1e9)) {
        return num.toNumber().toLocaleString("de-DE") + " €";
    }

    const suffixes = [
        "B",   // Billion (1e9)
        "T",   // Trillion (1e12)
        "Qa",  // Quadrillion (1e15)
        "Qi",  // Quintillion (1e18)
        "Sx",  // Sextillion
        "Sp",  // Septillion
        "Oc",  // Octillion
        "No"   // Nonillion
    ];

    let tier = Math.floor(num.log(1000).toNumber()) - 3;

    if (tier < suffixes.length) {
        return num
            .div(Decimal.pow(1000, tier + 3))
            .toFixed(2) + suffixes[tier] + " €";
    }

    // Für noch größere Zahlen: aa, ab, ac...
    const index = tier - suffixes.length;

    const first = String.fromCharCode(97 + Math.floor(index / 26));
    const second = String.fromCharCode(97 + (index % 26));

    return num
        .div(Decimal.pow(1000, tier + 3))
        .toFixed(2) + first + second + " €";
}
   
    chartContainer.forEach(el => el.remove());
    ergebnise.forEach(el => el.remove());
   
    if(isNaN(endkapital)) endkapital = 0;
    
    form.insertAdjacentHTML("afterend", `
    <div class="ergebnise">
    <ul>
    <li>Endkapital: <span>${formatEuro(endkapital)}</span></li>
    <li>Gesamte Einzahlungen: <span>${formatEuro(gesamteEinzahlungen)}</span></li>
    <li>Erhaltene Zinszahlungen: <span>${formatEuro(endkapital - gesamteEinzahlungen)}</span></li>
    </ul>
    <div class="chart-art-container">
    <label for="chart-art">Chart-Art: </label>
    <select id="chart-art">
    <option selected>Endkapital</option>
    <option>Gesamte Einzahlungen</option>
    <option>Erhaltene Zinszahlungen</option>
    </select>
    </div>
    </div>
    <div class="chart-container">
    <canvas id="chart"></canvas>
    </div> `
  );

  // Chart zeichnen
  const ctx = document.getElementById("chart");

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.jahren,
      datasets: [{
        label: 'Endkapitalentwicklung €',
        data: this.results,
        borderWidth: 2,
        backgroundColor: "black",
        borderColor: "blue",
        pointHoverBorderWidth: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
      scales: {
    
        y: {
          grid: {
        color: "grey" // graue Hintergrund-Linien y
      },
      ticks: {
                    callback: (value, index, ticks) => {
                    
                      return '€' + value.toLocaleString();
                    }
                  }
        },
        
        x: {
          grid: {
            color: "grey" //graue Hintergrund-Linien x
          }
    }
      }
    }
  });
  
  return chart;
}

// veänderungen von Chart
chartChange(chart) {
  let zinsZahlungen = [];
  // berechnung von zinszahlungen
  for(let i = 0; i < this.results.length; i++) {
    let result = parseFloat(this.results[i]);
    let einzahlung = this.einzahlungen[i];

    zinsZahlungen.push(result - einzahlung);
  }
    
    document.getElementById("chart-art").addEventListener("change", () => {
      const chartArtValue = document.getElementById("chart-art").value;

      switch(chartArtValue) {
        case "Gesamte Einzahlungen": chart.data.datasets[0].data = this.einzahlungen;
                                     chart.data.datasets[0].borderColor = "rgb(160, 65, 160)";
                                     chart.data.datasets[0].label = "Gesamte Einzahlungen €";
        break;
        case "Erhaltene Zinszahlungen": chart.data.datasets[0].data = zinsZahlungen;
                                        chart.data.datasets[0].borderColor = "green";
                                        chart.data.datasets[0].label = "Erhaltene Zinszahlungen €";
        break;
        default: chart.data.datasets[0].data = this.results;
                 chart.data.datasets[0].borderColor = "blue";
                 chart.data.datasets[0].label = "Endkapital €";
                                        
        break;
      }

      chart.update();
    });
}

execute() {
  if(this.PrufeData()) {
    this.calculate();
    const chart = this.showResult();
    this.chartChange(chart);
  }
 }
}


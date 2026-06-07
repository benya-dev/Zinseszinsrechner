"use strict";

const form = document.querySelector("form");
const d = new Darkmode();
d.showDarkForm();

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    const startKapital = parseFloat(formData.get("startkapital")),
      monatlicheEinzahlung = parseFloat(formData.get("mkapital")),
      zinssatz = parseFloat(formData.get("prozent")) / 100,
      laufzeit = parseFloat(formData.get("laufzeit")),
      ausschüttungsIntervall = formData.get("ausintervall");
      
    const z = new ZinseszinsRechner(startKapital, monatlicheEinzahlung, zinssatz, laufzeit, ausschüttungsIntervall);
    z.execute();
    d.showDarkResultBeginn();
});






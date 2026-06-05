"use strict";

class Darkmode {

  constructor() {
    this.darkmodeStatus = false;
    this.container = document.getElementById("container");
    this.button = document.getElementById("darkmode");
    this.fieldset = document.querySelector("fieldset");
    this.legend = document.querySelector("fieldset > legend");
    this.inputs = document.querySelectorAll("input[type=number]");
  }

  showDarkResultBeginn() {
    if(this.darkmodeStatus) {
      this.showDarkResult();
    }
  }

  showDarkForm() {

    this.button.addEventListener("click", () => {
      const ergebnise = document.querySelector(".ergebnise");
      if(!this.darkmodeStatus) {
      this.darkmodeStatus = true;
      this.button.firstElementChild.src = "./img/sonne.png"
      this.container.style.backgroundColor = "black";
      this.container.style.border = "5px solid white";
      this.fieldset.style.backgroundColor = "black";
      this.legend.style.backgroundColor = "black";
      this.fieldset.style.color = "white";
      this.fieldset.style.border = "2px solid white";
      this.legend.style.border = "2px solid white";
      this.fieldset.style.boxShadow = "3px 3px 8px white";
    
      if(ergebnise) this.showDarkResult();

      } else {
        this.darkmodeStatus = false;
        this.container.removeAttribute("style");
        this.fieldset.removeAttribute("style");
        this.legend.removeAttribute("style");
        this.button.firstElementChild.src = "./img/darkmode.png";

        if(ergebnise) {
        const result = this.result;

        result.ergebnise.removeAttribute("style");
        result.li1.removeAttribute("style");
        result.li2.removeAttribute("style");
        result.li3.removeAttribute("style");
        result.sp1.removeAttribute("style");
        result.sp2.removeAttribute("style");
        result.sp3.removeAttribute("style");
        result.label.removeAttribute("style");
        result.chartContainer.removeAttribute("style");
        }
      }
    });
  }

  get result() {
    return {
      ergebnise: document.querySelector(".ergebnise"),
      li1: document.querySelector("ul > li:nth-child(1)"),
      li2: document.querySelector("ul > li:nth-child(2)"),
      li3: document.querySelector("ul > li:nth-child(3)"),
      sp1: document.querySelector("ul > li:nth-child(1) > span"),
      sp2: document.querySelector("ul > li:nth-child(2) > span"),
      sp3: document.querySelector("ul > li:nth-child(3) > span"),
      label: document.querySelector(".chart-art-container > label"),
      chartContainer: document.querySelector(".chart-container")
    };
  }

  showDarkResult() {

    const result = this.result;
    
      result.ergebnise.style.backgroundColor = "black";
      result.ergebnise.style.border = "2px solid white";
      result.ergebnise.style.boxShadow = "3px 3px 8px white";
      result.li1.style.color = "white";
      result.sp1.style.color = "white";

      result.li2.style.color = "white";
      result.sp2.style.color = "white";

      result.li3.style.color = "white";
      result.sp3.style.color = "white";

      result.label.style.color = "white"; 
      result.chartContainer.style.backgroundColor = "black";
      result.chartContainer.style.border = "2px solid white";
      result.chartContainer.style.boxShadow = "3px 3px 8px white";

  }
}

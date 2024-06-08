const LivingBeing = require("./livingBeing");
const {matrix, randomNumber, inMatrix, scanFeld, löschObjekt, fleischfresserArray, rasenDestroyerArray, mannArray, statistiken} = require("./hilfsfunktionen"); 

module.exports = class Fleischfresser extends LivingBeing{
    lp = 1000;

    constructor(z,s) {
      super(z,s);
      super.platziereSelbstInMatrix(3);
    }

    spielzug() {
      // console.log(this.lp)
      if (this.lp > 0) {
        this.fressen();
        if (this.lp > 2000) {
          this.multiply(fleischfresserArray,Fleischfresser,0,1);
          statistiken("ff");
          this.lp = this.lp-1000; 
        }
      } else if (this.lp < 1) { 
        matrix[this.zeile][this.spalte] = 0;
        löschObjekt(this.zeile,this.spalte,fleischfresserArray)
      }
      this.lp--;
    }

    fressen() {
      let richtung = randomNumber(0,8);
      let benachbarteFelder = [
        [this.zeile-1,this.spalte],
        [this.zeile,this.spalte-1],
        [this.zeile+1,this.spalte],
        [this.zeile,this.spalte+1],
        [this.zeile-1,this.spalte-1],
        [this.zeile+1,this.spalte-1],
        [this.zeile+1,this.spalte+1],
        [this.zeile-1,this.spalte+1],
      ]
      for (let i = 0; i < 8; i++) {
        let j = (richtung + i) % 8
        let ausgewähltesFeld = benachbarteFelder[j];
        if (inMatrix(ausgewähltesFeld)) {
          if (scanFeld(ausgewähltesFeld,2)) {
            matrix[this.zeile][this.spalte] = 0;
            löschObjekt(ausgewähltesFeld[0],ausgewähltesFeld[1],rasenDestroyerArray)
            this.zeile = ausgewähltesFeld[0];
            this.spalte = ausgewähltesFeld[1];
            matrix[this.zeile][this.spalte] = 3;
            this.lp = this.lp+100
            return;
          }
          if (scanFeld(ausgewähltesFeld,5) && randomNumber(1,2) == 1) {
            this.kämpfen(5,mannArray,3);
            return;
          }
        }
      }
    }
    
}
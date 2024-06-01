const LivingBeing = require("./livingBeing");
const {matrix, löschObjekt, mannArray, randomNumber, rasenDestroyerArray, grassArray, fleischfresserArray, inMatrix, scanFeld} = require("./hilfsfunktionen"); 

module.exports = class Mann extends LivingBeing {

  alter = 0;
  lp = 1000;

  constructor(z,s) {
    super(z,s);
    super.platziereSelbstInMatrix(5);
  }

  spielzug() {
    // console.log(this.alter)
    // console.log(rasenDestroyerArray)
    if (this.alter < 210 && this.lp > 0) {
      this.essen();
      this.alter++;
      this.lp--;
    } else {
      // console.log("los geht's")
      matrix[this.zeile][this.spalte] = 0;
      löschObjekt(this.zeile, this.spalte, mannArray);
    }
  }

  essen() {
    let richtung = randomNumber(0, 8);
    let benachbarteFelder = [
      [this.zeile - 1, this.spalte],
      [this.zeile, this.spalte - 1],
      [this.zeile + 1, this.spalte],
      [this.zeile, this.spalte + 1],
      [this.zeile - 1, this.spalte - 1],
      [this.zeile + 1, this.spalte - 1],
      [this.zeile + 1, this.spalte + 1],
      [this.zeile - 1, this.spalte + 1],
    ]
    for (let i = 0; i < 8; i++) {
      let j = (richtung + i) % 8
      let ausgewähltesFeld = benachbarteFelder[j];
      if (inMatrix(ausgewähltesFeld)) {
        if (scanFeld(ausgewähltesFeld, 2)) {
          matrix[this.zeile][this.spalte] = 0;
          löschObjekt(ausgewähltesFeld[0], ausgewähltesFeld[1], rasenDestroyerArray)
          this.zeile = ausgewähltesFeld[0];
          this.spalte = ausgewähltesFeld[1];
          matrix[this.zeile][this.spalte] = 5;
          this.lp = this.lp + 10;
          return;
        }
        if (scanFeld(ausgewähltesFeld, 1)) {
          matrix[this.zeile][this.spalte] = 0;
          löschObjekt(ausgewähltesFeld[0], ausgewähltesFeld[1], grassArray)
          this.zeile = ausgewähltesFeld[0];
          this.spalte = ausgewähltesFeld[1];
          matrix[this.zeile][this.spalte] = 5;
          this.lp = this.lp + 10;
          return;
        }
        if (scanFeld(ausgewähltesFeld, 3) && randomNumber(1, 2) == 1) {
          this.kämpfen(3, fleischfresserArray, 5);
          return;
        }
      }
    }
  }
}


const LivingBeing = require("./livingBeing");
const Mann = require("./mann");
const { matrix, randomNumber, inMatrix, löschObjekt, grassArray, frauArray, rasenDestroyerArray, scanFeld, mannArray, statistiken} = require("./hilfsfunktionen");

module.exports = class Frau extends LivingBeing {

  alter = 0;
  lp = 1000;

  constructor(z, s) {
    super(z, s);
    super.platziereSelbstInMatrix(6);
  }
  
  i = 90;

  spielzug() {
    // console.log(this.alter)
    // console.log(rasenDestroyerArray)
    if (this.alter < 210 && this.lp > 0) {
      let erfolg = this.essen();
      if ( i > 9 && erfolg == true) {
        // console.log("ich bin da")
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
            if (scanFeld(ausgewähltesFeld, 5)) {
              this.platziereNeuenMensch();
              return;
            }
          }
          
        }
        i = 0;
      } 
      this.alter++;
      this.lp--;
      i++;
    } else {
        // console.log("los geht's")
        matrix[this.zeile][this.spalte] = 0;
        löschObjekt(this.zeile, this.spalte, frauArray);
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
          matrix[this.zeile][this.spalte] = 6;
          this.lp = this.lp + 10;
          return;
        }
        if (scanFeld(ausgewähltesFeld, 1)) {
          matrix[this.zeile][this.spalte] = 0;
          löschObjekt(ausgewähltesFeld[0], ausgewähltesFeld[1], grassArray)
          this.zeile = ausgewähltesFeld[0];
          this.spalte = ausgewähltesFeld[1];
          matrix[this.zeile][this.spalte] = 6;
          this.lp = this.lp + 10;
          
          return true;
        }
      }
    }
    return false;
  }

  platziereNeuenMensch() {
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
        if (scanFeld(ausgewähltesFeld, 0) || scanFeld(ausgewähltesFeld, 1)) {
          let zeile = ausgewähltesFeld[0];
          let spalte = ausgewähltesFeld[1];

          if (scanFeld(ausgewähltesFeld, 1)) {
            löschObjekt(zeile, spalte, grassArray)
          }

          if (randomNumber(0, 2) == 1) {
            mannArray.push(new Mann(zeile, spalte));
            statistiken("m");
          } else {
            frauArray.push(new Frau(zeile, spalte));
            statistiken("f");
          }

          return;
        }
      }
    }
  }
}

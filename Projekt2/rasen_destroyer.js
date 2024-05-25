const LivingBeing = require("./livingBeing");
const {matrix, randomNumber, inMatrix, löschObjekt, istGras, rasenDestroyerArray, grassArray} = require("./hilfsfunktionen"); 

module.exports = class RasenDestroyer extends LivingBeing {
  alter = 0;
  
  constructor(z,s) {
      super(z,s);
      super.platziereSelbstInMatrix(2);
  };

  spielzug() {
    // console.log(this.alter)
    if (this.alter < 99) {
      let schritt = this.machSchritt();
      // console.log("1,2,3,4")
      if (schritt === true) {
        // console.log("hallo!")
        if (this.alter > 55 && this.alter < 60) {
          // console.log("ich bin da")
          this.multiply(rasenDestroyerArray,RasenDestroyer,1,0);
        } 
      } 
      this.alter++;
    } else {
      // console.log("los geht's")
      matrix[this.zeile][this.spalte] = 0;
      löschObjekt(this.zeile, this.spalte, rasenDestroyerArray); 
    }
    
  };
  
  //  i=0
  machSchritt() {
      //  i=i+1;
      //  if (i % 100 == 0) {
      //   console.log(grassArray);
      //   console.table(matrix)
      // }
      // 0 -> OBEN
      // 1 -> RECHTS
      // 2 -> LINKS
      // 3 -> UNTEN
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
              if (istGras(ausgewähltesFeld)) {
                  matrix[this.zeile][this.spalte] = 0;
                  löschObjekt(ausgewähltesFeld[0],ausgewähltesFeld[1],grassArray);
                  this.zeile = ausgewähltesFeld[0];
                  this.spalte = ausgewähltesFeld[1];
                  matrix[this.zeile][this.spalte] = 2;

                  // console.log("Fresse Gras")
                  return true;
              }
          }

      }
      // this.energie--;
  };
};



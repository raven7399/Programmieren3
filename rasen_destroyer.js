
class RasenDestroyer {
  zeile;
  spalte;
  alter = 0;
  constructor(z,s) {
      this.zeile = z;
      this.spalte = s;
      this.platziereSelbstInMatrix();
  };
  platziereSelbstInMatrix() {
      matrix[this.zeile][this.spalte] = 2;
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
          this.platziereNeuenRasenDestroyer();
        } 
      } 
      this.alter++;
    } else {
      // console.log("los geht's")
      matrix[this.zeile][this.spalte] = 0;
      löschObjekt(this.zeile, this.spalte, rasenDestroyerArray); 
    }
    
  };

  platziereNeuenRasenDestroyer() {
      // scan deine umgebung, und schau ob du um dich herum 
      // ein freies Feld findest.
      // wenn du ein freies feld findest, dann platziere auf diesem Feld
      // ein neues Grasobjekt. 
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
          let j = (richtung + i) % 8;
          let ausgewähltesFeld = benachbarteFelder[j];
          if (inMatrix(ausgewähltesFeld)) {
              if (scanFeld(ausgewähltesFeld, 1) || scanFeld(ausgewähltesFeld, 0)) {
                  let zeile = ausgewähltesFeld[0];
                  let spalte = ausgewähltesFeld[1];

                  if (scanFeld(ausgewähltesFeld,1)){
                    löschObjekt(zeile,spalte,grassArray)
                  }

                  rasenDestroyerArray.push(new RasenDestroyer(zeile, spalte));

                  return;
              }
          }

      }

  }
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




class Grass {
  zeile;
  spalte;
  energie = 0;
  constructor(z, s) {
    this.zeile = z;
    this.spalte = s;
    this.platziereSelbstInMatrix();
  };

  spielzug() {
    // console.log(this.energie)
    if (this.energie > 4) {
      this.platziereNeuesGras();
      this.energie = 0;
    } else {
      this.energie++;
    }

  };

  platziereNeuesGras() {
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
      // console.log("wie geht's")
      let j = (richtung + i) % 8
      let ausgewähltesFeld = benachbarteFelder[j];
      if (inMatrix(ausgewähltesFeld)) {
        // console.log("ich bin hier!")
        if (scanFeld(ausgewähltesFeld, 0)) {
          // console.log("ich bin da")
          let zeile = ausgewähltesFeld[0];
          let spalte = ausgewähltesFeld[1];

          grassArray.push(new Grass(zeile, spalte));
          return;
        }
      }
    }
  };

  platziereSelbstInMatrix() {
    matrix[this.zeile][this.spalte] = 1;
  }

}

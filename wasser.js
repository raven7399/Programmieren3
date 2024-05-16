class Wasser {
  zeile;
  spalte;
  strömung = 0;
  constructor(z,s) {
      this.zeile = z;
      this.spalte = s;
      this.platziereSelbstInMatrix();
  };
  platziereSelbstInMatrix() {
      matrix[this.zeile][this.spalte] = 4;
  };

  spielzug() {
    // console.log(this.energie)
    if (this.strömung > 5) {
      this.platziereNeuesWasser();
      this.strömung = 0;
      // console.log("Hallo")
    } else {
      this.strömung++;
      // console.log("Hi")
    }

  };

  platziereNeuesWasser() {
    // let richtung = randomNumber(0, 8);
    let benachbarteFelder = [
      [this.zeile + 1, this.spalte],
    ]
    for (let i = 0; i < 1; i++) {
      // console.log("wie geht's")
      // let j = (richtung + i) % 8
      let ausgewähltesFeld = benachbarteFelder[0];
      if (inMatrix(ausgewähltesFeld)) {
        if (scanFeld(ausgewähltesFeld, 1) || scanFeld(ausgewähltesFeld, 0) || scanFeld(ausgewähltesFeld, 2) || scanFeld(ausgewähltesFeld, 3)) {
        // console.log("ich bin hier!")
        let zeile = ausgewähltesFeld[0];
        let spalte = ausgewähltesFeld[1];

        if (scanFeld(ausgewähltesFeld,1)){
          löschObjekt(zeile,spalte,grassArray)
        } else if (scanFeld(ausgewähltesFeld,2)){
          löschObjekt(zeile,spalte,rasenDestroyerArray)
        } else if (scanFeld(ausgewähltesFeld,3)){
          löschObjekt(zeile,spalte,fleischfresserArray)
        }

        wasserArray.push(new Wasser(zeile, spalte));
        return;
        }

      }
    }
  };
};

class Fleischfresser {
    zeile;
    spalte;
    lp = 1000;
    constructor(z,s) {
      this.zeile = z;
      this.spalte = s;
      this.platziereSelbstInMatrix();
    }

    platziereNeuenFleischfresser() {
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
          if (scanFeld(ausgewähltesFeld,0) || scanFeld(ausgewähltesFeld, 1)) {
            let zeile = ausgewähltesFeld[0];
            let spalte = ausgewähltesFeld[1];

            if (scanFeld(ausgewähltesFeld,1)){
              löschObjekt(zeile,spalte,grassArray)
            }

            fleischfresserArray.push(new Fleischfresser(zeile,spalte))
            return;
          }
        }
      }
    }

    spielzug() {
      // console.log(this.lp)
      if (this.lp > 0) {
        this.fressen();
        if (this.lp > 2000) {
          this.platziereNeuenFleischfresser();
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
        }
      }
    }

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 3;
    }
    
}
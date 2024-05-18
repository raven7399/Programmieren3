class Mann extends Mensch {

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 5;
    }

    constructor(z,s) {
      this.zeile = z;
      this.spalte = s;
      this.platziereSelbstInMatrix();
    }

    platziereNeuenMensch() {
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
  
              menschArray.push(new Mensch(zeile,spalte))
              return;
            }
          }
        }
      }
}
const {matrix, randomNumber, inMatrix, scanFeld, löschObjekt, grassArray} = require("./hilfsfunktionen");



module.exports = class LivingBeing {
    zeile;
    spalte;
    
    constructor(z,s) {
        this.zeile = z;
        this.spalte = s;
    };

    platziereSelbstInMatrix(num) {
        matrix[this.zeile][this.spalte] = num;
    };

    multiply(array,art,feld,feld2) {
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
                if (scanFeld(ausgewähltesFeld,feld) || scanFeld(ausgewähltesFeld,feld2)) {
                    let zeile = ausgewähltesFeld[0];
                    let spalte = ausgewähltesFeld[1];
  
                    if (scanFeld(ausgewähltesFeld,1)){
                      löschObjekt(zeile,spalte,grassArray)
                    }
  
                    array.push(new art(zeile, spalte));
  
                    return true;
                }
            }
  
        }
        return false;
    }

    kämpfen(art,array,aktArt) {
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
          if (scanFeld(ausgewähltesFeld,art)) {
            matrix[this.zeile][this.spalte] = 0;
            löschObjekt(ausgewähltesFeld[0],ausgewähltesFeld[1],array)
            this.zeile = ausgewähltesFeld[0];
            this.spalte = ausgewähltesFeld[1];
            matrix[this.zeile][this.spalte] = aktArt;
            this.lp = this.lp+10;
            return;
          }
        }
      }
    }
}
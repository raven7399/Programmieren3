let matrix = erstelleMatrix(100,100);
let grassArray = []
let rasenDestroyerArray = []
let fleischfresserArray = []
let wasserArray = []
let mannArray = []
let frauArray = []

function randomNumber(min,max) {
	return Math.floor(Math.random()*(max-min) + min);
}

function inMatrix(koordinatenPaar) {
    let zeile = koordinatenPaar[0];
    let spalte = koordinatenPaar[1];
  
    if (zeile > matrix.length -1 || zeile < 0) {
      return false;
    } else if (spalte > matrix.length -1 || spalte < 0) {
      return false;
    } else {
      return true;
    }
  
}

function istGras(koordinatenPaar) {
  let zeile = koordinatenPaar[0];
  let spalte = koordinatenPaar[1];
  
  if (matrix[zeile][spalte] === 1) {
    return true;
  } else {
    return false
  }
  
}

function scanFeld(koordinatenPaar,farbcode) {
  let zeile = koordinatenPaar[0];
  let spalte = koordinatenPaar[1];
  
  if (matrix[zeile][spalte] === farbcode) {
    return true;
  } else {
    return false
  }
  
}
/*
function istSand(koordinatenPaar) {
  let zeile = koordinatenPaar[0];
  let spalte = koordinatenPaar[1];
  
  if (matrix[zeile][spalte] === 0) {
    return true;
  } else {
    return false
  }
  
}
*/
function erstelleMatrix(spalten,zeilen) {
  let matrix = []
  for (let i = 0; i < zeilen; i++) {
    let zeile = []
    for (let i = 0; i < spalten; i++) {
      zeile.push(0);
    }
     matrix.push(zeile);
    }

    return matrix;
}
/*
function zeichneMatrix() {
  for (let zeile = 0; zeile < matrix.length; zeile++) {
    for (let spalte = 0; spalte < matrix.length; spalte++) {
        if (matrix[zeile][spalte] === 1) {
          // fill(68, 189, 47);
          process.stdout.write("\x1b[38;2;68;189;47mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 0) {
          // fill(255,220,100)
          process.stdout.write("\x1b[38;2;255;220;100mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 2) {
          // fill(255, 0, 0)
          process.stdout.write("\x1b[38;2;255;0;0mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 3) {
          // fill(0,0,0)
          process.stdout.write("\x1b[38;2;0;0;0mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 4) {
          // fill(0,0,255)
          process.stdout.write("\x1b[38;2;0;0;255mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 5) {
          // fill(173,216,230)
          process.stdout.write("\x1b[38;2;173;216;230mX\x1b[0m");
        } else if (matrix[zeile][spalte] === 6) {
          // fill(255,192,203)
          process.stdout.write("\x1b[38;2;255;192;203mX\x1b[0m");
        }

        // let k = 500 / matrix.length
        // rect(spalte * k, zeile * k, k, k)

    }
    process.stdout.write("\n");
  }
  process.stdout.write("\x1b[" + matrix.length + "A")
}
*/

function löschObjekt(zeile,spalte,array) {
  let index;
  for (let i = 0; i < array.length; i++) {
    if (array[i].zeile === zeile && array[i].spalte === spalte) {
      index = i;
    };
  }
  return array.splice(index,1)
}

module.exports = {
  randomNumber: randomNumber,
  inMatrix: inMatrix,
  istGras: istGras,
  scanFeld: scanFeld,
  erstelleMatrix: erstelleMatrix,
  // zeichneMatrix: zeichneMatrix,
  löschObjekt: löschObjekt,
  grassArray: grassArray,
  rasenDestroyerArray: rasenDestroyerArray,
  fleischfresserArray:fleischfresserArray,
  wasserArray: wasserArray,
  matrix: matrix,
  mannArray: mannArray,
  frauArray: frauArray,
}
const {zeichneMatrix, matrix, grassArray, rasenDestroyerArray, fleischfresserArray, wasserArray} = require("./hilfsfunktionen");
const Wasser = require("./wasser");
const Fleischfresser = require("./fleischfresser");
const Grass = require("./grass");
const RasenDestroyer = require("./rasen_destroyer");

function setup() {
  // createCanvas(500, 500);
  // frameRate(15);
  // noStroke()
  for (i = 0; i < 1; i+= 1) {
    grassArray.push(new Grass(50,50));
  }

  for (i = 0; i < 1; i+= 1) {
    rasenDestroyerArray.push(new RasenDestroyer(45,45));
  }

  for (i = 0; i < 1; i+= 1) {
    fleischfresserArray.push(new Fleischfresser(35,35))
  }

  for (i = 0; i < 1; i+= 1) {
    wasserArray.push(new Wasser(0,50))
  }
/*
  for (i = 0; i < 2; i+= 1) {
    mannArray.push(new Mann(-30,-30))
  }

  for (i = 0; i < 2; i+= 1) {
    frauArray.push(new Frau(-35,-35))
  }
*/
}

// let i = 0;
function draw() {
  // console.log("is running")
  // if (i < 2000) {
    for (let i = 0; i < grassArray.length; i++) {
      grassArray[i].spielzug()
      // console.log(i)
    }
  
    for (let i = 0; i < rasenDestroyerArray.length; i++) {
      rasenDestroyerArray[i].spielzug()
    }
  
    for (let i = 0; i < fleischfresserArray.length; i++) {
      fleischfresserArray[i].spielzug()
    }
      
    for (let i = 0; i < wasserArray.length; i++) {
      wasserArray[i].spielzug()
    }
/*
    for (let i = 0; i < menschArray.length; i++) {
      menschArray[i].spielzug()
    }
*/  
    zeichneMatrix();
  // }
  // i++;

}

setup();
setInterval(draw, 1);
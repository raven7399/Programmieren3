const LivingBeing = require("./livingBeing");
const {grassArray, statistiken} = require("./hilfsfunktionen");  

module.exports = class Grass extends LivingBeing {
  energie = 0;

  constructor(z, s) {
    super(z,s);
    super.platziereSelbstInMatrix(1);
  };

  spielzug() {
    // console.log(this.energie)
    if (this.energie > 4) {
      let erfolgreich =  this.multiply(grassArray,Grass,0);
      if(erfolgreich){
        statistiken("g")
      }
      
      this.energie = 0;
    } else {
      this.energie++;
    }

  };

}

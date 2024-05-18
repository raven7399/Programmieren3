class Grass extends LivingBeing{
  energie = 0;
  constructor(z, s) {
    super(z,s)
    super.platziereSelbstInMatrix(1);
  };

  spielzug() {
    // console.log(this.energie)
    if (this.energie > 4) {
      this.multiply(grassArray,Grass,0);
      this.energie = 0;
    } else {
      this.energie++;
    }

  };

}

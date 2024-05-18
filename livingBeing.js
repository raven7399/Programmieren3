class LivingBeing {
    zeile;
    spalte;
    constructor(z,s) {
        this.zeile = z;
        this.spalte = s;
    };

    platziereSelbstInMatrix(num) {
        matrix[this.zeile][this.spalte] = num;
    };
}
class Sumatoria {
    constructor(base) {
        this.base = base;
        this.total = base;
        console.log("Base inicial: " + this.base);
    }

    sumar() {
        this.total += this.base;
        console.log("Sumatoria acumulada: " + this.total);
        document.getElementById("resultado").innerHTML = "Base: " + this.base + "<br>Sumatoria acumulada: " + this.total;
    }
}

var sumatoria;

function ejecutarSumar() {
    sumatoria.sumar();
}

document.addEventListener("DOMContentLoaded", function () {
    var base = Math.floor(Math.random() * 10) + 1;
    sumatoria = new Sumatoria(base);
    document.getElementById("resultado").innerHTML = "Base: " + base + "<br>Sumatoria acumulada: " + base;
});

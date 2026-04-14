class Taxi {
    constructor(tipo, conductor, licencia) {
        this.tipo = tipo;
        this.conductor = conductor;
        this.licencia = licencia;
    }

    mostrarInfo() {
        return this.tipo + " | Conductor: " + this.conductor + " | Licencia: " + this.licencia;
    }
}

class TaxiTradicional extends Taxi {
    constructor() {
        super("Taxi tradicional", "Conductor con techo amarillo", "A1");
        this.techo = "amarillo";
    }
}

class TaxiParticular extends Taxi {
    constructor(tipo) {
        super(tipo, "Conductor clase B", "B");
    }
}

class TaxiExpress extends TaxiParticular {
    constructor() {
        super("Taxi Express");
    }
}

class TaxiPremium extends TaxiParticular {
    constructor() {
        super("Taxi Premium");
    }
}

class TaxiCargo extends Taxi {
    constructor() {
        super("Taxi cargo", "Conductor de carga", "Profesional");
        this.mision = "Transporte de carga";
    }
}

var taxis = [
    new TaxiTradicional(),
    new TaxiExpress(),
    new TaxiPremium(),
    new TaxiCargo()
];

console.log("Escenario Taxis Urbanos");
taxis.forEach(function (taxi) {
    console.log(taxi.mostrarInfo());
});

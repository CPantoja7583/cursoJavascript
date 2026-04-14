class ProductoSony {
    constructor(nombre, modelo, precio, categoria) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.categoria = categoria;
    }

    mostrarInfo() {
        return this.categoria + ": " + this.nombre + " - Modelo: " + this.modelo + " - $" + this.precio;
    }
}

class Televisor extends ProductoSony {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Televisores");
    }
}

class Camara extends ProductoSony {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Cámaras");
    }
}

class Audio extends ProductoSony {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Audio");
    }
}

class Consola extends ProductoSony {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Consolas");
    }
}

class Accesorio extends ProductoSony {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Accesorios");
    }
}

var catalogo = [
    new Televisor("Bravia XR", "XR-55", 1299900),
    new Camara("Alpha", "A7", 1899900),
    new Audio("Sound Bar", "HT-S100F", 149990),
    new Consola("PlayStation 5", "PS5", 649990),
    new Accesorio("Auriculares", "WH-1000XM5", 349990)
];

console.log("Catálogo Sony Chile");
catalogo.forEach(function (producto) {
    console.log(producto.mostrarInfo());
});

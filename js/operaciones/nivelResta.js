var Resta = {
    __proto__: Nivel,
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();

        var pos = {x: this.centerWorldX, y: this.centerWorldY};

        this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
        //TERMINO 1
        this.agregarTermino(30, 50, this.terminos[0].term1.toString());

        //SIGNO OPERADOR
        this.crearSigno(340, 150, Juego.operador, [0.1, 0.2]);

        //TERMINO 2
        this.agregarTermino(400, 50, this.terminos[0].term2.toString());

        //Signo igual
        this.crearSigno(690, 150, '=', [0.5, 0.5]);
        //Resultado
        this.rectangulo = this.crearCuadro(850, 100, [2, 2.5]);

        Respuesta.resultado = Util.evaluarOperacion(this.terminos[0].term1, this.terminos[0].term2);
        this.respuestaMultiple(3);
    },
};
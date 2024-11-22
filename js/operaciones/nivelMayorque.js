var Mayorque = {
    __proto__: Nivel,
    resultado: 0,
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();
        do {
            this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
            if (Juego.level == 1) {
                this.terminos = this.getTerminos([Respuesta.resultado - 1, Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
            }
        } while (this.terminos[0].term1 == this.terminos[0].term2);

        //TERMINO 1
        this.crearSigno(500, 200, Juego.operador, [0.5, 0.5]);

        this.agregarTermino(200, 100, this.terminos[0].term1.toString());
        var transparente1 = UtilGui.crearSprite(200, 100, 'transparente', [1.3, 2.5]);
        transparente1.inputEnabled = true;
        if (this.terminos[0].term1 > this.terminos[0].term2) {
            transparente1.events.onInputDown.add(this.ValTrue, this);
        } else {
            transparente1.events.onInputDown.add(this.ValFalse, this);
        }
        //TERMINO 2
        this.agregarTermino(600, 100, this.terminos[0].term2.toString());
        var transparente2 = UtilGui.crearSprite(600, 100, 'transparente', [1.3, 2.5]);
        transparente2.inputEnabled = true;
        if (this.terminos[0].term2 > this.terminos[0].term1) {
            transparente2.events.onInputDown.add(this.ValTrue, this);
        } else {
            transparente2.events.onInputDown.add(this.ValFalse, this);
        }
        //Resultado
        this.rectangulo = this.crearCuadro(1050, 100, [1, 2.5]);
        Respuesta.resultado = true;
        //Respuesta.resultado = Util.evaluarOperacion(this.terminos[0].term1, this.terminos[0].term2);

        // RESPUESTAS
        //this.respuestaTrueFalse();
    },
    ValTrue: function () {
        Respuesta.dada = true;
        console.log('true');
        UtilGui.setValorBooleano(this);
    },
    ValFalse: function () {
        Respuesta.dada = false;
        console.log('false');
        UtilGui.setValorBooleano(this);
    }

};
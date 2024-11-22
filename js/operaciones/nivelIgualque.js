var Igualque = {
    __proto__: Nivel,
    resultado: 0,
    new_terminos: [],
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();

        /* this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
         if (Juego.level == 1) {
         this.terminos = this.getTerminos([Respuesta.resultado - 1, Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
         }*/
        this.sizeObjetos = [0.5, 0.5];
        this.sizeCuadroTerminos = [.25, .25];
        var espacio_h = 400;
        var espacio_v = -100;

        var booleanos = [true, false, false];
        booleanos = Util.revolverArray(booleanos);
        Respuesta.dada = null;

        for (var i = 0; i < 3; i++) {
            do {
                terms = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
                if (Juego.level == 1) {
                    terms = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
                }
            } while (terms[0].res != booleanos[i]);
            this.new_terminos.push({term1: terms[0].term1.toString(), term2: terms[0].term2.toString(), res: booleanos[i]});
        }
        console.log(this.new_terminos);
        for (var i = 0; i < 3; i++, espacio_v += 230) {
            //TERMINO 1
            //this.agregarTermino(20 + espacio_h, 100 + espacio_v, this.terminos[0].term1.toString());
            this.agregarTermino(20 + espacio_h, 100 + espacio_v, this.new_terminos[i].term1.toString());
            //SIGNO OPERADOR
            this.crearSigno(145 + espacio_h, 150 + espacio_v, Juego.operador, [.2, .2]);
            //TERMINO 2
            //this.agregarTermino(180 + espacio_h, 100 + espacio_v, this.terminos[0].term2.toString());
            this.agregarTermino(180 + espacio_h, 100 + espacio_v, this.new_terminos[i].term2.toString());
            //REPUESTA
            //this.crearObjetoArrastrable(booleanos[i].toString(), 20 + espacio_h, 100 + espacio_v, [0.5, 0.5], UtilGui.setValorBooleano);
            var transparente = UtilGui.crearSprite(20 + espacio_h, 100 + espacio_v, 'transparente', [1.5, 1.5]);
            transparente.inputEnabled = true;
            if (booleanos[i] == true) {
                transparente.events.onInputDown.add(this.ValTrue, this);
            } else {
                transparente.events.onInputDown.add(this.ValFalse, this);
            }

        }
        //Resultado
        this.rectangulo = this.crearCuadro(1050, 100, [1, 2.5]);
        Respuesta.resultado = true;//Util.evaluarOperacion(this.terminos[0].term1, this.terminos[0].term2);
        this.new_terminos = [];
        // RESPUESTAS
        //this.respuestaTrueFalse();
    },
    ValTrue: function () {
        Respuesta.dada = true;
        UtilGui.setValorBooleano(this);
    },
    ValFalse: function () {
        Respuesta.dada = false;
        UtilGui.setValorBooleano(this);
    }

};
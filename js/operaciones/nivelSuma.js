var Suma = {
   __proto__: Nivel,
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();

        this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
//        str.substring(str.lastIndexOf(":")+1,str.lastIndexOf(";"));
//         Juego.objeto + '_i' +
        //TERMINO 1
        this.agregarTermino(30, 50, this.terminos[0].term1.toString());

        //SIGNO OPERADOR
        this.crearSigno(320, 150, Juego.operador, [0.5, 0.5]);

        //TERMINO 2
        this.agregarTermino(400, 50, this.terminos[0].term2.toString());

        //Signo igual
        this.crearSigno(690, 150, '=', [0.5, 0.5]);
        //Resultado
        this.rectangulo = this.crearCuadro(850, 100, [2, 2.5]);
        //habilitando botones cuando tienes exito
        //this.crearCalificacion(+ 400, 100, [0.50, 0.50],'bien');

        Respuesta.resultado = Util.evaluarOperacion(this.terminos[0].term1, this.terminos[0].term2);
        this.respuestaMultiple(3);
        
        
    },
};
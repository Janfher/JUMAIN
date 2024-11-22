var Memoriza = {
    __proto__: Nivel,
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();

        this.terminos = this.getTerminos([Respuesta.resultado], 0, 10);

        //TERMINO 1

        var cuadro = this.crearCuadro(200, 100, [2, 2.5]);
        numero = game.add.text(0, 0, this.terminos[0].term1.toString(), 'dynamic shadows');
        //nevil1.anchor.set(0.5)
        numero.font = 'Arial Black';
        numero.fontSize = 100;
        numero.fontWeight = 'bold';
        numero.fill = '#fff';
        //var numero = UtilGui.addTexto(0, 0, this.terminos[0].term1.toString(), '200px Arial', '#fffaf8', true, this.sonidoCantidad);
        numero.anchor.setTo(0.5);
        this.centrarObjeto(numero, cuadro);

        //Resultado

        this.rectangulo = this.crearCuadro(850, 100, [2, 2.5]);

        Respuesta.resultado = Util.evaluarOperacion(this.terminos[0].term1);
        resultados_aleatorio = Util.getAleatoriosNoRepetidos(1, 10, 2, [Respuesta.resultado]);


        // RESPUESTAS
        var opciones = [];
        opciones.push(Respuesta.resultado);
        for (var i = 0; i < resultados_aleatorio.length; i++) {
            opciones.push(resultados_aleatorio[i]);
        }
        this.opciones_resultado = Util.arrayAleatorio(opciones);
        var objeto;
        for (var i = 0, espacio = 0; i < this.opciones_resultado.length; i++, espacio = espacio + 250) {
            objeto = this.crearObjetoArrastrable(this.opciones_resultado[i], game.world.centerX - 300 + espacio, 450, this.sizeObjetos, this.sonidoYPosicion, this.dropHandler);
            //this.mostrarCantidadTextual(objeto, objeto.key);
        }
    },
};
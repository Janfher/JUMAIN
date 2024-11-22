var Adicion = {
    __proto__: Nivel,
    sumando_respuesta: 0,
    cuadroAdicion: {},
    color_canasta: {},
        create: function () {
        flecha = this.game.add.image(45, 200, 'flecha');
        flecha.scale.setTo(.6,.6);
       
                        timerID=setInterval(this.tiempo,500);

        if(timerID>3)
        {
            clearInterval(timerID);
        }

        this.sumando_respuesta = 0;
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();
        this.terminos = this.getTerminos([Respuesta.resultado], 0, 10);
        if (Juego.level == 1) {
            this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
        }

        //Item Para Adicionar
        this.crearObjetoArrastrable('1', 400, 450, this.sizeObjetos, this.guardaUltimaPos, this.dropTermino);

        //TERMINO
        Respuesta.resultado = this.terminos[0].term1;

        //Cuadro para poner items
        this.cuadroAdicion = UtilGui.crearSprite(250, 100, 'canasta', [.6, .6]);//this.crearCuadro(pos.x - 450, 100, [2, 2.5]);
        
        //Cuadro para cambiar color canasta
        this.color_canasta = UtilGui.crearSprite(235, 85, 'canasta-verde', [.351, .351]);
        this.color_canasta.visible = false;

        //Indica la cantidad que deben adicionarse
        UtilGui.addTexto((this.cuadroAdicion.width / 2) + this.cuadroAdicion.x, 55, Respuesta.resultado, '50px Arial', '#fffaf8', true);

        coloque1 = game.add.text((this.cuadroAdicion.width / 2) + this.cuadroAdicion.x+15, 50, 'Coloque aquí', 'dynamic shadows');
        coloque1.anchor.set(0.5)
        coloque1.font = 'Arial Black';
        coloque1.fontSize = 30;
        coloque1.fontWeight = 'bold';
        coloque1.fill = '#ec008c';
        coloque1.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
        //Calificacion
        this.rectangulo = this.crearCuadro(1050, 100, [1, 2.5]);

        //Boton para Aceptar
        UtilGui.addBoton(700, 250, 'TRUE', 0.5, true, UtilGui.setValorBooleano);//(x, y, nombre, size, enabled, onInputDown)

        Respuesta.resultado = 'TRUE';



    },

    dropTermino: function (item) {
        var condicion = Util.comprobarObjetoDentroDe(item, this.cuadroAdicion);
        if (condicion) {
            this.crearObjetoArrastrable('1', item.x, item.y, this.sizeObjetos, null, this.eliminarTermino);
            this.sumando_respuesta += 1;
            var numero = this.game.sound.play('_' + this.sumando_respuesta);
            Respuesta.dada = Util.evaluarOperacion(this.terminos[0].term1, this.sumando_respuesta);
            this.colorCanasta(this.sumando_respuesta, this.terminos[0].term1, this.color_canasta);

        }
        item.x = this.ultima_posicion.x;
        item.y = this.ultima_posicion.y;

    },

    eliminarTermino: function (item) {
        var condicion = Util.comprobarObjetoDentroDe(item, this.cuadroAdicion);
        if (!condicion) {
            this.sumando_respuesta -= 1;
            item.kill();
            Respuesta.dada = Util.evaluarOperacion(this.terminos[0].term1, this.sumando_respuesta);
            this.colorCanasta(this.sumando_respuesta, this.terminos[0].term1, this.color_canasta);

        }
    },
    tiempo:function()
    {
           flecha.visible=(flecha.visible==true)? false:true;
          //console.log(tim);
    },
    detener:function()
    {
                                clearInterval(timerID);
                                //alert('Tiempo de tenido');
    },
};  
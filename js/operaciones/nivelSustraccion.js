var Sustraccion = {
    __proto__: Nivel,
    restando_respuesta: 0,
    cuadroBasura: {},
    cuadroSustraccion: {},
    color_canasta: {},
    create: function () {
        flecha = this.game.add.image(470, 376, 'flecha');
        flecha.scale.setTo(.6,.6);

                        timerID=setInterval(this.tiempo,500);

        if(timerID>3)
        {
            clearInterval(timerID);
        }        this.crearGUI_nivel();
        Respuesta.resultado = Juego.level;
        //this.restando_respuesta = Respuesta.resultado;
        this.terminos = this.getTerminos([Respuesta.resultado + 1, Respuesta.resultado + 3], 0, 10);
        Respuesta.dada = this.terminos[0].term1;
        this.restando_respuesta = Respuesta.dada;
        // Respuesta.resultado = 'TRUE';

        //Cuadro contenedor de terminos a sustraer
        this.cuadroSustraccion = UtilGui.crearSprite(200, 100, 'canasta', [.6, .6]);//this.crearCuadro(200, 100, [2, 2.5]);

        //Cuadro para cambiar color canasta
        this.color_canasta = UtilGui.crearSprite(185, 85, 'canasta-verde', [.351, .351]);
        this.color_canasta.visible = false;
        //
        //Objetos a sustraer
        this.crearObjeto((this.cuadroSustraccion.width / 2) + this.cuadroSustraccion.x - 100, 150, this.terminos[0].term1);

        //Indica la cantidad que deben adicionarse
        //UtilGui.addTexto((this.cuadroSustraccion.width / 2) + this.cuadroSustraccion.x, 50, Respuesta.resultado, '50px Arial', '#fffaf8', true);

        numero1 = game.add.text((this.cuadroSustraccion.width / 2) + this.cuadroSustraccion.x-20, 55, Respuesta.resultado, 'dynamic shadows');
        //nevil1.anchor.set(0.5)
        numero1.font = 'Arial Black';
        numero1.fontSize = 50;
        numero1.fontWeight = 'bold';
        numero1.fill = '#fff';
        //CUADRO PARA ELEMENTOS BASURA
        this.cuadroBasura = UtilGui.crearSprite(650, 300, 'canasta', [.6, .6]);//this.crearCuadro(650, 350, [1.5, 2.5]);
        //Indica la cantidad que deben adicionarse
        numero2 = game.add.text(this.cuadroBasura.x-50 + (this.cuadroBasura.width / 4),  this.cuadroBasura.y - 40, 'Coloque Aquí', 'dynamic shadows');
        //nevil1.anchor.set(0.5)
        numero2.font = 'Arial Black';
        numero2.fontSize = 30;
        numero2.fontWeight = 'bold';
        numero2.fill = '#fff';
        //UtilGui.addTexto(this.cuadroBasura.x + (this.cuadroBasura.width / 4), this.cuadroBasura.y - 40, 'Coloque Aquí', '20px Arial', '#fffaf8', true);

        //CUADRO PARA CALIFICACION
        this.rectangulo = this.crearCuadro(1050, 100, [1, 2.5]);

        //Boton para Aceptar
        UtilGui.addBoton(700, 80, 'TRUE', 0.5, true, UtilGui.setValorBooleano);//(x, y, nombre, size, enabled, onInputDown)

        //Respuesta.resultado = 'TRUE';


    },

    //funcion que es encargada de dibujar y organizar las objetos en la pantalla
    crearObjeto: function (posX, posY, cantidad) {
        var objetos = [];
        var distancia = 20; //tiene relacion con el tamaño de las objetos (debe ser dinamico!)
        //dibujando la objeto en pantalla
        var key = Juego.objeto;
        if (cantidad === 0) {
            key = '0';
        }
        for (var i = 1; i <= cantidad; i++) {
            var factor = 0;
            var fila = 1;
            //posicion par, entonces dibujar en la mitad.
            if (i % 2 === 0) {
                factor = 0.5;
                fila = 2;
            }
            var objeto = this.crearObjetoArrastrable(key, posX + ((i * distancia) * 1.5),
                    posY + fila * (distancia * 3), this.sizeObjetos, this.guardaUltimaPos, this.dropTerminoBasura);
            objetos.push([i, objeto]);
        }
        return objetos;
    },
    dropTermino: function (item) {
        var condicion = Util.comprobarObjetoDentroDe(item, this.cuadroSustraccion);
        if (condicion) {
            this.crearObjetoArrastrable('1', item.x, item.y, this.sizeObjetos, this.guardaUltimaPos, this.dropTerminoBasura);
            item.kill();
            this.restando_respuesta += 1;
            Respuesta.dada = this.restando_respuesta;
            this.colorCanasta(this.restando_respuesta, Respuesta.resultado, this.color_canasta);
        } else {
            condicion = Util.comprobarObjetoDentroDe(item, this.cuadroBasura);
            if (!condicion) {
                item.x = this.ultima_posicion.x;
                item.y = this.ultima_posicion.y;
            }
        }
    },
    dropTerminoBasura: function (item) {
        var condicion = Util.comprobarObjetoDentroDe(item, this.cuadroBasura);
        if (condicion) {
            this.crearObjetoArrastrable('1', item.x, item.y, this.sizeObjetos, this.guardaUltimaPos, this.dropTermino);
            item.kill();
            this.restando_respuesta -= 1;
            Respuesta.dada = this.restando_respuesta;
            this.colorCanasta(this.restando_respuesta, Respuesta.resultado, this.color_canasta);
        } else {
            condicion = Util.comprobarObjetoDentroDe(item, this.cuadroSustraccion);
            if (!condicion) {
                item.x = this.ultima_posicion.x;
                item.y = this.ultima_posicion.y;
            }
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
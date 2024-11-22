var Nivel = {
    sizeCuadroTerminos: [.6, .6],
    sizeObjetos: [0.9, 0.9],
    centerWorldX: 0,
    centerWorldY: 0,
    cantidad_subniveles: Juego.cantidad_subniveles,
    objeto: {},
    ultima_posicion: {x: 0, y: 0},
    terminos: {},
    cantidad_terminos: 2,
    resultado: Number,
    opciones_resultado: {},

    Preloaders: function () {
        for (var i = 0; i <= 10; i++) {
            game.load.image(i.toString(), 'assets/resultados/' + Juego.objeto + '/' + i.toString() + '.png');
            //console.log(i);
        }
        game.load.start();

    },
    crearGUI_nivel: function () {
        // game.load.onLoadStart.add(this.fileComplete, this);

        //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        background = this.game.add.tileSprite(0, 0, 1920, 1080, 'tema2');
        //background.scale.setTo(1.55, 1.4); //Cambiar escala de la image
        background.scale.setTo(0.72, 0.62); //Cambiar escala de la imagen
               background.alpha = 0.3;

        nevil1 = game.add.text(70, 50, 'Nivel: ' + Juego.level, 'dynamic shadows');

        nevil1.anchor.set(0.5)
        nevil1.font = 'Arial Black';
        nevil1.fontSize = 30;
        nevil1.fontWeight = 'bold';
        nevil1.fill = '#ff0000';
        nevil1.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
        //UtilGui.addTexto(50, 50, 'Nivel: ' + Juego.level, '30px Arial', '#fffaf8', true);
        //BOTON REGRESAR A LA PORTADA
        UtilGui.addBoton(this.game.world.width - 100, 20, 'button_menu', 0.35, true, Util.irNiveles);

    },
    crearCuadro: function (x, y, size) {
        var objeto = UtilGui.crearSprite(x, y, 'rect', size);
        return objeto;
    },
    crearCalificacion: function (x, y, size, imagen) {
        //habilitando botones cuando tienes exito
        Respuesta.calificacion = UtilGui.crearImagen(x, y, imagen, size);
        this.game.add.existing(Respuesta.calificacion);
        Respuesta.calificacion.visible = true;
        this.texto_siguiente = UtilGui.addBoton(this.game.world.width - 300, this.game.world.height - 200, 'siguiente', 0.5, true, this.actualizar); 
 
        //UtilGui.crearTexto(this.game.world.width - 200, this.game.world.height - 70, 'SIGUIENTE', '30px Arial', 'black', true, this.actualizar);
        this.game.add.existing(this.texto_siguiente);
        this.mostrarIntentos(1050, 450);
        this.controlEstrellas();
    },
    crearSigno: function (x, y, operador, size) {
        UtilGui.addImagen(x, y, operador, size);
    },
    mostrarCantidadTextual: function (item, texto) {
        var pos_txt = {x: item.x - 10, y: item.y + 50};
        this.add.text(pos_txt.x, pos_txt.y, texto, {font: '40px Arial', fill: '#fff', stroke: '#000000', strokeThickness: 6});
        this.centrarObjeto(pos_txt, item);
    },
    agregarTermino: function (x, y, valor) {
        var cuadro = UtilGui.crearSprite(x, y, 'canasta', this.sizeCuadroTerminos);//this.crearCuadro(x, y, this.sizeCuadroTerminos);
        var objeto = this.crearTermino(valor, 600, 100, this.sizeObjetos, this.sonidoCantidad); //(valor,x,y,escala[ancho, alto])
        this.centrarObjeto(objeto, cuadro);
        this.mostrarCantidadTextual(objeto, objeto.key);
    },
    getTerminos: function (resultados, desde, hasta) {
        var terminos = Util.getTerminos(resultados, Juego.operador, desde, hasta);
        terminos = Util.arrayAleatorio(terminos);
        return terminos;
    },
//funcion que es encargada de dibujar y organizar las objeto en la pantalla
    crearTermino: function (valor, x, y, escala, onInputDown = null) {
        var objeto = game.add.sprite(x, y, valor, {stroke: '#000000'});
        objeto.inputEnabled = true;
        if (onInputDown != null) {
            objeto.events.onInputDown.add(onInputDown, this);
        }
        objeto.anchor.setTo(0.5);
        objeto.scale.setTo(escala[0], escala[1]);
        return objeto;
    },
    sonidoYPosicion: function (item) {
        this.guardaUltimaPos(item);
        this.sonidoCantidad(item);

    },
    sonidoCantidad: function (item) {
        var valor = item.key;
        if ((typeof valor) != 'string') {
            valor = item._text;
        }
        game.sound.play('_' + parseInt(valor));
    },
    crearObjetoArrastrable: function (valor, x, y, escala, onInputDown, onDragStop = null) {
        var objeto = this.crearTermino(valor, x, y, escala, onInputDown);
        //activando, para que pueda ser movida.
        if (onDragStop != null) {
            objeto.input.enableDrag(true);
            //objeto.input.enableSnap(90, 90, false, true);
            objeto.events.onDragStop.add(onDragStop, this);

        }
        return objeto;
    },

    controlEstrellas: function () {
        //en este caso tomaremos el numero de exitos, como un indicador, para
        // ganar estrellas en este caso tienes que hacer 3 buenas para ganar estrellas.

        if (Juego.starsArray[Juego.level - 1] < Juego.numero_exitos && Juego.veces >= 3) {
            Juego.starsArray[Juego.level - 1] = Juego.numero_exitos; //button.frame, es el numero de las estrellas.
            Estrellas.push({operador: Juego.operador, estrellas: Juego.starsArray});
            console.log('\n\t\t\t!!estoy adentro!!');
        }

// si se completa el nivel y el siguiente nivel esta bloqueado y existe, entonces lo desbloquea
        if (Juego.numero_exitos > 2 && Juego.starsArray[Juego.level] === 4 && Juego.level < Juego.starsArray.length) {
            Juego.starsArray[Juego.level] = 0; //cuando ha perdido.
            Estrellas.push({operador: Juego.operador, estrellas: Juego.starsArray});
            console.log('activa nuevo nivel');
        }

        if (Juego.numero_exitos <= 1 && Juego.veces >= 3) {
            Juego.starsArray[Juego.level - 1] = 4;
            if (Juego.level == 1) {
                Juego.starsArray[Juego.level - 1] = 0;
            }
            Juego.starsArray[Juego.level - 2] = 0; //cuando ha perdido.
            Estrellas.push({operador: Juego.operador, estrellas: Juego.starsArray});
            console.log('regresa nivel anterior');
        }
        console.log('Estrellas actuales:');
       // Adicion.detener();
        //Adicion.detener();
        //setTimeout(Adicion.detener,500);
        console.log(Juego.starsArray);
    },

    dropHandler: function (item) {

        const rectangulo_X_final = this.rectangulo.x + this.rectangulo.width;
        const rectanguloY_final = this.rectangulo.y + this.rectangulo.height;
        const tasa_aumento = 0;
        var condicion1 = item.x > (this.rectangulo.x - tasa_aumento) && item.x < (rectangulo_X_final + tasa_aumento);
        var condicion2 = item.y > (this.rectangulo.y) && item.y < (rectanguloY_final + 5);

        //solo si esta dentro del recuadro y si la suma es correcta sale el visto.
        if ((condicion1 && condicion2)) {
            //item.kill();
            item.anchor.setTo(0.8, 0.6);
            this.centrarObjeto(item, this.rectangulo);
            Respuesta.dada = item.key;
            UtilGui.setValorBooleano(item);
            this.game.add.existing(this.texto_siguiente);
        } else {
            item.x = this.ultima_posicion.x;
            item.y = this.ultima_posicion.y;
        }
    },
    colorCanasta: function (valor_dado, valor_esperado, canasta) {
        if (valor_dado == valor_esperado) {
            //game.add.existing(this.color_canasta);
            canasta.visible = true;
        } else {
            canasta.visible = false;
        }
        return canasta;
    },
    centrarObjeto: function (item, sobre) {

        item.x = Math.floor(sobre.x + sobre.width / 2);
        item.y = Math.floor(sobre.y + sobre.height / 2);
    },
    mostrarIntentos: function (x, y) {
        if (Juego.veces == 3) {
      fallos1 = game.add.text(x+70, y, 'Fallos: ' + Juego.numero_fracasos + '\nEstrellas: ' + Juego.numero_exitos, 'dynamic shadows');
        fallos1.anchor.set(0.5)
        fallos1.font = 'Arial Black';
        fallos1.fontSize = 30;
        fallos1.fontWeight = 'bold';
        fallos1.fill = '#ec008c';
        fallos1.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
          //  UtilGui.addTexto(x, y, 'Fallos: ' + Juego.numero_fracasos + '\nEstrellas: ' + Juego.numero_exitos, '30px Arial', '#fff', true);
        }

    },
    guardaUltimaPos: function (item) {
        this.ultima_posicion.x = item.x;
        this.ultima_posicion.y = item.y;
        item.bringToTop();
    },
    actualizar: function () {
        if (Juego.veces < 3) {
            game.state.start(game.state.getCurrentState().key);
        } else {
            game.state.clearCurrentState();
            Util.reiniciarNivel();
            game.state.start('niveles');
        }
    },
    respuestaTrueFalse: function () {
        Respuesta.dada = null;
        this.crearObjetoArrastrable('true', 400, 500, [0.5, 0.5], UtilGui.setValorBooleano);
        this.crearObjetoArrastrable('false', 700, 500, [0.5, 0.5], UtilGui.setValorBooleano);
    },
    respuestaMultiple: function (cantidad) {
        // RESPUESTAS
        var resultados_aleatorio = Util.getAleatoriosNoRepetidos(0, 10, cantidad - 1, [Respuesta.resultado]);
        var opciones = [];
        opciones.push(Respuesta.resultado);
        for (var i = 0; i < resultados_aleatorio.length; i++) {
            opciones.push(resultados_aleatorio[i]);
        }
        this.opciones_resultado = Util.arrayAleatorio(opciones);
        var objeto;
        var texto;
        for (var i = 0, espacio = 0; i < this.opciones_resultado.length; i++, espacio = espacio + 250) {
            objeto = this.crearObjetoArrastrable(this.opciones_resultado[i].toString(), game.world.centerX - 300 + espacio, 450, this.sizeObjetos, this.sonidoYPosicion, this.dropHandler);
            this.mostrarCantidadTextual(objeto, objeto.key);
        }

    }
};

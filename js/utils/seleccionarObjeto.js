//escrito por=: @XD

var seleccionarObjeto_state = {
    //__proto__: Nivel,

    create : function()
    {
        game.state.clearCurrentState();
        //aniadido de boton siguiente
        Objeto.seleccionado = false;

        var background = this.game.add.tileSprite(0, 0, 1920, 1080, 'tema2'); //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        //background.scale.setTo(1.55, 1.4); //Cambiar escala de la imagen
        background.scale.setTo(0.72, 0.62); //Cambiar escala de la imagen
        // background.tilePosition
        background.alpha = 0.122;

        //boton de fecha izquierda, para pasar la pagina.
        UtilGui.addBoton(game.world.centerX - 650, 20, 'button_atras', 0.4, true, Util.irNiveles);


        var titulo_seleccionar_objeto = this.add.text(220, 30, ' SELECCIONE UN OBJETO ',
        {fill : 'White'});
          titulo_seleccionar_objeto.fontSize = 70;
        titulo_seleccionar_objeto.inputEnabled = true;

        var distancia = 12; //tiene relacion con el tamaño de las manzanas (debe ser dinamico!)
        var tamanio_grupo_manzanas = 50;
        this.centerWorldX = this.game.world.centerX;
        this.centerWorldY = this.game.world.centerY - 150;
        var posX = 200;
        var posY = 0;

        var y = 150;

        var objetoSize = 1.6;

        UtilGui.addBoton(posX + 100, y + 100, 'manzana', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 250, y, 'pera', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 400, y + 100, 'banana', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 550, y, 'naranja', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 700, y + 100, 'fresa', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 850, y, 'pinia', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')

        y = 400;
        UtilGui.addBoton(posX + 100, y + 100, 'carro', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 250, y, 'lapiz', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 400, y + 100, 'mochila', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 550, y, 'oso', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 700, y + 100, 'pelota', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')
        UtilGui.addBoton(posX + 850, y, 'zapato', objetoSize, true, this.ObjetoElegido); // (x,y,'imagen')

        /*
         * el signo de suma esta definido total mente en el centro, por this.world.center
         * por lo que se tomara como referencia. aqui se regrafica t0do hacia la izquierda
         */
        //this.centerWorldX = this.centerWorldX - 250;

    },
    ObjetoElegido : function(objeto)
    {

        Juego.objeto = objeto.key;
        game.sound.play('_' + objeto.key);
        if (Objeto.seleccionado == false) {
            // game.load.onLoadComplete.add(this.fileComplete, this);
            console.log('llamando');
            Objeto.seleccionado = true;
            Nivel.Preloaders();
            
            //game.load.start();
            //game.state.start('nivel' + Juego.operacion);
        }
        //game.state.start('nivel' + Juego.operacion);

    },

};
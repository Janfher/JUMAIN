var portada_state = {
    button_jugar: {},
    button_activar_sonido: {},
    button_info: {},
    button_opciones: {},
    button_menu: {},
    background: {},
    button_titulo: {},
    musica: {},
    titulo: {},
    cartel_info: {},
    copyright: {},

    //PERSONAJES
    nino1: {},
    nino2: {},
    nino3: {},
    nino4: {},

    create: function () {

        //FONDO PANTALLA
        //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        background = this.game.add.tileSprite(0, 0, 1950, 1050, 'background');
        background.scale.setTo(0.85, 0.75); //Cambiar escala de la imagen
        logo_empresa1 = this.game.add.image(45, 0, 'logo_empresa');
        logo_empresa1.scale.setTo(0.2, 0.2); //Cambiar escala de la imagen
           logo_empresa1.alpha = 1;
        //BOTONES
        button_jugar = game.add.button(game.world.centerX-95, 540, 'button_jugar');
        button_jugar.scale.setTo(0.45, 0.45);
        button_jugar.inputEnabled = true;
        button_jugar.events.onInputDown.add(this.irJugar, this);

        button_activar_sonido = game.add.button(game.world.centerX - -500, 5, 'button_activar_sonido');//-400 y 500 Posicion de la imagen en la pantalla
        button_activar_sonido.events.onInputDown.add(this.click, this);
        button_activar_sonido.scale.setTo(0.35, 0.35);

        button_info = game.add.button(game.world.centerX - -580, 5, 'button_info');//-400 y 500 Posicion de la imagen en la pantalla
        button_info.events.onInputDown.add(this.Info, this);
        button_info.scale.setTo(0.35, 0.35);

    },
    

    irJugar: function () {
        this.state.start('seleccionarOperacion');
        sonido.volume = .1;
        jugar.play();
    },

    //pausa o reproduce la musica
    click: function () {
        if (sonido.paused) {
           sonido.resume();
        } else {
            sonido.pause();
        }
    },

    Info: function () {

        //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        background = this.game.add.tileSprite(0, 0, 2000, 1500, 'background');
        background.scale.setTo(0.85, 0.75);
            

        cartel_info = game.add.sprite(game.world.centerX - 450, 50, 'cartel_info');
        cartel_info.scale.setTo(1.8, 2);

        var texto = game.add.bitmapText(550, 200, 'desyrel','Informacion');
        texto.scale.setTo(1.5, 1.5);

        var texto1 = game.add.bitmapText(410, 300, 'desyrel', '        CREADO POR JUMAIN ');
        texto1.scale.setTo(1, 1);

        var texto2 = game.add.bitmapText(550, 350, 'desyrel', 'Copyright    2024 ');
        texto2.scale.setTo(1, 1);

        //COPYRIGHT
        UtilGui.crearSprite(game.world.centerX + 5, 355, 'copyright', [0.02, 0.02]);

        //BOTON MENU
        UtilGui.addBoton(game.world.centerX + 560, 15, 'button_menu', 0.45, true, Util.irPortada)
    },
};



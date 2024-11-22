
var seleccionarOperacion_state = {
    //Precarga de recursos
    //juego: game,
    create: function () {
        //Precarga.recargada = false;
        //AJUSTE AUTOMATICO DE PANTALLA
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        //game.scale.pageAlignHorizontally = true; //Mantiene el juego centrado Horizontalmente
        //game.scale.pageAlignVertically = true; //Mantiene el juego centrado Verticalmente
        game.stage.backgroundColor = '#33A2FF';

        //FONDO PANTALLA
        //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        background = this.game.add.tileSprite(0, 0, 1920, 1080, 'principal_menu');
        //background.scale.setTo(0.72, 0.62); //Cambiar escala de la imagen
        background.scale.setTo(0.72, 0.62); //Cambiar escala de la imagen
            background.alpha = 1;
        
        opcion = game.add.text(700, 50,'Escoje una opción', 'dynamic shadows');
        opcion.anchor.set(0.5)
        opcion.font = 'Arial White';
        opcion.fontSize = 80;
        opcion.fontWeight = 'bold';
        opcion.fill = '#33A2FF';
        opcion.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

        //AGREGAMOS LOS BOTONES

        UtilGui.addBoton(game.world.centerX - 165, 175, 'memoriza', 0.4, true, this.irMemoriza);
        UtilGui.addBoton(game.world.centerX +80 , 175, 'adicion', 0.4, true, this.irAdicion);  
        UtilGui.addBoton(game.world.centerX+330 , 175, 'sustraccion', 0.4, true, this.irSustraccion);

        //50 290     
        //game.world.centerX-140 470 
        
        UtilGui.addBoton(game.world.centerX -415, 325, 'suma', 0.4, true, this.irSuma);
        UtilGui.addBoton(game.world.centerX -168, 325, 'resta', 0.4, true, this.irResta);
        UtilGui.addBoton(game.world.centerX+80, 325, 'mayorque', 0.4, true,  this.irMayorque);
        UtilGui.addBoton(game.world.centerX + 330, 325, 'menorque', 0.4, true, this.irMenorque);

        UtilGui.addBoton(game.world.centerX -415, 470, 'igualque', 0.4, true,this.irIgualque);
        UtilGui.addBoton(game.world.centerX - 650, 20, 'button_atras', 0.4, true, Util.irPortada);      
        UtilGui.addBoton(game.world.centerX -168, 470, 'construir', 0.4, true, this.irConstruir);

        logo_empresa1 = this.game.add.image(game.world.centerX+550, 10, 'logo_empresa');
        logo_empresa1.scale.setTo(0.2, 0.2); //Cambiar escala de la imagen 
           logo_empresa1.alpha = 1;
     text4 = game.add.text(game.world.centerX+580,90, '  dynamic shadows  ');
    text4.anchor.set(0.5)
   // text.align = 'center';
    text4.font = 'Arial Black';
    text4.fontSize = 20;
    text4.fontWeight = 'bold';
    text4.fill = '#33A2FF';
    text4.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    text4.setText("JUMAIN");

         //tv1 = game.add.sprite(25, 150, 'tv').scale.setTo(.68, .7);
            //See the docs for the full parameters
            //  But it goes x, y, anchor x, anchor y, scale x, scale y
        //sprite1 = video1.addToWorld(83, 187, 0.1, 0.1, .4, .4115);
        //video1 = game.add.video('portada_video');
        //video1.play();
        //video1.stop();
        //boton1=UtilGui.addBoton(265, 450, 'button_ver_video', 0.2, true, this.reproducir); 
    },
reproducir: function () {
      
        // video1.paused = (video1.paused) ? false : true;
         if (sonido.paused) {
           sonido.resume();
        } else {
            sonido.pause();
        }
         console.log('Reproduce video');

       // window.open(window.location.href+"/assets/video/"+Juego.operacion.toLowerCase() + '.m4v', "_blank");
       //alert(Juego.operacion.toLowerCase());

        /*video = game.add.video(Juego.operacion.toLowerCase() + '_video');
        video.addToWorld(150, 50, 0, 0);
        video.play();
        UtilGui.addTexto(200, 200, 'Pausa', '30px Arial', '#fffaf8', true, this.pausa);*/

    },
    irMemoriza: function () {
        video1.stop();
        sonido.pause();
        jugar.pause();
        memoriza_sonido.play();
        Juego.operador = '?';
        Juego.operacion = 'Memoriza';
        Util.irNiveles();

    },

    irSuma: function () {
                video1.stop();

 sonido.pause();
        jugar.pause();
        suma_sonido.play();        Juego.operador = '+';
        Juego.operacion = 'Suma';
        //Estrellas.push({operador: '+', estrellas: [3, 3, 3, 0, 4, 4, 4, 4, 4]});
        Util.irNiveles();
    },

    irResta: function () {
                video1.stop();

 sonido.pause();
            jugar.pause();
            resta_sonido.play();        Juego.operador = '-';
        Juego.operacion = 'Resta';
        //Estrellas.push(operador: '-',estrellas: [3, 3, 2, 0, 4, 4, 4, 4, 4]});
        Util.irNiveles();
    },

    irAdicion: function () {
                video1.stop();

 sonido.pause();
            jugar.pause();
            adicion_sonido.play();        Juego.operador = '++';
        Juego.operacion = 'Adicion';
        //Estrellas.push({operador: '++', estrellas: [3, 3, 3, 0, 4, 4, 4, 4, 4]});
        Util.irNiveles();

    },

    irSustraccion: function () {
                video1.stop();

 sonido.pause();
            jugar.pause();
            sustraccion_sonido.play();        Juego.operador = '--';
        Juego.operacion = 'Sustraccion';
        Util.irNiveles();
    },

    irMayorque: function () {
                video1.stop();

 sonido.pause();
            jugar.pause();
            mayor_que_sonido.play();        Juego.operador = ">";
        Juego.operacion = 'Mayorque';
        Util.irNiveles();
    },
    irMenorque: function () {
                video1.stop();

 sonido.pause();
            jugar.pause();
            menor_que_sonido.play();
        Juego.operador = "<";
        Juego.operacion = 'Menorque';
        Util.irNiveles();
    },
    irIgualque: function () {
                video1.stop();

              igual_que_sonido.play();
        Juego.operador = "=";
        Juego.operacion = 'Igualque';
        Util.irNiveles();
    },

    irConstruir: function () {
                video1.stop();

              construir_sonido.play();
        Juego.operador = 'x';
        Juego.operacion = 'Construir';
        Util.irNiveles();
    },
    };
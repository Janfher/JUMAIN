//[imagenes miniaturas] o imagenes de botones, o thumbnails. (representan los niveles)

//Cuantas paginas se necesitan para mostrar todos los niveles?
var pages;
//variable tipo grupo donde se almacena todos los botones (thumbnails) de los niveles.
var levelThumbsGroup;
// pagina actual
var currentPage;

//flechas para navegar a traves de las paginas de los niveles, si las hay.
var leftArrow;
var rightArrow;
var video;
var reg = {};


niveles_state = {
    create: function () {

        /*video = game.add.video('memoriza_video');
         
         
         //video.play();*/


        starsArray = Util.findObjectByKey(Estrellas, 'operador', Juego.operador);
        Juego.starsArray = [0, 4, 4, 4, 4, 4, 4, 4, 4];
        if (starsArray != null) {
            Juego.starsArray = starsArray.estrellas;
        }
        //Estrellas.push({operador: '+', estrellas: [3, 3, 3, 4, 4, 4, 4, 4, 4]});
        //console.log( Util.findObjectByKey(Estrellas, 'operador', Juego.operador).estrellas);
        game.stage.backgroundColor = '#182d3b';

        //FONDO PANTALLA
        //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.
        background = this.game.add.tileSprite(0, 0, 1920, 1080, 'tema3');
        background.scale.setTo(0.72, 0.62); //Cambiar escala de la imagen
               background.alpha = 0.3;

        console.log("menu.js: confirmacion");

        //Cuantos paginas se necesitan para mostrar todos los niveles?

        //cuidado!! cada pagina deberian tener la misma cantidad de niveles, lo
        // que significa  que el nuemero de niveles esta obligado a ser divisibles por THUMBCOLS*THUMBROWS
        pages = Juego.starsArray.length / (Juego.thumbRows * Juego.thumbCols);


        //pagina actual de acuerdo al ultimo nivel jugado, si es que existe.
        currentPage = Math.floor(Juego.level / (Juego.thumbRows * Juego.thumbCols));
        if (currentPage > pages - 1) {
            currentPage = pages - 1;
        }

        //boton de fecha izquierda, para pasar la pagina.
        UtilGui.addBoton(game.world.centerX - 650, 20, "level_arrows", 0.4, true, Util.irOperaciones);

        // creando el grupo de [imagenes miniatura]
        levelThumbsGroup = game.add.group();
        // determining level thumbnails width and height for each page
        //determina el ancho  y el largo de las  [imagenes miniatura] para cada pagina
        var levelLength = Juego.thumbWidth * Juego.thumbCols + Juego.thumbSpacing * (Juego.thumbCols - 1);
        var levelHeight = Juego.thumbWidth * Juego.thumbRows + Juego.thumbSpacing * (Juego.thumbRows - 1);

        //bucle que se da por cada pagina.
        for (var l = 0; l < pages; l++) {

            //compensacion(offset) horizontal para tener las [imagenes miniatura] horizotalmente centradas en la pagina.
            var offsetX = 700;
//----

            //si quieres que los [imagenes miniatura]  esten centrados en 'y' en la pagina, solo remplaza el '20' por (game.height-levelHeight)/2
            var offsetY = (game.height - levelHeight) / 2;

            // bucle que se da por cada boton de nivel.
            for (var i = 0; i < Juego.thumbRows; i++) {
                for (var j = 0; j < Juego.thumbCols; j++) {

                    // a que nivel se refiere la [imagen miniatura] (actual)?
                    var levelNumber = i * Juego.thumbCols + j + l * (Juego.thumbRows * Juego.thumbCols);

                    console.log('||||||||||||aderiendo botones||||||||||||\n');

                    // adding the thumbnail, as a button which will call thumbClicked function if clicked
                    // añadiendo la [imagen miniatura], como un boton, el cual ejecutará la funcion [thumClicked], al hacerle click.
                    var levelThumb = game.add.button(offsetX + j * (Juego.thumbWidth + Juego.thumbSpacing),
                            offsetY + i * (Juego.thumbHeight + Juego.thumbSpacing), "levels", this.thumbClicked, this);

                    //La imagen, de la cual se importa levels, es un conjunto de imagenes, cada uno de estas
                    // representa un frame. Entonces podemos decir que la imagen levels, posee 4 frames, Que
                    // se usan para representar cada estado de nivel (0 activado, 1-2-3 estrellas y 4 bloqueado).
                    //mas info sobre button.frame: https://phaser.io/docs/2.4.4/Phaser.Button.html#frame

                    //mostrando el frame, de acuerdo al array de niveles.
                    levelThumb.frame = Juego.starsArray[levelNumber];

                    // añadiendo un atributo propio al objeto levelThumb.
                    levelThumb.levelNumber = levelNumber + 1;

                    // adding the level thumb to the group
                    // añadiendo el [boton de nivel] a al grupo(una variable tipo grupo)
                    levelThumbsGroup.add(levelThumb);

                    // si el nivel es juegable, escribe el número de nivel.
                    if (Juego.starsArray[levelNumber] < 4) {
                        //formato del número
                        var style = {
                            font: "24px Arial",
                            fill: "#ffffff"
                        };

                        var levelText = game.add.text(levelThumb.x + 5, levelThumb.y + 5, levelNumber + 1, style);
                        levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
                        levelThumbsGroup.add(levelText);
                    }
                }
            }
        }

        // desplazamiento del grupo de [botones de nivel] de acuerdo a la posicion de nivel
        levelThumbsGroup.x = currentPage * game.width * -1;
        //UtilGui.addBoton(game.world.centerX - 500, 150, Juego.operacion.toLowerCase(), 0.6, true);
       UtilGui.addImagen(game.world.centerX +512, 43, Juego.operacion.toLowerCase(), [.3, 0.3]);
        tv = game.add.sprite(30, 90, 'tv').scale.setTo(.7, .7);
            //See the docs for the full parameters
            //  But it goes x, y, anchor x, anchor y, scale x, scale y
    text8 = game.add.text(game.world.centerX,50, '  dynamic shadows  ');
    text8.anchor.set(0.5)
   // text.align = 'center';
    text8.font = 'Arial Black';
    text8.fontSize = 100;
    text8.fontWeight = 'bold';
    text8.fill = '#ffffff';
    text8.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

        if(Juego.operacion.toLowerCase()=='memoriza')
        {
        //foto1 = game.add.image(250, 20, 'cartel_memoriza');
        //foto1.scale.setTo(1, .3);
        text8.setText("Memoriza");
        sprite = memoriza.addToWorld(213, 260, 0.1, 0.1, .61,1.1);
        memoriza.play();
        memoriza.stop();
        boton=UtilGui.addBoton(525, 253, 'button_ver_video', 0.2, true, this.reproducir); 
        boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

        }
        else
        { 

             if(Juego.operacion.toLowerCase()=='adicion')
                 {
                   text8.setText("Adición");

        //foto2 = game.add.image(430, -25, 'carte_adicion');
        //foto2.scale.setTo(1, 1);
        sprite2 = adicionar.addToWorld(213, 260, 0.1, 0.1, .52,.9);
        adicionar.play();
        adicionar.stop();
        boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
                              boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                      }

              else
              {
                 if(Juego.operacion.toLowerCase()=='suma')
                 {
                        //foto3 = game.add.image(430, -25, 'cartel_suma');
        //foto3.scale.setTo(1, 1);
                    text8.setText("Suma");

                sprite1 = suma.addToWorld(213, 260, 0.1, 0.1, .61,1.1);
                suma.play();
                //
                suma.stop();
                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
                       boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                //alert("suma");
                }
                else
                {
                     if(Juego.operacion.toLowerCase()=='resta')
                         {
                                        text8.setText("Resta");

                               //foto4 = game.add.image(430, -25, 'cartel_resta');
        //foto4.scale.setTo(1, 1);
                                sprite3 = resta.addToWorld(213, 260, 0.1, 0.1, .61,1.1);
                              //sprite3 = resta.addToWorld(83, 187, 0.1, 0.1, .4, .4115);
                                resta.play();
                                 resta.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
                                boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                        }
                        else 
                        {
                                 if(Juego.operacion.toLowerCase()=='sustraccion')
                                    {
                                                    text8.setText("Sustracción");

          //              foto5 = game.add.image(430, -25, 'cartel_sustraccion');
        //foto5.scale.setTo(1, 1);
                                     sprite4 = sustraer.addToWorld(213, 260, 0.1, 0.1, .61,1.1);
                                sustraer.play();
                                 sustraer.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
        boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                                    }

 else 
                        {
                                 if(Juego.operacion.toLowerCase()=='mayorque')
                                    {
                                                    text8.setText("Mayor que");

                                            //foto6 = game.add.image(430, -25, 'cartel_mayor');
        //foto6.scale.setTo(1, 1);
 sprite5 = mayorque.addToWorld(213, 260, 0.1, 0.1, .52,.9);
                                mayorque.play();
                                 mayorque.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
        boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 



                                    }
                                     else 
                        {
                                 if(Juego.operacion.toLowerCase()=='menorque')
                                    {
                                                    text8.setText("Menor que");

   // foto7 = game.add.image(430, -25, 'cartel_menor');
     //   foto7.scale.setTo(1, 1);
 sprite6 = menorque.addToWorld(212, 262, 0.1, 0.1, .17,.24);
                                menorque.play();
                                 menorque.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
        boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                                    }
                                     else 
                        {
                                 if(Juego.operacion.toLowerCase()=='igualque')
                                    {
            text8.setText("Igual que");

                                    // foto8 = game.add.image(430, -25, 'cartel_igual');
        //foto8.scale.setTo(1, 1);
                                 sprite7 = igualque.addToWorld(213, 260, 0.1, 0.1, .51,.89);
                                igualque.play();
                                 igualque.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);
                                           boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                                    }
                                     else 
                        {
                                 if(Juego.operacion.toLowerCase()=='construir')
                                    {
                text8.setText("Construir");

    //foto9 = game.add.image(430, -25, 'cartel_construir');
      //  foto9.scale.setTo(1, 1);
                                    sprite8 = construir.addToWorld(213, 260, 0.1, 0.1, .61,1.1);
                                construir.play();
                                 construir.stop();
                                boton=UtilGui.addBoton(525, 250, 'button_ver_video', 0.2, true, this.reproducir);                                    }

                               boton1=UtilGui.addBoton(525, 306, 'expandir', 0.2, true, this.maximizar); 

                        }

                        }

                        }

                        }



                             


                        }

                }

              }
            

        }





        /* var img = video.addToWorld(0, 0);
         //img.alpha = 0.25;
         img.inputEnabled = true;
         img.events.onInputUp.addOnce(function () {
         video.play();
         console.log('`video.play()` via img.events.onInputUp.addOnce');
         
         });*/
         //game.input.onDown.add(this.reproducir, this.sprite);

    },
    createModals: function () {
        reg.modal.createModal({
            type: "modal1",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
                    type: "text",
                    content: "Simple Text with Modal background, \n nothing fancy here...",
                    fontFamily: "Luckiest Guy",
                    fontSize: 38,
                    color: "0xFEFF49",
                    offsetY: -50,
                    stroke: "0x000000",
                    strokeThickness: 5
                }
            ]
        });
    },


maximizar:function(){
//alert(sprite.x+" "+sprite.y+" "+sprite.height+" "+sprite.width+"Boton"+boton.x+" "+ boton.y);
    if(Juego.operacion.toLowerCase()=='memoriza')
        {
            if( sprite.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite.x=213;
                sprite.y=260;
                sprite.height=259.6;
                sprite.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y=575;
                sprite.x=100;
                sprite.y=26;
                sprite.height=680;
                sprite.width=1400;
            }
        }
        else
        {

                 if(Juego.operacion.toLowerCase()=='suma')
                 {
           if( sprite1.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite1.x=213;
                sprite1.y=260;
                sprite1.height=259.6;
                sprite1.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite1.x=100;
                sprite1.y=26;
                sprite1.height=680;
                sprite1.width=1400;
            }
                }
                else
                {
                     if(Juego.operacion.toLowerCase()=='resta')
                    {


     if( sprite3.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite3.x=213;
                sprite3.y=260;
                sprite3.height=259.6;
                sprite3.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite3.x=100;
                sprite3.y=26;
                sprite3.height=680;
                sprite3.width=1400;
            }

                    }
                else
                {
                          if(Juego.operacion.toLowerCase()=='adicion')
                 {
     if( sprite2.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite2.x=213;
                sprite2.y=260;
                sprite2.height=259.6;
                sprite2.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite2.x=100;
                sprite2.y=26;
                sprite2.height=680;
                sprite2.width=1400;
            }
                }
                else
                {
                             if(Juego.operacion.toLowerCase()=='sustraccion')
                 {
 if( sprite4.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite4.x=213;
                sprite4.y=260;
                sprite4.height=259.6;
                sprite4.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite4.x=100;
                sprite4.y=26;
                sprite4.height=680;
                sprite4.width=1400;
            }
                }
                else
                {
                     if(Juego.operacion.toLowerCase()=='mayorque')
                 {
 if( sprite5.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite5.x=213;
                sprite5.y=260;
                sprite5.height=259.6;
                sprite5.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite5.x=100;
                sprite5.y=26;
                sprite5.height=680;
                sprite5.width=1400;
            }
                }
                else
                {
                       if(Juego.operacion.toLowerCase()=='menorque')
                 {
                      if( sprite6.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite6.x=213;
                sprite6.y=260;
                sprite6.height=259.6;
                sprite6.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite6.x=100;
                sprite6.y=16;
                sprite6.height=800;
                sprite6.width=1400;
            }
                }
                else
                {
                       if(Juego.operacion.toLowerCase()=='igualque')
                 {
 if( sprite7.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite7.x=213;
                sprite7.y=260;
                sprite7.height=259.6;
                sprite7.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite7.x=100;
                sprite7.y=26;
                sprite7.height=680;
                sprite7.width=1400;
            }
                }
                else
                {
                    if(Juego.operacion.toLowerCase()=='construir')
                 {
 if( sprite8.x==100)
            {
                boton.y=253;
                boton.x=525;
                boton1.x= 525;
                boton1.y= 306;
                sprite8.x=213;
                sprite8.y=260;
                sprite8.height=259.6;
                sprite8.width=320.86;
            }
            else
            {
                boton.x=game.world.centerX;
                boton.y= 575;
                boton1.x=game.world.centerX+60;
                boton1.y= 575;
                sprite8.x=100;
                sprite8.y=26;
                sprite8.height=680;
                sprite8.width=1400;
            }
                }
        
                }
                }
                }
                }   
                }
                }
                }
                
        }
   
},

    reproducir: function () {
//alert(sprite.height);
        if(Juego.operacion.toLowerCase()=='memoriza')
        {
                 memoriza.paused = (memoriza.paused) ? false : true;

        }
        else
        {

                 if(Juego.operacion.toLowerCase()=='suma')
                 {
                                 suma.paused = (suma.paused) ? false : true;

                }
                else
                {
                     if(Juego.operacion.toLowerCase()=='resta')
                    {
                                 resta.paused = (resta.paused) ? false : true;

                    }
                else
                {
                          if(Juego.operacion.toLowerCase()=='adicion')
                 {
                                 adicionar.paused = (adicionar.paused) ? false : true;

                }
                else
                {
                             if(Juego.operacion.toLowerCase()=='sustraccion')
                 {
                                 sustraer.paused = (sustraer.paused) ? false : true;

                }
                else
                {
                     if(Juego.operacion.toLowerCase()=='mayorque')
                 {
                                 mayorque.paused = (mayorque.paused) ? false : true;

                }
                else
                {
                       if(Juego.operacion.toLowerCase()=='menorque')
                 {
                                 menorque.paused = (menorque.paused) ? false : true;

                }
                else
                {
                       if(Juego.operacion.toLowerCase()=='igualque')
                 {
                                 igualque.paused = (igualque.paused) ? false : true;

                }
                else
                {
                    if(Juego.operacion.toLowerCase()=='construir')
                 {
                                 construir.paused = (construir.paused) ? false : true;

                }
                }
                }
                }
                }   
                }
                }
                }
                
        }
        /*
         if (sonido.paused) {
           sonido.resume();
        } else {
            sonido.pause();
        }
        */
         console.log('Reproduce video');

       // window.open(window.location.href+"/assets/video/"+Juego.operacion.toLowerCase() + '.m4v', "_blank");
       //alert(Juego.operacion.toLowerCase());

        /*video = game.add.video(Juego.operacion.toLowerCase() + '_video');
        video.addToWorld(150, 50, 0, 0);
        video.play();
        UtilGui.addTexto(200, 200, 'Pausa', '30px Arial', '#fffaf8', true, this.pausa);*/

    },
   // pausa: function () {
     //   video.resume();
    //},

    thumbClicked: function (button) {
          click.play();
          sonido.resume();
          memoriza.stop();
          suma.stop();
          resta.stop();
          sustraer.stop();
          mayorque.stop();
          menorque.stop();
          igualque.stop();
          construir.stop();
          adicionar.stop();
        /* (El nivel is jugable, entonces juega)
         * [0:sin estrellas, 1: una estrella, 2: dos estrellas, 3: tres estrellas, 4: bloqueado]
         */

        if (button.frame < 4 && Juego.starsArray[button.levelNumber - 1] != 3) {
            Juego.level = button.levelNumber;
            Util.reiniciarNivel();
            game.state.start('seleccionarObjeto');
        } else {
            var buttonTween = game.add.tween(button);
            buttonTween.to({alpha: 0.5}, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({alpha: 1}, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({alpha: 0.5}, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({alpha: 1}, 20, Phaser.Easing.Cubic.None);
            buttonTween.start();
        }
    },
};
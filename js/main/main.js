/*
 * Esta es la seccion principal del juego, aqui se setean todos los states,
 * para ser llamados luego. Importante es setear los states, segun como son
 * llamados.
 */

//setea las dimensiones de pantalla para el juego en general.
var ancho_pantalla = 1360;
var alto_pantalla = 660;

//Objeto principal del juego
var game = new Phaser.Game(ancho_pantalla, alto_pantalla, Phaser.AUTO, 'jueguito',{preload : preload, create : create});

game.state.add('portada', portada_state);

game.state.add('seleccionarOperacion', seleccionarOperacion_state);
game.state.add('seleccionarObjeto', seleccionarObjeto_state);

game.state.add('niveles', niveles_state);

game.state.add('nivelMemoriza', Memoriza);
game.state.add('nivelSuma', Suma);
game.state.add('nivelResta', Resta);
game.state.add('nivelAdicion', Adicion);
game.state.add('nivelSustraccion', Sustraccion);
game.state.add('nivelMayorque', Mayorque);
game.state.add('nivelMenorque', Menorque);
game.state.add('nivelIgualque', Igualque);
game.state.add('nivelConstruir', Construir);

//conjuntos de estados usados para la parte de Juego.
game.state.add('Juego', Juego);
game.state.add('Util', Util);

game.state.add('Nivel', Nivel);

function preload() {
    //game.load.spritesheet('carte_adicion', 'assets/LETREROS/carte_adicion.png', 0, 0);
    //game.load.spritesheet('cartel_construir', 'assets/LETREROS/cartel_construir.png', 0, 0);
    //game.load.spritesheet('cartel_igual', 'assets/LETREROS/cartel_igual.png', 0, 0);
    //game.load.spritesheet('cartel_mayor', 'assets/LETREROS/cartel_mayor.png', 0, 0);
    //game.load.spritesheet('cartel_memoriza', 'assets/LETREROS/cartel_memoriza.png', 0, 0);
    //game.load.spritesheet('cartel_menor', 'assets/LETREROS/cartel_menor.png', 0, 0);
    //game.load.spritesheet('cartel_resta', 'assets/LETREROS/cartel_resta.png', 0, 0);
    //game.load.spritesheet('cartel_suma', 'assets/LETREROS/cartel_suma.png', 0, 0);
    //game.load.spritesheet('cartel_sustraccion', 'assets/LETREROS/cartel_sustraccion.png', 0, 0);
   
        game.load.image('flecha',  'assets/carteles/flecha.png');

    game.load.audio('adicion_sonido', ['assets/sonidos/adicion.mp3']);
    game.load.audio('construir_sonido', ['assets/sonidos/construir.mp3']);
    game.load.audio('igual_que_sonido', ['assets/sonidos/igual_que.mp3']);
    game.load.audio('mayor_que_sonido', ['assets/sonidos/mayor_que.mp3']);
    game.load.audio('memoriza_sonido', ['assets/sonidos/memoriza.mp3']);
    game.load.audio('menor_que_sonido', ['assets/sonidos/menor_que.mp3']);
    game.load.audio('resta_sonido', ['assets/sonidos/resta.mp3']);
    game.load.audio('suma_sonido', ['assets/sonidos/suma.mp3']);
    game.load.audio('sustraccion_sonido', ['assets/sonidos/sustraccion.mp3']);



    //FONDO DE PANTALLA
    game.load.image('logo_empresa', 'assets/fondos/logo.png');
    game.load.image('siguiente', 'assets/fondos/siguiente.png');
    game.load.image('tv', 'assets/fondos/tv.png');
    game.load.image('expandir', 'assets/fondos/expand.png');
    // game.load.image('encender', 'assets/fondos/encender.png');
    game.load.video('portada_video', 'assets/video/portada_video.mp4');
    game.load.image('tema2', 'assets/fondos/tema2.jpg');
    game.load.image('tema3', 'assets/fondos/tema3.png');

    game.load.image('background', 'assets/fondos/principal2.png');
    game.load.image('entrada1', 'assets/fondos/Bienvenidos.png');
    game.load.image('entrada2', 'assets/fondos/entrada2.jpg');
    game.load.image('entrada3', 'assets/fondos/entrada3.jpg');
    game.load.image('entrada4', 'assets/personajes/nino1.png', 0, 0);
    game.load.image('entrada5', 'assets/personajes/nino2.png', 0, 0);
    game.load.audio('fondo', ['assets/audio/Fondo.mp3']);
    game.load.audio('jugar', ['assets/audio/jugar.mp3']);
    game.load.audio('click', ['assets/audio/click.mp3']);
   // game.load.image('find', 'assets/personajes/find.gif', 0, 0);
   // game.load.image('sharmander', 'assets/personajes/sharmander.gif', 0, 0);

    //game.load.spritesheet('button', 'assets/boton/btn_inicio.png', 0, 0);
    // game.load.video('space', 'assets/video/adicion.m4v');
    //seccion videos rutas de enlace
    game.load.video('memoriza', 'assets/video/memoriza.mp4');
    game.load.video('suma', 'assets/video/sumar.mp4');
    game.load.video('resta', 'assets/video/restar.mp4');
    // game.load.video('suma', 'assets/video/sumar.mp4');
    game.load.video('mayorque', 'assets/video/mayor_que.mp4');
    game.load.video('menorque', 'assets/video/menor_que.mp4');
    game.load.video('igualque', 'assets/video/igual.mp4');
    game.load.video('adicionar', 'assets/video/adicionar.mp4');
    game.load.video('sustraer', 'assets/video/sustraer.mp4');
    game.load.video('construir', 'assets/video/construir.mp4');


}

var text;
var x = 32;
var y = 80;
function create() {
    //seccion videos
    //logo_empresa = game.add.image(0, 0,'logo_empresa');
    
    memoriza = game.add.video('memoriza');
    suma = game.add.video('suma');
    resta = game.add.video('resta');
    mayorque = game.add.video('mayorque');
    menorque = game.add.video('menorque');
    igualque = game.add.video('igualque');
    adicionar = game.add.video('adicionar');
    sustraer = game.add.video('sustraer');
    construir = game.add.video('construir');
  
    memoriza_sonido = game.add.audio('memoriza_sonido');
    suma_sonido = game.add.audio('suma_sonido');
    resta_sonido = game.add.audio('resta_sonido');
    mayor_que_sonido = game.add.audio('mayor_que_sonido');
    menor_que_sonido = game.add.audio('menor_que_sonido');
    igual_que_sonido = game.add.audio('igual_que_sonido');
    adicion_sonido = game.add.audio('adicion_sonido');
    sustraccion_sonido = game.add.audio('sustraccion_sonido');
    construir_sonido = game.add.audio('construir_sonido');
   // tv = game.add.image(0, 0,'tv');
    //siguiente = game.add.image(0, 0, 'siguiente');
    // encender = game.add.video('encender');



    video1 = game.add.video('portada_video');

    click = game.add.audio("click");

    jugar = game.add.audio("jugar");
    sonido = game.add.audio("fondo");
    sonido.play();
    sonido.loopFull();
    sonido.volume = 1;
    //AJUSTE AUTOMATICO DE PANTALLA
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true; //Mantiene el juego centrado Horizontalmente
    game.scale.pageAlignVertically = true; //Mantiene el juego centrado Verticalmente

    //FONDO PANTALLA
    game.stage.backgroundColor = '#182d3b';
    //Se ingresa las dimensiones de la imagen, junto con la variable que almacena la imagen.

    //  You can listen for each of these events from Phaser.Loader
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);

    //  Progress report
    text = game.add.text(600, 500, '',{fill : '#000000'});
    text1 = game.add.text(game.world.centerX, game.world.centerY, '  dynamic shadows  ');
    text1.anchor.set(0.5)
    // text.align = 'center';
    text1.font = 'Arial Black';
    text1.fontSize = 50;
    text1.fontWeight = 'bold';
    text1.fill = '#ec008c';
    text1.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    img = game.add.image(300, 0, 'entrada1').scale.setTo(1, .5);
    imga1 = game.add.image(0, 300, 'entrada2').scale.setTo(.7, .5);
    imga2 = game.add.image(1100, 300, 'entrada3').scale.setTo(.2, .2);
    imga3 = game.add.image(1200, 0, 'entrada4').scale.setTo(.3, .3);
    imga4 = game.add.image(0, 0, 'entrada5').scale.setTo(.3, .3);
    logo_empresa1 = this.game.add.image(game.world.centerX, game.world.centerY + 50, 'logo_empresa');
    logo_empresa1.scale.setTo(0.3, 0.3);
    text2 = game.add.text(game.world.centerX + 45, game.world.centerY + 155, '  dynamic shadows  ');
    text2.anchor.set(0.5)
    // text.align = 'center';
    text2.font = 'Arial Black';
    text2.fontSize = 40;
    text2.fontWeight = 'bold';
    text2.fill = '#33A2FF';
    text2.setText("Espoch");



    game.stage.backgroundColor = '#ffffff';
    start();
}

function start() {


    //BOTONES
    game.load.spritesheet('button_jugar', 'assets/boton/btn_jugar2.png', 0, 0);
    game.load.spritesheet('button_ver_video', 'assets/fondos/encender.png', 0, 0);
    game.load.spritesheet('button_activar_sonido', 'assets/boton/btn_activar_sonido.png', 0, 0);
    game.load.spritesheet('button_info', 'assets/boton/btn_info.png', 0, 0);
    game.load.spritesheet('button_opciones', 'assets/boton/btn_opciones.png', 0, 0);
    //game.load.spritesheet('button_titulo', 'assets/cartel1.png', 0, 0);
    //game.load.spritesheet('titulo', 'assets/carteles/Logo3.png', 0, 0);
    game.load.spritesheet('cartel_info', 'assets/cartel_grande1.png', 0, 0);
    game.load.spritesheet('copyright', 'assets/copyright.png', 0, 0);
    game.load.spritesheet('button_menu', 'assets/boton/btn_menu.png', 0, 0);

    //TEXTO
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');



    //PERSONAJES
   // game.load.spritesheet('nino1', 'assets/personajes/nino1.png', 0, 0);
    //game.load.spritesheet('nino2', 'assets/personajes/nino2.png', 0, 0);
    //game.load.spritesheet('nino3', 'assets/personajes/nino3.png', 0, 0);
    //game.load.spritesheet('nino4', 'assets/personajes/nino4.png', 0, 0);



    var dir_botones = 'assets/boton/';

    game.load.spritesheet('memoriza', dir_botones + 'memoriza.png', 0, 0);
    game.load.spritesheet('suma', dir_botones + 'suma.png', 0, 0);
    game.load.spritesheet('resta', dir_botones + 'resta.png', 0, 0);
    game.load.spritesheet('adicion', dir_botones + 'adicion.png', 0, 0);
    game.load.spritesheet('sustraccion', dir_botones + 'sustraccion.png', 0, 0);
    game.load.spritesheet('construir', dir_botones + 'construir.png', 0, 0);
    game.load.spritesheet('mayorque', dir_botones + 'mayor_que.png', 0, 0);
    game.load.spritesheet('menorque', dir_botones + 'menor_que.png', 0, 0);
    game.load.spritesheet('igualque', dir_botones + 'igual_que.png', 0, 0);
    game.load.image('TRUE', 'assets/boton/aceptar.png', 0, 0);


    game.load.spritesheet('button_atras', dir_botones + 'btn_atras.png', 0, 0);

    //TEXTO
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');


    game.load.image('+', 'assets/signos/signo_suma.png');
    game.load.image('-', 'assets/signos/signo_resta.png');
    game.load.image('>', 'assets/signos/signo_mayor.png');
    game.load.image('<', 'assets/signos/signo_menor.png');
    game.load.image('=', 'assets/signos/signo_igual.png');
    //game.load.image('pizarra', 'assets/fondos/pizarra.png');
    game.load.image('principal_menu', 'assets/fondos/principal_menu1.png');
   // game.load.image('camino', 'assets/fondos/travel.svg');

    game.load.spritesheet('button_menu', 'assets/boton/btn_menu.png', 0, 0);
    game.load.image('rect', 'assets/200x100corners.png');
    game.load.image('canasta', 'assets/canasta-naranja.png');
    game.load.image('canasta-verde', 'assets/canasta-verde.png');
    game.load.image('transparente', 'assets/transparente.png');
    game.load.image('correcto', 'assets/signos/signo_true.png');
    game.load.image('incorrecto', 'assets/signos/signo_false.png');
    game.load.image('true', 'assets/signos/signo_true.png');
    game.load.image('false', 'assets/signos/signo_false.png');
    game.load.image('tacho', 'assets/tacho.png');

    var objetos = ['manzana', 'pera', 'banana', 'naranja', 'fresa', 'pinia', 'carro', 'lapiz', 'mochila', 'oso', 'pelota', 'zapato'];

    for (var i = 0; i <= 10; i++) {
        game.load.audio('_' + i.toString(), ['assets/audio/' + i.toString() + '.mp3']);
    }
    game.load.audio('audio_correcto', ['assets/audio/correcto.mp3']);
    game.load.audio('audio_incorrecto', ['assets/audio/incorrecto.mp3']);

    //this.objetosResultado = objetos;

    //Juego.musica = 
    game.load.audio('cancion', ['assets/audio/cancion_infantil.mp3']);
    //game.load.crossOrigin = 'anonymous';



    for (var i = 0; i < objetos.length; i++) {
        game.load.audio('_' + objetos[i], ['assets/audio/' + objetos[i] + 's.mp3']);
        game.load.image(objetos[i], 'assets/objetos/' + objetos[i] + '.png');
    }


    game.load.spritesheet("levels", "assets/menu/levels.png", Juego.thumbWidth, Juego.thumbHeight);
    game.load.spritesheet("level_arrows", "assets/boton/btn_atras.png", 0, 0);
    game.load.spritesheet("game", "assets/menu/game.png", 200, 80);
    //console.log('preload');

    game.load.start();

}

function loadStart() {

    text.setText("Iniciando ...");

}

//  This callback is sent the following parameters:

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

    text1.setText("   Aprende y diviertete...");
    text.setText("              " + progress + "%");
    var progress = game.add.graphics(500, 700);
    game.load.onFileComplete.add(function(prg){
        progress.beginFill(0xFF3300);
        progress.drawRect(0, 0, prg * 4.8, 5);
        progress.endFill();
    });
}

function loadComplete() {

    text.setText("Carga Completa");

    if (Objeto.seleccionado == false) {
        console.log('aun no selecciona');
        //Juego.musica=game.sound.play('cancion');
        //Juego.video=game.video.play('memoriza_video');
        game.state.start('portada');
    } else {
        console.log('ya esta seleccionado: ' + Juego.objeto);
        game.state.start('nivel' + Juego.operacion);
    }

}
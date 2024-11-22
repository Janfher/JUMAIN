try
{

    //herencia implementada
var Construir = {
    __proto__: Nivel,
    rect1: {},
    rect2: {},
    rectSigno: {},
    grupo1: 0,
    grupo2: 0,
    itemCreador: {},
    color_canasta: {},
    color_canasta2: {},
    create: function () {
        Respuesta.resultado = Juego.level;
        //this.init_nivel();
        this.crearGUI_nivel();
        this.grupo1 = 0;
        this.grupo2 = 0;

        this.terminos = this.getTerminos([Respuesta.resultado, Respuesta.resultado + 1], 0, 10);
        //TERMINO 1
        this.rect1 = UtilGui.crearSprite(150, 100, 'canasta', [.6, .6]);//this.crearCuadro(200, 100, [1.5, 2]);
        //Indica la cantidad que deben adicionarse
        UtilGui.addTexto((this.rect1.width / 2) + this.rect1.x, 50, this.terminos[0].term1.toString(), '50px Arial', '#000', true);

        //Cuadro para cambiar color canasta
        this.color_canasta = UtilGui.crearSprite(135, 85, 'canasta-verde', [.351, .351]);
        this.color_canasta.visible = false;

        //SIGNO OPERADOR
        this.rectSigno = UtilGui.crearSprite(480, 200, 'rect', [0.5, 1]);

        //TERMINO 2
        this.rect2 = UtilGui.crearSprite(600, 100, 'canasta', [.6, .6]);//this.crearCuadro(600, 100, [1.5, 2]);
        UtilGui.addTexto((this.rect2.width / 2) + this.rect2.x, 50, this.terminos[0].term2.toString(), '50px Arial', '#fffaf8', true);

        //Cuadro para cambiar color canasta
        this.color_canasta2 = UtilGui.crearSprite(585, 85, 'canasta-verde',[.351, .351]);
        this.color_canasta2.visible = false;


        //Item Para Adicionar
        this.itemCreador = this.crearObjetoArrastrable('1', 550, 350, this.sizeObjetos, this.guardaUltimaPos, this.dropTermino);

        //Signos
        var signo_y = 120;
        this.crearObjetoArrastrable('>', 100, signo_y, [0.3, 0.3], this.guardaUltimaPos, this.dropSigno);
        this.crearObjetoArrastrable('<', 100, signo_y + 100, [0.3, 0.3], this.guardaUltimaPos, this.dropSigno);
        this.crearObjetoArrastrable('=', 100, signo_y + 200, [0.3, 0.3], this.guardaUltimaPos, this.dropSigno);
        this.crearObjetoArrastrable('+', 100, signo_y + 300, [0.3, 0.3], this.guardaUltimaPos, this.dropSigno);
        this.crearObjetoArrastrable('-', 100, signo_y + 400, [0.1, 0.1], this.guardaUltimaPos, this.dropSigno);

        //Resultado
        this.rectangulo = this.crearCuadro(950, 100, [1.5, 2]);

        console.log(Respuesta.resultado);
        console.log(this.terminos);
    },

    dropTermino: function (item) {
        var condicion1 = Util.comprobarObjetoDentroDe(item, this.rect1);
        var condicion2 = Util.comprobarObjetoDentroDe(item, this.rect2);
        if (condicion1 || condicion2) {

            if (condicion1) {
                if (this.color_canasta.visible == false) {
                    this.crearObjetoArrastrable('1', item.x, item.y, this.sizeObjetos, this.guardaUltimaPos, this.eliminarTermino);
                    this.grupo1 += 1;
                    this.game.sound.play('_' + this.grupo1);
                    this.colorCanasta(this.grupo1, this.terminos[0].term1, this.color_canasta);
                }
            }
            if (condicion2) {
                if (this.color_canasta2.visible == false) {
                    this.crearObjetoArrastrable('1', item.x, item.y, this.sizeObjetos, this.guardaUltimaPos, this.eliminarTermino);
                    this.grupo2 += 1;
                    this.game.sound.play('_' + this.grupo2);
                    this.colorCanasta(this.grupo2, this.terminos[0].term2, this.color_canasta2);
                }
            }
            Juego.operador = item.key;
        }
        item.x = this.ultima_posicion.x;
        item.y = this.ultima_posicion.y;


    },
    eliminarTermino: function (item) {
        var condicion1 = Util.comprobarObjetoDentroDe(item, this.rect1);
        var condicion2 = Util.comprobarObjetoDentroDe(item, this.rect2);
        var term = this.ubicacionTermino(item);
        if (term == 1 && !condicion1) {
            this.grupo1 -= 1;
            item.kill();
            this.colorCanasta(this.grupo1, this.terminos[0].term1, this.color_canasta);
        }
        if (term == 2 && !condicion2) {
            this.grupo2 -= 1;
            item.kill();
            this.colorCanasta(this.grupo2, this.terminos[0].term2, this.color_canasta2);
        }
    },
    dropSigno: function (item) {
        var condicion = Util.comprobarObjetoDentroDe(item, this.rectSigno);
        if (condicion && this.grupo1 > 0 && this.grupo2 > 0) {
            this.centrarObjeto(item, this.rectSigno);
            Juego.operador = item.key;
            this.actualizarTerminos();
            Respuesta.resultado = Util.evaluarOperacion(this.terminos[0].term1, this.terminos[0].term2);
            if (typeof Respuesta.resultado == 'number') {
                this.respuestaMultiple(3);
            }
            if (typeof Respuesta.resultado == 'boolean') {
                this.respuestaTrueFalse();
            }
            this.itemCreador.inputEnabled = false;
            item.inputEnabled = false;
            Juego.operador = 'x';

        } else {
            item.x = this.ultima_posicion.x;
            item.y = this.ultima_posicion.y;
        }
        //this.operarResultados();

        // back to level selection
    },
    ubicacionTermino: function (item) {
        var condicion1 = Util.comprobarObjetoDentroDe({x: this.ultima_posicion.x, y: this.ultima_posicion.y, width: item.width, height: item.height}, this.rect1);
        var condicion2 = Util.comprobarObjetoDentroDe({x: this.ultima_posicion.x, y: this.ultima_posicion.y, width: item.width, height: item.height}, this.rect2);
        var term = 0;
        if (condicion1) {
            term = 1;
        }
        if (condicion2) {
            term = 2;
        }
        return term;
    },
    actualizarTerminos: function () {
        this.terminos[0].term1 = this.grupo1;
        this.terminos[0].term2 = this.grupo2;
        return this.terminos;
    },
};
}
catch(err)
{
alert(err.message);
}


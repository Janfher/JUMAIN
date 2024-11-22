var UtilGui = {

    addBoton: function (x, y, nombre, size, enabled, onInputDown = null) {
        var boton = game.add.button(x, y, nombre);
        boton.scale.setTo(size);
        boton.inputEnabled = enabled;
        if (onInputDown != null) {
            boton.events.onInputDown.add(onInputDown, this);
        }
        return boton;
    },

    addTexto: function (x, y, texto, size, color, enabled, onInputDown = null) {
        var text = game.add.text(x, y, texto, {font: size, fill: 'white', stroke: 'white'});
        text.inputEnabled = enabled;
        if (onInputDown != null) {
            text.events.onInputDown.add(onInputDown, this);
        }

        return text;
    },

    crearTexto: function (x, y, texto, size, color, enabled, onInputDown = null) {
        var text = game.make.text(x, y, texto, {font: size, fill: color,stroke: '#000000'});
        text.inputEnabled = enabled;
        if (onInputDown != null) {
            text.events.onInputDown.add(onInputDown, this);
        }
        return text;
    },

    crearSprite: function (x, y, objeto, size) {
        var sprite = game.add.sprite(x, y, objeto, {stroke: '#000000'});
        sprite.scale.setTo(size[0], size[1]);
        return sprite;
    },

    crearImagen: function (x, y, objeto, size) {
        var imagen = game.make.image(x, y, objeto);
        imagen.scale.setTo(size[0], size[1]);
        return imagen;
    },

    addImagen: function (x, y, objeto, size) {
        var imagen = game.add.image(x, y, objeto);
        imagen.scale.setTo(size[0], size[1]);
        return imagen;
    },

    setValorBooleano: function (item) {
        if (Respuesta.dada == null) {
            Respuesta.dada = item.key;
        }
        Juego.veces += 1;
        //console.log('resultado:' + Respuesta.resultado + ', respuesta: ' + (Respuesta.dada).toString().split(/[_if]/););
        if (Respuesta.dada.toString().toLowerCase() == Respuesta.resultado.toString().toLowerCase()) {
            if (Juego.numero_fracasos < 2)
                Juego.numero_exitos += 1;
            Respuesta.calificacion = Nivel.crearCalificacion(1090, 120, [0.50, 0.50], 'correcto');
            game.sound.play('audio_correcto');
        } else {
            Juego.numero_fracasos += 1; //contando fracasos.
            Respuesta.calificacion = Nivel.crearCalificacion(1090, 120, [0.50, 0.50], 'incorrecto');
            game.sound.play('audio_incorrecto');
        }
        item.inputEnabled = false;
        var transparente = this.crearSprite(100, 350, 'transparente', [5, 2.5]);
        transparente.inputEnabled = true;
        transparente.events.onInputDown.add(this.conso, this);
    },
    conso: function () {
        console.log('clickkk');
    }

};

Util = {

    irPortada: function () {
 
        game.state.start('portada');
        sonido.volume = 1;
        jugar.stop();
               click.play();
    },
    irOperaciones: function () {
            memoriza.stop();
            suma.stop();
            resta.stop();
            adicionar.stop();
            construir.stop();
            sustraer.stop();
            mayorque.stop();
            menorque.stop();
            igualque.stop();
        sonido.resume();
        sonido.volume = .1;

        click.play();
        game.state.start('seleccionarOperacion');
    },

    irNiveles: function () {
        //video.play();
            memoriza.stop();
            suma.stop();
            resta.stop();
            adicionar.stop();
            construir.stop();
            sustraer.stop();
            mayorque.stop();
            menorque.stop();
            igualque.stop();
              //click.play();
        sonido.resume();
        sonido.volume = .1;
        Util.reiniciarNivel();
        game.state.start('niveles');
        
    },
    reiniciarNivel: function () {
        Juego.veces = 0;
        Juego.numero_exitos = 0;
        Juego.numero_fracasos = 0;
    },
    arrayAleatorio: function (array) {
        var lista = array;
        lista = lista.sort(function () {
            return Math.random() - 0.5
        });
        return lista;
    },
    findObjectByKey: function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    },
    //obtiene los terminos de los cuales un numero es sumado.
    //getTerminos: function (terminos, operador, resultado) {
    getTerminos: function (resultados, operador, inicio, fin) {

        var terminos = [];
        for (var resp = 0; resp < resultados.length; resp++) {
            var valor = 0;
            for (var i = inicio; i <= fin; i++) {
                for (var j = fin; j >= inicio; j--) {
                    switch (operador) {
                        case '+':
                            valor = i + j;
                            break;
                        case '-':
                            valor = i - j;
                            break;
                        case '>':
                        case '<':
                        case '=':
                            if ((j >= resultados[0] && j <= resultados[resultados.length - 1]) && (i >= resultados[0] && i <= resultados[resultados.length - 1])) {
                                terminos.push({term1: i, term2: j, res: this.evaluarOperacion(i, j)});
                            }
                            resp = resultados.length;
                            break;
                        case '?':
                        case '++':
                        case '--':
                            if ((j >= resultados[0] && j <= resultados[resultados.length - 1])) {
                                terminos.push({term1: j, res: null});
                            }
                            i = fin;
                            resp = resultados.length;
                            break;
                        case 'x':
                            if ((j >= resultados[0] && j <= resultados[resultados.length - 1]) && (i >= resultados[0] && i <= resultados[resultados.length - 1]) && i >= j) {
                                terminos.push({term1: i, term2: j, res: this.evaluarOperacion(i, j)});
                            }
                            resp = resultados.length;
                            break;
                    }
                    switch (operador) {
                        case '+':
                        case '-':
                            if (valor == resultados[resp]) {
                                terminos.push({term1: i, term2: j, res: valor});
                            }
                            break;

                    }

                }
            }
        }
        return terminos;
    },
    comprobarObjetoDentroDe: function (item, objeto_base) {
        var mitad_item_x = item.x;
        var mitad_item_y = item.y;
        var item_x = item.width / 2;
        var item_y = item.height / 2;

        var rectX_inicial = objeto_base.x;
        var rectY_inicial = objeto_base.y;
        var rectX_final = objeto_base.x + objeto_base.width;
        var rectY_final = objeto_base.y + objeto_base.height;
        var condicion1 = mitad_item_x >= rectX_inicial && mitad_item_x <= rectX_final;
        var condicion2 = mitad_item_y > (rectY_inicial) && mitad_item_y < (rectY_final);

        var condicion = condicion1 && condicion2;
        return condicion;
    },

    evaluarOperacion: function (term1 = 0, term2 = 0, operador = Juego.operador) {
        var valor = false;
        switch (operador) {
            case '+':
                valor = term1 + term2;
                break;
            case '-':
                valor = term1 - term2;
                break;
            case '>':
                valor = term1 > term2;
                break;
            case '<':
                valor = term1 < term2;
                break;
            case '=':
            case '++':
            case '--':
                valor = term1 == term2;
                break;
            case '?':
                valor = term1;
                break;
        }

        return valor;
    },

    contador: 0,
    cantidad_subniveles: 3,

    next: function () {
         click.play();
        if (this.contador >= this.cantidad_subniveles)
            this.contador = 0;

        return this.contador++;

    },

    //Obtiene un array de aleatorios, segun el tamanio deseado.
    getAleatoriosNoRepetidos: function (inicio, fin, cantidad, elementos_excluidos) {
        // cantidad || (cantidad = (fin - inicio) + 1); //Si no se tiene cantidad, valor por defecto
        elementos_excluidos || (elementos_excluidos = []); //valor por defecto
        var array = [];
        //genera array de los numeros deseados
        for (var i = inicio; i <= fin; i++) {
            if (elementos_excluidos.indexOf(i) === -1) //existe algun elemento excluido, no lo insertes
                array.push(i);
        }
        var array_revuelto = this.revolverArray(array);
        cantidad || (cantidad = array.length); //Si no se tiene cantidad, valor por defecto
        return this.getCorteAleatorio_array(array_revuelto, cantidad);
    },

    //obtiene un array, apartir de otro,dado el tamanio de corte deseado. Tal que de [1, 2, 3, 4, 5],
    //se pueda obtener con un tamanio_de_corte de 3: [2, 3, 4] o [3, 4, 5] o [4, 5, 1] o [5, 1, 2]
    //el inicio del corte se calcula aleatoriamente. //nota: si el tamanio_corte es mayor al size del array, generara el los cortes combinaciones repetitivas
    getCorteAleatorio_array: function (array, tamanio_corte) {

        var inicio_corte = Math.floor(Math.random() * (array.length));
        var fin_corte = inicio_corte + tamanio_corte;
        var array_cortado = [];
        var cont_posiciones = inicio_corte;

        for (var i = inicio_corte; i < fin_corte; i++) {
            if (cont_posiciones >= (array.length)) {
                cont_posiciones = 0;
            }
            array_cortado.push(array[cont_posiciones]);

            cont_posiciones++;
        }
        return array_cortado;
    },

    //revuelve un array de manera aleatoria de tal manera que [1, 2, 3, 4, 5]
    // pueda lucir como [2, 3, 5, 1, 4] o [1, 5, 4, 2, 3] ...
    revolverArray: function (array) {
        var posicion_actual = array.length, posicion_aleatoria = 0, temp;

        while (posicion_actual--) {
            posicion_aleatoria = Math.floor(Math.random() * (posicion_actual + 1));

            //cambia aleatoriamente el elemento seleccionado con el elemento actual
            temp = array[posicion_actual];
            array[posicion_actual] = array[posicion_aleatoria];
            array[posicion_aleatoria] = temp;
        }

        return array;
    },

    eliminarElemento_array: function (array, elementos_a_eliminar) {

        elementos_a_eliminar.forEach(function (elemento, posicion_elemento) {
            var posicion_elemento = array.indexOf(elemento);

            if (posicion_elemento !== -1) {
                array.splice(posicion_elemento, 1);
            }

        });

        return array;
    },
};



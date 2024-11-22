
Juego = {
    thumbRows : 3,
    //numero de columnas del grupo de [imagenes miniatura]
    thumbCols : 3,
    //ancho de [imagenes miniatura], en pixeles
    thumbWidth : 64,
    // height of a thumbnail, in pixels
    //altura de los botones, en pixeles
    thumbHeight : 64,
    // space among thumbnails, in pixels
    //cantidad de espacio entre los botones, en pixeles
    thumbSpacing : 20,
    //---

    // 0 = nivel jugable aun no finalizado, o activado para jugar.
    // 1, 2, 3 = nivel finalizado con 1, 2, 3 estrellas.
    // 4 = bloqueado
    starsArray : [0, 4, 4, 4, 4, 4, 4, 4, 4],
    //starsArray: [0, 0, 0, 0, 0, 0, 0, 0, 0],

    // level currently playing
    //nivel que se esta jugando actualmente.
    level : 0,
    cantidad_subniveles : 3,

    //numero de existos, obtenidos en un nivel.
    numero_exitos : 0,
    numero_fracasos : 0,

    operacion : 'Sumar',
    operador : '+',
    objeto : '',
    veces : 0,
    musica : '',
    video : ''

};
Estrellas = [];

Respuesta = {
    resultado : null,
    dada : null,
    calificacion : null
};

Objeto = {
    seleccionado : false
};
var turno = 'X';
var jugando = true;
var movimientos = 0;

function jugar(id){
  if (jugando){
    marcar(id);
    validar();  
  }
  
  if (movimientos == 9 && jugando){
    jugando = false;
    info('EMPATE!');
  }
}

function info(msg){
  document.getElementById('info').innerHTML = msg;
}

function validarLinea(a,b,c){
  var v1 = document.getElementById(a).innerHTML;
  var v2 = document.getElementById(b).innerHTML;
  var v3 = document.getElementById(c).innerHTML;
  
  if (v1 == v2 && v2 == v3){
    info("TENEMOS UN GANADOR!!");
    document.getElementById(a).classList.add('ganador');
    document.getElementById(b).classList.add('ganador');
    document.getElementById(c).classList.add('ganador');
    jugando = false;
  }
}

function validar(){
  validarLinea('c1', 'c2', 'c3');
  validarLinea('c4', 'c5', 'c6');
  validarLinea('c7', 'c8', 'c9');
  validarLinea('c1', 'c4', 'c7');
  validarLinea('c2', 'c5', 'c8');
  validarLinea('c3', 'c6', 'c9');
  validarLinea('c1', 'c5', 'c9');
  validarLinea('c3', 'c5', 'c7');
}


function marcar(id){
  var elem = document.getElementById(id);

  elem.innerHTML = turno;
  elem.classList.add('ocupado');

  if (turno == 'O'){
    turno = 'X';
  }else{
    turno = 'O';
  }
  
  info("Es el turno de " + turno);
  movimientos++;
}
alert("Clique para executar no console");
//Ao clicar na janela do navegador executa ambas as funções
window.addEventListener("click", dist);
window.addEventListener("click", dist3);

function dist(){
//Cria Vetores para o ponto e o vetor
  var p1 = {
    x: 0,
    y: 0
  }

  var p2 = {
    x: 4,
    y: 3
  }

  var vetor = {
    mag:0,
    ang:0
  }
//Cálculos e conversão de dados
  vetor.mag = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  let rad = Math.atan((p2.y - p1.y)/p2.x - p1.x);
  vetor.ang = ((rad*180)/Math.PI);
//Arredondamento de valores
  vetor.mag = +vetor.mag.toFixed(2);
  vetor.ang = +vetor.ang.toFixed(2);
//Printa no console
  console.log(vetor)
}

function dist3(){
//Cria Vetores para o ponto e o vetor
  var p1 = {
    x: 0,
    y: 0,
    z: 0
  }

  var p2 = {
    x: 1,
    y: 1,
    z: 1
  }

  var vetor = {
    mag:0,
    angX:0,
    angY:0,
    angZ:0
  }
//Cálculos de módulo do vetor para cada triângulo e seus ângulos
  let magX = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
  let radX = Math.acos((p2.x - p1.x)/magX);
  vetor.angX = ((radX*180)/Math.PI);

  let magY = Math.sqrt(Math.pow((p2.z - p1.z), 2) + Math.pow((p2.y - p1.y), 2));
  let radY = Math.acos((p2.y - p1.y)/magY);
  vetor.angY = ((radY*180)/Math.PI);

  let magZ = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.z - p1.z), 2));
  let radZ = Math.acos((p2.z - p1.z)/magZ);
  vetor.angZ = ((radZ*180)/Math.PI);
//Módulo(magnitude) do vetor em 3D
  vetor.mag = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2) + Math.pow((p2.z - p1.z), 2));
//Arredondamento dos valores
  vetor.mag = +vetor.mag.toFixed(2);
  vetor.angX = +vetor.angX.toFixed(2);
  vetor.angY = +vetor.angY.toFixed(2);
  vetor.angZ = +vetor.angZ.toFixed(2);
//printa no console
  console.log(vetor)
}

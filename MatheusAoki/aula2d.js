var	vertexShaderSource,
	fragmentShaderSource,
	vertexShader,
	fragmentShader,
	shaderProgram,
	positionAttr,
	canvas,
	gl,
	buffer,
	data,
	uniformLocation,
	aspectLocation;


var aspect = 1;
var deslocx = 0.01;
var deslocy = 0.01;
var px = 0;
var py = 0;

var speedMoveX = 0.05;
var speedMoveY = 0.0;
var prob = 0.001;

var ax = 0;
var bx = 0.2;
var ay = 0;
var by = 0.2;

//Sistema de arquivos
window.addEventListener("SHADERS_LOADED", main);
loadFile("vertex.glsl","VERTEX",loadShader);
loadFile("fragment.glsl","FRAGMENT",loadShader);
function loadFile(filename, type, callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET",filename,true);
	xhr.onload = function(){callback(xhr.responseText,type)};
	xhr.send();
}

function getGLContext(){
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	resize();
}

function loadShader(text,type){
	if(type == "VERTEX") vertexShaderSource = text;
	if(type == "FRAGMENT") fragmentShaderSource = text;
	if(vertexShaderSource && fragmentShaderSource) window.dispatchEvent(new Event("SHADERS_LOADED"));
}

function compileShader(source,type){
	shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(shader));
	return shader;
}

function linkProgram(vertexShader,fragmentShader){
	var program	= gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.log("Error: Program Linking.");
	return program;
}

function getData(){
	var points = [

					bx,by,
					ax,by,
					ax,ay,

					ax,ay,
					bx,ay,
					bx,by
				];
	return {"points": new Float32Array(points)};
}

function main() {
	/* LOAD GL */
	getGLContext();

	/* COMPILE AND LINK */
	vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
	fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
	shaderProgram = linkProgram(vertexShader,fragmentShader);
	gl.useProgram(shaderProgram);

	/* PARAMETERS */
	data = getData();
	positionAttr = gl.getAttribLocation(shaderProgram, "position");
	buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(positionAttr);
	gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

	/* DRAW */
	//gl.lineWidth(5.0);
	//gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES
	animate();

}

function animate(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	uniformLocation = gl.getUniformLocation(shaderProgram, "luzPos");
	gl.uniform2f(uniformLocation, px, py);
	aspectLocation = gl.getUniformLocation(shaderProgram, "aspect");
	gl.uniform1f(aspectLocation, aspect);
	movePonto();
	gl.drawArrays(gl.TRIANGLES, 0, data.points.length/2);
	window.requestAnimationFrame(animate);
}

window.addEventListener("mousemove", mover);
window.addEventListener("resize", resize);

function movePonto(evt){
	if (Math.random() < prob){
		deslocx = (Math.random() * 0.01);
		deslocy = (Math.random() * 0.01);
	}

  var translation = gl.getUniformLocation(shaderProgram, 'translation');
	gl.uniform2f(translation, speedMoveX, speedMoveY, 0.0);

	speedMoveX = speedMoveX+deslocx;
	speedMoveY = speedMoveY+deslocy;
	if (speedMoveX >= 0.9 ){
		deslocx = deslocx*-1;
	}
	if (speedMoveX <= -1.0 ){
		deslocx = deslocx*-1;
	}
	if (speedMoveY >= 0.8 ){
		deslocy = deslocy*-1;
	}
	if (speedMoveY <= -1.0 ){
		deslocy = deslocy*-1;
	}
}

function mover(evt){
  let x = evt.x;
  let y = evt.y;
  let w = window.innerWidth;
  let h = window.innerHeight;

	px = ((x/w)*2)-1;
	py = (((y/h)*2)-1)*-1;
}

function resize(evt){
	let w = window.innerWidth;
  let h = window.innerHeight;

	canvas.setAttribute("width", w);
	canvas.setAttribute("height", h);

	aspect = h/w;

	gl.viewport(0, 0, w, h);
}

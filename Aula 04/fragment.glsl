precision highp float;

varying vec2 positionPixel;
vec2 luz = vec2(-1.0, -1.0);

void main() {
	float distancia = distance(luz, positionPixel) / (2.0 * sqrt(2.0));

	gl_FragColor = vec4(1.0,1.0-distancia,1.0-distancia,1.0);
}

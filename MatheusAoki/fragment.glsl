precision highp float;

uniform vec2 luzPos;

varying vec2 positionPixel;
 //vec2(-1.0, -1.0);

float r2 = 2.83;



void main() {
	vec2 luz = luzPos;
	float d = 1.0 - (distance(luz, positionPixel) / r2);
	gl_FragColor = vec4(1.0,d,d,1.0);
}

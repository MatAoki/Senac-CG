attribute vec2 position;

void main() {
	gl_PointSize = 50.0;
	gl_Position = vec4(position.x*0.75, position.y , 1.0, 1.0);
}

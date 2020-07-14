let i,
points = [],
canvasHeight = 500,
canvasWidth = 500,
xAngel = 0,
yAngel = 0,
freq = 0.13,
xSlider,
ySlider,
cleanupButton;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	background(200);
	frameRate(200);
	// xSlider = createSlider(0, 100, 0);
	// ySlider = createSlider(0, 100, 0);
	xSlider = createInput(0);
	ySlider = createInput(0);
	cleanupButton = createButton('Cleanup canvas');
	cleanupButton.mousePressed(() => {points = []});
}

function draw() {
	const xFreq = Number(xSlider.value()) / 1000;
	const yFreq = Number(ySlider.value()) / 1000;
	background(250)
	x = (Math.sin(xAngel) * 200) + canvasWidth / 2;
	y = (Math.cos(yAngel) * 200)+ canvasHeight / 2;
	point(x, y)
	points.unshift([x, y])
	if (points.length > canvasWidth * 2) points.pop();
	points.map(([x, y]) => {
		point(x, y)
	})
	xAngel += xFreq;
	yAngel += yFreq;
}

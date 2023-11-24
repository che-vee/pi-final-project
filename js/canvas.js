const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;

// Set initial properties
canvasContext.lineJoin = "round";
canvasContext.lineCap = "round";
canvasContext.lineWidth = 220;

// Initialize drawing variables
let drawing = false;
let points = [];
let gradient;

// Function to create a linear gradient
const createLinearGradient = () => {
	gradient = canvasContext.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);
	gradient.addColorStop(0, "#DAB692");
	gradient.addColorStop(0.5, "#8D9B6A");
	gradient.addColorStop(1, "#8A9EA7");
};

// Function to draw on the canvas
const draw = (event) => {
	if (!drawing) return;

	const x = event.clientX - canvas.getBoundingClientRect().left;
	const y = event.clientY - canvas.getBoundingClientRect().top;

	points.push({
		x,
		y,
		gradient,
		alpha: 1,
	});

	canvasContext.clearRect(0, 0, canvas.width, canvas.height);

	// Redraw all active points every frame
	points.forEach((point, i) => {
		canvasContext.beginPath();

		if (i > 0) {
			// Use the previous point to get a continuous line
			canvasContext.moveTo(points[i - 1].x, points[i - 1].y);
		} else {
			canvasContext.moveTo(point.x, point.y);
		}

		canvasContext.strokeStyle = point.gradient;
		canvasContext.globalAlpha = point.alpha;
		canvasContext.lineTo(point.x, point.y);
		canvasContext.stroke();

		point.alpha = Math.max(point.alpha - 0.01, 0);

		if (point.alpha === 0) {
			points.splice(i, 1);
		}
	});

	// Reset globalalpha (full opacity)
	canvasContext.globalAlpha = 1;
};

//Event listeners
canvas.addEventListener("mouseenter", () => {
	drawing = true;
	points = [];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
	drawing = false;
});

window.addEventListener("resize", () => {
	canvas.width = document.body.scrollWidth;
	canvas.height = document.body.scrollHeight;
	createLinearGradient();
});

const initCanvas = () => {
	createLinearGradient();
};

initCanvas();

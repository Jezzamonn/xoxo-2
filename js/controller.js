import { slurp, to2dIsometric } from "./util";

import { renderBoundingCube } from "./render-cube";

export default class Controller {

	constructor() {
		this.animAmt = 0;
	}

	update(dt) {
		const period = 4;
		this.animAmt += dt / period;
		this.animAmt %= 1;
	}

	/**
	 * @param {CanvasRenderingContext2D} context 
	 */
	render(context) {
		const halfWidth = context.canvas.width / 2;
		const halfHeight = context.canvas.height / 2;
		const size = 70;
		let startX = 0.5;
		let startY = 0.5;
		while (size * startX > -halfWidth) {
			startX --;
		}
		while (size * startY > -halfHeight) {
			startY --;
		}

		for (let x = startX; size * (x - 1) < halfWidth; x ++) {
			for (let y = startY; size * (y - 1) < halfHeight; y ++) {
				let relativeAnim = this.animAmt;
				let modThing = (x + y / 2) % 2;
				if (modThing < 0) {
					modThing += 2;
				}
				if (modThing < 1) {
					relativeAnim += 0.5;
				}
				drawShape(context, size * x, size * y, 0.35 * size, relativeAnim)
			}
		}
	}
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 */
function drawShape(context, shapeX, shapeY, size, animAmt) {
	context.strokeStyle = 'black';
	context.lineWidth = 2;
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.translate(shapeX, shapeY);
	
	const numPoints = 24;
	const loopAnimAmt = 0.5 * Math.sin(2 * Math.PI * animAmt) + 0.5;
	const yAngle = slurp(0.05, 0.45, loopAnimAmt) * Math.PI;
	// const yAngle = Math.PI / 3;
	const xzAngle = 0.05 * Math.PI;//0;//2 * Math.PI * animAmt;
	
	context.beginPath();
	for (let i = 0; i <= numPoints; i ++) {
		const amt = i / numPoints;
		const x = size * Math.cos(2 * Math.PI * amt);
		const y = x;
		const z = size * Math.sin(2 * Math.PI * amt);
		const point = to2dIsometric(x, y, z, xzAngle, yAngle);
		if (i == 0) {
			context.moveTo(point.x, point.y);
		}
		else {
			context.lineTo(point.x, point.y);
		}
	}
	context.stroke();

	context.beginPath();
	for (let i = 0; i <= numPoints; i ++) {
		const amt = i / numPoints;
		const x = size * Math.cos(2 * Math.PI * amt);
		const y = -x;
		const z = size * Math.sin(2 * Math.PI * amt);
		const point = to2dIsometric(x, y, z, xzAngle, yAngle);
		if (i == 0) {
			context.moveTo(point.x, point.y);
		}
		else {
			context.lineTo(point.x, point.y);
		}
	}
	context.stroke();

	context.lineWidth = 1;
	renderBoundingCube(
		context,
		-size, size,
		-size, size,
		-size, size,
		xzAngle, yAngle
	);
	context.translate(-shapeX, -shapeY);
}
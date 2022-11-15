var getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function Stopwatch() {
	this.startTime = null;
	this.elapsedTime = null;
	this.running = null;
	this.elapsedTimeForFPS = null;
	this.fps = null;
	this.lastTime = null;
}

Stopwatch.prototype.calcTime = function () {
	var time = Date.now();
	this.elapsedTimeForFPS = time - this.lastTime;
	this.fps = 1000 / this.elapsedTimeForFPS;
	this.lastTime = time;
};

Stopwatch.prototype.start = function () {
	if (this.running) return;
	var time = Date.now();
	this.startTime = time;
	this.elapsedTime = 0;
	this.running = true;
	this.lastTime = time;
};

Stopwatch.prototype.stop = function () {
	this.elapsedTime = Date.now() - this.startTime;
	this.running = false;
};

Stopwatch.prototype.getElapsedTime = function () {
	if (this.running) {
		return Date.now() - this.startTime;
	} else {
		return this.elapsedTime;
	}
};

Stopwatch.prototype.isRunning = function () {
	return this.running;
};

Stopwatch.prototype.reset = function () {
	this.elapsedTime = 0;
};

function Canvas() {
	/** canvas parameter */
	this.makeCanvas();
	this.canvas = null;
	this.ctx = null;
	this.width = null;
	this.height = null;
	this.animationId = null;
	this.time = null;

	/** dot parameter */
	this.dotArray = null;
	this.dotNumber = null;
	this.xSplit = null;
	this.ySplit = null;
	this.targetIndexes = null;
}

Canvas.prototype.initialize = function () {
	/** canvas set up */
	this.canvas = document.getElementsByTagName("canvas")[0];
	this.canvas.style.top = "0";
	this.canvas.style.left = "0";
	this.canvas.style.background = "black";
	this.canvas.style.position = "fixed";
	this.canvas.style.zIndex = "-9999";

	/** canvas parameters */
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width = window.innerWidth;
	this.height = this.canvas.height = window.innerHeight;

	/** time */
	this.time = new Stopwatch();
	this.time.start();

	/** dot set up */
	this.dotArray = new Array();
	this.dotNumber = 10;
	this.xSplit = this.width / this.dotNumber;
	this.ySplit = this.height / this.dotNumber;

	var index = 0;
	for (var y = 0; y <= this.height + 2; y += this.ySplit) {
		for (var x = 0; x <= this.width + 2; x += this.xSplit) {
			var d = new Dot(this, index, x, y, 2, "white");
			this.dotArray.push(d);
			index++;
		}
	}

	this.targetIndexes = new Array();
	for (var i = 0; i < 3; i++) {
		this.targetIndexes.push(getRandomNumber(0, this.dotArray.length - 1));
	}
};

Canvas.prototype.render = function () {
	/** time */
	var time = this.time.getElapsedTime() * 0.001;

	/** after effect or clear */
	this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
	this.ctx.fillRect(0, 0, this.width, this.height);
	//this.ctx.clearRect(0, 0, this.width, this.height);

	for (var i = 0; i < this.dotArray.length; i++) {
		this.dotArray[i].render(time);
	}

	if (Math.random() < 0.004) {
		var num = Math.random();
		if (num < 0.25) {
			for (var i = 0; i < this.dotArray.length; i++) {
				this.dotArray[i].motionIndex = 8;
			}
		}
		if (num >= 0.25 && num < 0.5) {
			for (var i = 0; i < this.dotArray.length; i++) {
				this.dotArray[i].motionIndex = 9;
			}
		}
		if (num >= 0.5 && num < 0.75) {
			for (var i = 0; i < this.dotArray.length; i++) {
				this.dotArray[i].motionIndex = 10;
			}
		}
		if (num >= 0.75 && num < 1.0) {
			for (var i = 0; i < this.dotArray.length; i++) {
				this.dotArray[i].motionIndex = 11;
			}
		}
	}

	this.animationId = window.requestAnimationFrame(this.render.bind(this));
};

Canvas.prototype.resize = function () {
	var that = this.animationId;
	window.cancelAnimationFrame(that);
	this.initialize();
	this.render();
};

Canvas.prototype.makeCanvas = function () {
	document
		.getElementsByTagName("body")[0]
		.appendChild(document.createElement("canvas"));
};

function Dot(canvas, index, x, y, radius, color) {
	this.canvas = canvas;
	this.ctx = canvas.ctx;
	this.index = null;
	this.targetIndex = null;
	this.motionIndex = null;

	/** c - coordinaete, v - vector, i - initialize */
	this.x = {
		c: null,
		v: null,
		i: null
	};
	this.y = {
		c: null,
		v: null,
		i: null
	};
	this.radius = null;
	this.animationRadiusOne = null;
	this.animationRadiusTwo = null;
	this.speed = null;
	this.color = null;
	this.alphaValue = null;
	this.numberForMotionThree = null;
	this.time = null;
	this.elapsedTimeValue = null;
	this.percentComplete = null;

	this.initialize(index, x, y, radius, color);
}

Dot.prototype.initialize = function (index, x, y, radius, color) {
	this.index = index;
	this.targetIndex = getRandomNumber(0, this.canvas.dotArray.length - 1);
	this.motionIndex = getRandomNumber(1, 7);

	/** c: coodinate, v: vector, i: initialize coordinate */
	this.x = {
		c: x,
		v: null,
		i: x
	};
	this.y = {
		c: y,
		v: null,
		i: y
	};

	this.radius = radius;
	this.animationRadiusOne = 0;
	this.animationRadiusTwo = 100;
	this.speed = Math.max(Math.random() * Math.random(), 0.1);
	this.color = color;
	this.alphaValue = 1;
	this.numberForMotionThree = getRandomNumber(3, 12);
	this.time = new Stopwatch();
	this.elapsedTimeValue = getRandomNumber(80, 1000);
	this.percentComplete = 0;
};

Dot.prototype.draw = function (time) {
	this.ctx.save();
	this.ctx.globalAlpha = this.alphaValue * this.alphaValue;
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(this.x.c, this.y.c, this.radius, 0, Math.PI * 2, false);
	this.ctx.fill();
	this.ctx.restore();
};

Dot.prototype.changeIndex = function (i) {
	this.canvas.targetIndexes[i] = getRandomNumber(
		0,
		this.canvas.dotArray.length - 1
	);
	this.motionIndex = getRandomNumber(1, 7);
};

Dot.prototype.motionOne = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.x.v = this.canvas.dotArray[this.targetIndex].x.c - this.x.c;
			this.y.v = this.canvas.dotArray[this.targetIndex].y.c - this.y.c;

			if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
				this.x.c = this.x.i;
				this.y.c = this.y.i;
				this.alphaValue = 0;
				this.speed = Math.max(Math.random() * Math.random(), 0.1);
				this.changeIndex(i);
			} else {
				this.x.c += this.x.v * this.speed;
				this.y.c += this.y.v * this.speed;
			}
		}
	}
};

Dot.prototype.motionTwo = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.x.v = this.canvas.dotArray[this.targetIndex].x.c - this.x.c;
			this.y.v = this.canvas.dotArray[this.targetIndex].y.c - this.y.c;

			if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
				this.x.c = this.x.i;
				this.y.c = this.y.i;
				this.alphaValue = 0;
				this.speed = Math.max(Math.random() * Math.random(), 0.1);
				this.changeIndex(i);
			} else {
				this.alphaValue *= 0.95;

				this.ctx.save();
				this.ctx.lineWidth = 1;
				this.ctx.globalAlpha = this.alphaValue;
				this.ctx.strokeStyle = this.color;
				this.ctx.beginPath();
				this.ctx.moveTo(this.x.i, this.y.i);
				this.ctx.lineTo(this.x.c, this.y.c);
				this.ctx.stroke();
				this.ctx.restore();
				this.x.c += this.x.v * this.speed;
				this.y.c += this.y.v * this.speed;
			}
		}
	}
};

Dot.prototype.motionThree = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.time.start();
			this.percentComplete = this.time.getElapsedTime() / this.elapsedTimeValue;

			if (this.time.getElapsedTime() > this.elapsedTimeValue) {
				this.time.stop();
				this.time.reset();
				this.changeIndex(i);
				this.animationRadiusOne = 0;
				this.elapsedTimeValue = getRandomNumber(80, 1000);
				this.numberForMotionThree = getRandomNumber(3, 12);
			} else {
				this.animationRadiusOne += 2;
				this.alphaValue = Math.abs(1.0 - this.percentComplete);

				this.ctx.save();
				this.ctx.fillStyle = this.color;
				this.ctx.globalAlpha = this.alphaValue * this.alphaValue;
				for (var i = 0; i < this.numberForMotionThree; i++) {
					var rad = (Math.PI * 2) / this.numberForMotionThree;

					this.ctx.beginPath();
					this.ctx.arc(
						Math.cos(rad * i) * this.animationRadiusOne + this.x.c,
						Math.sin(rad * i) * this.animationRadiusOne + this.y.c,
						2,
						0,
						Math.PI * 2,
						false
					);
					this.ctx.fill();
				}
				this.ctx.restore();
			}
		}
	}
};

Dot.prototype.motionFour = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.time.start();
			this.percentComplete = this.time.getElapsedTime() / this.elapsedTimeValue;

			if (this.time.getElapsedTime() > this.elapsedTimeValue) {
				this.time.stop();
				this.time.reset();
				this.changeIndex(i);
				this.animationRadiusOne = 0;
				this.elapsedTimeValue = getRandomNumber(80, 1000);
			} else {
				this.animationRadiusOne += 2;
				this.alphaValue = Math.abs(1.0 - this.percentComplete);

				this.ctx.save();
				this.ctx.strokeStyle = this.color;
				this.ctx.globalAlpha = this.alphaValue * this.alphaValue;
				this.ctx.strokeRect(
					this.x.c - this.animationRadiusOne / 2,
					this.y.c - this.animationRadiusOne / 2,
					this.animationRadiusOne,
					this.animationRadiusOne
				);
				this.ctx.restore();
			}
		}
	}
};

Dot.prototype.motionFive = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.time.start();
			this.percentComplete = this.time.getElapsedTime() / this.elapsedTimeValue;

			if (this.time.getElapsedTime() > this.elapsedTimeValue) {
				this.time.stop();
				this.time.reset();
				this.changeIndex(i);
				this.animationRadiusOne = 0;
				this.elapsedTimeValue = getRandomNumber(80, 1000);
			} else {
				this.animationRadiusOne += 1;
				this.alphaValue = Math.abs(1.0 - this.percentComplete);
				var rad = (Math.PI * 2) / 3;

				this.ctx.save();
				this.ctx.strokeStyle = this.color;
				this.ctx.globalAlpha = this.alphaValue * this.alphaValue;
				this.ctx.translate(this.x.c, this.y.c);
				this.ctx.rotate((30 * Math.PI) / 180);
				this.ctx.translate(-this.x.c, -this.y.c);

				for (var i = 0; i < 3; i++) {
					var nx = Math.cos(rad * i) * this.animationRadiusOne + this.x.c;
					var ny = Math.sin(rad * i) * this.animationRadiusOne + this.y.c;
					if (i === 0) {
						this.ctx.beginPath();
						this.ctx.moveTo(nx, ny);
					} else {
						this.ctx.lineTo(nx, ny);
						if (i === this.numberForMotionThree - 1) {
							this.ctx.closePath();
							this.ctx.stroke();
						}
					}
				}
				this.ctx.restore();
			}
		}
	}
};

Dot.prototype.motionSix = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.time.start();
			this.percentComplete = this.time.getElapsedTime() / this.elapsedTimeValue;

			if (this.time.getElapsedTime() > this.elapsedTimeValue) {
				this.time.stop();
				this.time.reset();
				this.changeIndex(i);
				this.animationRadiusTwo = 200;
				this.elapsedTimeValue = getRandomNumber(800, 1600);
			} else {
				this.animationRadiusTwo -= 2;
				this.alphaValue = Math.abs(1.0 - this.percentComplete);
				var rad = (Math.PI * 2) / 3;

				this.ctx.save();
				this.ctx.strokeStyle = this.color;
				this.ctx.globalAlpha = this.alphaValue;
				this.ctx.translate(this.x.c, this.y.c);
				this.ctx.rotate((30 * Math.PI) / 180);
				this.ctx.translate(-this.x.c, -this.y.c);

				for (var i = 0; i < 3; i++) {
					var nx = Math.cos(rad * i) * this.animationRadiusTwo + this.x.c;
					var ny = Math.sin(rad * i) * this.animationRadiusTwo + this.y.c;
					if (i === 0) {
						this.ctx.beginPath();
						this.ctx.moveTo(nx, ny);
					} else {
						this.ctx.lineTo(nx, ny);
						if (i === this.numberForMotionThree - 1) {
							this.ctx.closePath();
							this.ctx.stroke();
						}
					}
				}
				this.ctx.restore();
			}
		}
	}
};

Dot.prototype.motionSeven = function (time) {
	for (var i = 0; i < this.canvas.targetIndexes.length; i++) {
		if (this.index === this.canvas.targetIndexes[i]) {
			this.time.start();
			this.percentComplete = this.time.getElapsedTime() / this.elapsedTimeValue;

			if (this.time.getElapsedTime() > this.elapsedTimeValue) {
				this.time.stop();
				this.time.reset();
				this.changeIndex(i);
				this.animationRadiusTwo = 100;
				this.elapsedTimeValue = getRandomNumber(800, 1600);
			} else {
				this.animationRadiusTwo -= 2;
				this.alphaValue = Math.abs(1.0 - this.percentComplete);
				var rad = (Math.PI * 2) / 3;

				this.ctx.save();
				this.ctx.strokeStyle = this.color;
				this.ctx.globalAlpha = this.alphaValue;

				this.ctx.beginPath();
				this.ctx.arc(
					this.x.c,
					this.y.c,
					Math.abs(this.animationRadiusTwo),
					0,
					Math.PI * 2,
					false
				);
				this.ctx.stroke();
				this.ctx.restore();
			}
		}
	}
};

Dot.prototype.motionEight = function (time) {
	var newIndex = this.index + 1;
	if (this.index === this.canvas.dotArray.length - 1) {
		newIndex = 0;
	}
	this.x.v = this.canvas.dotArray[newIndex].x.i - this.x.c;
	this.y.v = this.canvas.dotArray[newIndex].y.i - this.y.c;

	if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
		this.x.c = this.x.i;
		this.y.c = this.y.i;
		this.speed = Math.max(Math.random() * Math.random(), 0.1);
		this.motionIndex = getRandomNumber(1, 7);
	} else {
		this.x.c += this.x.v * 0.1;
		this.y.c += this.y.v * 0.1;
	}
};

Dot.prototype.motionNine = function (time) {
	var newIndex = this.index - 1;
	if (this.index === 0) {
		newIndex = this.canvas.dotArray.length - 1;
	}
	this.x.v = this.canvas.dotArray[newIndex].x.i - this.x.c;
	this.y.v = this.canvas.dotArray[newIndex].y.i - this.y.c;

	if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
		this.x.c = this.x.i;
		this.y.c = this.y.i;
		this.speed = Math.max(Math.random() * Math.random(), 0.1);
		this.motionIndex = getRandomNumber(1, 7);
	} else {
		this.x.c += this.x.v * 0.1;
		this.y.c += this.y.v * 0.1;
	}
};

Dot.prototype.motionTen = function (time) {
	var newIndex = this.index + 11;
	if (this.index > this.canvas.dotArray.length - 1 - 11) {
		newIndex = this.index + 11 - this.canvas.dotArray.length;
	}
	this.x.v = this.canvas.dotArray[newIndex].x.i - this.x.c;
	this.y.v = this.canvas.dotArray[newIndex].y.i - this.y.c;

	if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
		this.x.c = this.x.i;
		this.y.c = this.y.i;
		this.speed = Math.max(Math.random() * Math.random(), 0.1);
		this.motionIndex = getRandomNumber(1, 7);
	} else {
		this.x.c += this.x.v * 0.1;
		this.y.c += this.y.v * 0.1;
	}
};

Dot.prototype.motionEleven = function (time) {
	var newIndex = this.index - 11;
	if (this.index < 11) {
		newIndex = this.canvas.dotArray.length - 11 + this.index;
	}
	this.x.v = this.canvas.dotArray[newIndex].x.i - this.x.c;
	this.y.v = this.canvas.dotArray[newIndex].y.i - this.y.c;

	if (Math.abs(this.x.v) < 1 && Math.abs(this.y.v) < 1) {
		this.x.c = this.x.i;
		this.y.c = this.y.i;
		this.speed = Math.max(Math.random() * Math.random(), 0.1);
		this.motionIndex = getRandomNumber(1, 7);
	} else {
		this.x.c += this.x.v * 0.1;
		this.y.c += this.y.v * 0.1;
	}
};

Dot.prototype.increaseAlpha = function (time) {
	if (this.alphaValue !== 1) {
		this.alphaValue += 0.01;
	}
};

Dot.prototype.render = function (time) {
	this.draw(time);
	if (this.motionIndex === 1) this.motionOne(time);
	if (this.motionIndex === 2) this.motionTwo(time);
	if (this.motionIndex === 3) this.motionThree(time);
	if (this.motionIndex === 4) this.motionFour(time);
	if (this.motionIndex === 5) this.motionFive(time);
	if (this.motionIndex === 6) this.motionSix(time);
	if (this.motionIndex === 7) this.motionSeven(time);
	if (this.motionIndex === 8) this.motionEight(time);
	if (this.motionIndex === 9) this.motionNine(time);
	if (this.motionIndex === 10) this.motionTen(time);
	if (this.motionIndex === 11) this.motionEleven(time);
	this.increaseAlpha();
};

function Glitch(ctx, width, height) {
	this.time;
	this.ctx = ctx;
	this.width = width;
	this.height = height;
	this.splitH = this.height / this.splitNum;
	this.dataArr = [];
	this.yPosArr = [];
}

Glitch.prototype.getImageData = function () {
	var startHeight = 0;
	for (var i = 0; i < this.height; i += randomHeight) {
		var rand = Math.random();
		var randomHeight = Math.floor(getRandomNumber(50, 300));
		var d = this.ctx.getImageData(
			0,
			startHeight,
			this.width,
			startHeight + randomHeight
		);
		if (rand < 0.05) {
			for (var j = 0; j < d.data.length; j++) {
				d.data[j * 4 + 0] = 200;
				d.data[j * 4 + 2] = 100;
			}
		}
		if (rand > 0.05 && rand < 0.1) {
			for (var j = 0; j < d.data.length; j++) {
				d.data[j * 4 + 1] = 200;
				d.data[j * 4 + 2] = 200;
			}
		}
		this.yPosArr.push(startHeight);
		this.dataArr.push(d);
		startHeight += randomHeight;
	}
};

Glitch.prototype.addImage = function () {
	for (var i = 0; i < this.dataArr.length; i++) {
		if (Math.random() < 0.8) {
			this.ctx.putImageData(
				this.dataArr[i],
				Math.sin(this.time * 1 + (i * 10 * Math.PI) / 180) * this.width,
				this.yPosArr[i]
			);
		} else {
			this.ctx.putImageData(
				this.dataArr[getRandomNumber(0, this.dataArr.length - 1)],
				this.width * Math.random(),
				this.height * Math.random()
			);
		}
	}
};

Glitch.prototype.render = function () {
	this.time = Date.now() / 100;
	this.dataArr = [];
	this.yPosArr = [];
	this.getImageData();
	this.addImage();
};

window.addEventListener("load", function () {
	console.clear();

	var loading = document.getElementById("loading");
	loading.classList.add("loaded");

	var canvas = new Canvas();

	canvas.initialize();
	canvas.render();

	window.addEventListener("resize", function () {
		canvas.resize();
	});

	window.addEventListener(
		"scroll",
		function () {
			var g = new Glitch(
				canvas.ctx,
				Math.floor(window.innerWidth),
				Math.floor(window.innerHeight)
			);
			g.render();
		},
		true
	);
});

function draw() {
		drawGrid();
		drawImages();
}

function drawGrid() {
	var leftPos = 0;
	var topPos;

	for (var i = 0; i < 9; i++) {
		topPos = 120 * Math.floor(i/3);
		$('<div/>', {class: 'square ' + 'square' +i, filled: 0,}).css(
			{
				left: leftPos, 
				top:topPos,

			}
		).appendTo('#grid');

		(leftPos != 240) ? leftPos+=120 : leftPos = 0;				
	}
}

function drawImages() {
	for (var i = 0; i < 9; i++) {
			var position = getRandomPos($('#images'),120,120);
			$('<div/>', 
				{
					class: 'img img'+i,
				}
			).css({left: position.x, top: position.y}).appendTo('#images');

	}
}

function getRandomPos(container, elementWidth,elementHeight) {
	var position = {};
	var containerWidth = $(container).innerWidth();
	var containerHeight = $(container).innerHeight();

	position.x = random(0,containerWidth- elementWidth);
	position.y = random(0,containerHeight - elementHeight);

	return position;
}

function random(min,max) {
	return Math.random() * (max - min) + min;
}



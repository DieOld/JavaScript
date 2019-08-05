var canvas, ctx, vectorOfVelocityX, positionOfSnakeX,positionOfSnakeY,positionOfFruitX, positionOfFruitY,xSnakePos = [], ySnakePos = [],
 sizeOfSnake = 15, score = 'score: ',audio,c = 0;
window.onload = function () {
	alert("Для начала игры нажмите Enter, управление приходится на стрелочки");
}
function start () {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	positionOfSnakeX = (canvas.height/2)-sizeOfSnake;
	positionOfSnakeY = (canvas.width/2)-sizeOfSnake;
	snakeLenght = 2;
	vectorOfVelocityY = 0;
	vectorOfVelocityX = 1;
	xSnakePos.length = 0;
	ySnakePos.length = 0;
	calculated();
}
 var move,
 vectorOfVelocityY=0,
 snakeLenght = 2;
onkeydown = function (key) {
	switch (key.keyCode) {
		case 13:
		if(c!=1){
		clearInterval(move);
		start();}
		break;
		case 39:
		if(vectorOfVelocityY!=0){
			vectorOfVelocityY =0 ;
			vectorOfVelocityX = 1;
		}
		break;
		case 40:
		if(vectorOfVelocityX!=0){
			vectorOfVelocityY = 1;
			vectorOfVelocityX = 0;
		}
		break;
		case 37:
		if(vectorOfVelocityY!=0){
		    vectorOfVelocityX = -1;
		    vectorOfVelocityY = 0 ;
		}
		break;
		case 38:
		if(vectorOfVelocityX!=0){
		    vectorOfVelocityY = -1;
		    vectorOfVelocityX = 0;
		}
		break;
		default:
			// statements_def
		break;
	}
}
function calculated() {
	drawApple();
	move =setInterval(function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);	
	positionOfSnakeX += vectorOfVelocityX*sizeOfSnake;
	positionOfSnakeY += vectorOfVelocityY*sizeOfSnake;
	checkForLose();
	xSnakePos.unshift(positionOfSnakeX);
	ySnakePos.unshift(positionOfSnakeY);
	if(positionOfSnakeX == positionOfFruitX && positionOfSnakeY == positionOfFruitY){
		snakeLenght++;
		document.title = score+snakeLenght;
		drawApple();

	}
	for(let i =0;i<=snakeLenght;i++){
	if(i>0){ 
	ctx.fillStyle = 'black';
	ctx.fillRect(xSnakePos[i]+1, ySnakePos[i]+1, sizeOfSnake-2,sizeOfSnake-2);
	}else {
		ctx.fillStyle = 'red';
		ctx.fillRect(xSnakePos[i]+1, ySnakePos[i]+1, sizeOfSnake-2,sizeOfSnake-2);
	}
	}

	ctx.fillStyle = 'green';
	ctx.fillRect(positionOfFruitX,positionOfFruitY, sizeOfSnake,sizeOfSnake);
	console.log(positionOfSnakeY,positionOfSnakeX, snakeLenght, positionOfFruitX, positionOfFruitY);
	document.title = score+snakeLenght;
},60);

}

function checkForLose() {
if(positionOfSnakeY>(canvas.height-sizeOfSnake)||positionOfSnakeY<0 || positionOfSnakeX>(canvas.width-sizeOfSnake) || positionOfSnakeX<0){
clearInterval(move);
audio.play();
c = 1;
setTimeout(function () {
	alert("you Lose with score: "+snakeLenght);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	c = 0;
},3000);
}
for(let i =0; i<=snakeLenght;i++){
if(positionOfSnakeX == xSnakePos[i]&&positionOfSnakeY ==ySnakePos[i]){
clearInterval(move);
c = 1;

setTimeout(function () {
	alert("you Lose with score: "+snakeLenght);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	c =0;
},3000);
}	
}
}

function drawApple() {
	 positionOfFruitX=Math.round((canvas.width/sizeOfSnake-1)*Math.random())*sizeOfSnake;
     positionOfFruitY=Math.round((canvas.height/sizeOfSnake-1)*Math.random())*sizeOfSnake;
     for(let i =0;i<=snakeLenght;i++) if(positionOfFruitY == ySnakePos[i]&& positionOfFruitX == xSnakePos[i]) drawApple();
}
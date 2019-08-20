let canvas, ctx, current_color, current_height;
let status, play_field, animation, current_type, allowed_left =1, allowed_right=1,score=0;
window.onload = function () {
	canvas = document.getElementById('canvas_id');
	ctx = canvas.getContext('2d');
	play_field = create_field(10,20);
	for(let x=0; x<10; x++){
    	for(let b=0; b<20; b++){
    		play_field[x][b] = 0;
    	}
    }
    draw_field();
}
function clearly_start(){
	get_figure();
	draw_figure();
	start();
}
function create_field(length) {
    let arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = create_field.apply(this, args);
    }
    return arr;
}

function draw_field() {
	for(let x=0 ;x<10;x++){
		for(let y=0; y<16;y++ ){
			if(play_field[x][y] == 0){
				ctx.strokeStyle = 'gray'
				ctx.strokeRect(x*30,y*30,30,30)
			}
		}
	}
}
function get_random_int(min, max) {
	return Math.floor(Math.random()*(max-min))
}

function get_figure() {
	let s = get_random_int(0,7);
	let color = get_random_int(1,8);
	if(color == 0){
		color = get_random_int(1,8);
	}
	current_color = color;
	if(s === 0 ){
		for(let i = 0; i < 4; i ++){
			play_field[5][i] = 10+color;
		}
		current_height = 4;
		status = 0;
		current_type = 'I';
	}else if(s === 1){
		play_field[5][0] = 10+color;
		play_field[4][0] = 10+color;
		play_field[5][1] = 10+color;
		play_field[4][1] = 10+color;
		current_height = 2;
		current_type = 'o';
	}else if(s === 2 ){
		for(let i = 0; i < 3; i ++){
			play_field[5][i] = 10+color;
		}
			play_field[6][2] = 10+color;
			current_height = 3;
			status =0;
			current_type = 'L';
	}else if(s === 3){

		for(let i = 0; i < 3; i ++){
			play_field[5][i] = 10+color;
		}
		play_field[4][2] = 10+color;
		current_height = 3;
		status =0;
		current_type ='J';
	}else if(s === 4){
		play_field[5][0] = 10+color;
		play_field[6][0] = 10+color;
		play_field[5][1] = 10+color;
		play_field[4][1] = 10+color;
		current_height = 2;
		current_type = 's';
	}else if(s === 5){
		play_field[4][0] = 10+color;
		play_field[5][0] = 10+color;
		play_field[5][1] = 10+color;
		play_field[6][1] = 10+color;
		current_height = 2;
		status = 0;
		current_type = 'z';
	}else if(s === 6){
		play_field[5][0] = 10+color;
		play_field[5][1] = 10+color;
		play_field[4][1] = 10+color;
		play_field[6][1] = 10+color;
		current_height =2;
		status = 0;
		current_type = 't';
	}
	status = 0;
}

function draw_figure() {
	for(let x =0; x<10; x++){
		for(let y = 0; y < 16; y++){
			if(play_field[x][y] === 11 || play_field[x][y] === 21){
				ctx.fillStyle = 'orange';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 10 || play_field[x][y]===20){
				ctx.fillStyle = 'white';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 12 || play_field[x][y]===22){
				ctx.fillStyle = 'green';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 13 || play_field[x][y]===23){
				ctx.fillStyle = 'red';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 14 || play_field[x][y]===24){
				ctx.fillStyle = 'blue';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 15 || play_field[x][y]===25){
				ctx.fillStyle = 'purple';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 16 || play_field[x][y]===26){
				ctx.fillStyle = '#D0006E';
				ctx.fillRect(x*30,y*30, 30,30);
			}else if (play_field[x][y] === 17 || play_field[x][y]===27){
				ctx.fillStyle = '#FFFF00';
				ctx.fillRect(x*30,y*30, 30,30);
			}
		}
	}
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let x =0; x<10; x++){
		for(let y =0 ;y<16;y++){
			play_field[x][y] = 0;
		}
	}
	draw_field();
}

function move_figure_down() {
	let positions_of_figure_x = [];
	let positions_of_figure_y = [];
	let a =0;
	for(let x =0; x<10; x++){
		for(let y = 0; y < 16; y++){
			if(play_field[x][y] >=10 && play_field[x][y]<20){
				positions_of_figure_x[a] = x;
				positions_of_figure_y[a] = y;
				a++;
			}
		}
	}

	for(let x = positions_of_figure_x.length-1; x>=0; x--){
			play_field[positions_of_figure_x[x]][positions_of_figure_y[x]+1] = 10+current_color;
			play_field[positions_of_figure_x[x]][positions_of_figure_y[x]] = 0;
	}
	console.log(positions_of_figure_x);
	console.log(positions_of_figure_y);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw_field();
	draw_figure();
}
function get_pos_x() {
	let arr = [];
	let h=0;
	for( let x=0;x<10;x++){
		for(let y=0;y<16;y++){
			if(play_field[x][y]>=10 && play_field[x][y]<20){
				arr[h] = x;
				h++;
			}else{
				continue;
			}
		}
	}
	return arr;
}
function get_pos_y() {
	let arr = [];
	let h=0;
	for( let x=0;x<10;x++){
		for(let y=0;y<16;y++){
			if(play_field[x][y]>=10 && play_field[x][y]<20){
				arr[h] = y;
				h++;
			}else{
				continue;
			}
		}
	}
	return arr;
}
function check_for_allow_right() {
	for(let x =0 ;x< get_pos_x().length-1; x++){
		if(play_field[get_pos_x()[x]+1][get_pos_y()[x]] >20){
			return false;
		}else{
			return true;
		}
	}
}

function check_for_allow_left() {
	for(let x =0 ;x< get_pos_x().length-1; x++){
		if(play_field[get_pos_x()[x]-1][get_pos_y()[x]] >20){
			return false;
		}else{
			return true;
		}
	}
}
function move_figure_right() {
	if(check_for_allow_right()){
		let positions_of_figure_x = [];
		let positions_of_figure_y = [];
		let a = 0;
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 16; y++) {
				if (play_field[x][y] >= 10 && play_field[x][y] < 20) {
					positions_of_figure_x[a] = x;
					positions_of_figure_y[a] = y;
					a++;
				}

			}
		}

		for (let x = positions_of_figure_x.length - 1; x >= 0; x--) {

			play_field[positions_of_figure_x[x] + 1][positions_of_figure_y[x]] = 10 + current_color;
			play_field[positions_of_figure_x[x]][positions_of_figure_y[x]] = 0;
		}

		console.log(positions_of_figure_x);
		console.log(positions_of_figure_y);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw_field();
		draw_figure();
	}
	}

function move_figure_left() {
	if(check_for_allow_left()) {
		let positions_of_figure_x = [];
		let positions_of_figure_y = [];
		let a = 0;
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 16; y++) {
				if (play_field[x][y] >= 10 && play_field[x][y] < 20) {
					positions_of_figure_x[a] = x;
					positions_of_figure_y[a] = y;
					a++;
				}
			}
		}

		for (let x = 0; x < positions_of_figure_x.length; x++) {
			play_field[positions_of_figure_x[x] - 1][positions_of_figure_y[x]] = 10 + current_color;
			play_field[positions_of_figure_x[x]][positions_of_figure_y[x]] = 0;
		}
		console.log(positions_of_figure_x);
		console.log(positions_of_figure_y);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw_field();
		draw_figure();
	}
}

function start() {
	animation = setInterval(function(){
		if(get_lowest_position()+1 != 16 && next_step_is_fix() !=1 ){
		move_figure_down();
		console.log(get_lowest_position())

	}else{
		clearInterval(animation);
		fix_figure();
		check_for_line_and_shift();
		if(free_space()-current_height<0){
			lose();
		}else{
		start();}

	}
	},500);
}
function get_lowest_position(){
	let a = 0;
	for(let x = 0; x<10;x++){
		for(let y =0; y<16;y++){
			if(play_field[x][y] >=10 && play_field[x][y]<20){
				if(y>a){
					a = y;
				}
			}
			
		}
	}
	return a;
}

function fix_figure(){
	for(let x =0; x<10; x++){
		for(let y = 0; y < 16; y++){
			if(play_field[x][y] >=10 && play_field[x][y]<20){
				play_field[x][y] = 20+current_color;
			}
		}
	}	
	
}

addEventListener("keydown", moving);

function moving(e){
	switch(e.keyCode){
		case 37:
			move_figure_left();
			break;
		case 39:
			move_figure_right();
			break;
		case 38:
			flip();
			break;
		case 40:
			move_figure_down();
			break;
	}
}
    

function next_step_is_fix(){
	for(let x =0; x<10; x++){
		for(let y = 0; y < 16; y++){
			if(play_field[x][y] >= 10 && play_field[x][y]<20 && play_field[x][y+1]>20){
				return 1;
				break;
			}else{
				a=0;
			}
		}
	}
}

function lose() {
	clearInterval(animation);
	alert('u lose');
}

function free_space() {
	let default_var = 15;
	for(let x=4;x<7; x++){
		for(let y=0; y<16;y++){
			if(play_field[x][y] >20){
			return y;
			break;
			}
		}
	}
	return default_var;
}
function get_pos() {
	let i = 0;
	console.log(pos_x);
	console.log(pos_y);
	for(let x=0; x<7;x++){
		for(let y=0; y<16;y++){
			if(play_field[x][y] >=10 && play_field[x][y]<20)	{
				pos_x[i] = x;
				pos_y[i] = y;
				i ++;
			}
		}
	}
}
function flip(){
	let pos_x = [];
	let pos_y = [];
	let a=0;
	for(let x =0; x<10; x++){
		for(let y = 0; y < 16; y++){
			if(play_field[x][y] >= 10 && play_field[x][y]<20){
				pos_x[a] = x;
				pos_y[a] = y;
				a++;
				play_field[x][y] = 0;
			}
		}
	}
	console.log(pos_x,pos_y);
	if(current_type == 'z'){
		if(status == 0){
			play_field[pos_x[1]][pos_y[1]-1] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]+1] = 10+current_color;
			status++;
		}else if(status == 1){
			play_field[pos_x[3]][pos_y[3]] = 10+current_color;
			play_field[pos_x[3]-1][pos_y[3]] = 10+current_color;
			play_field[pos_x[3]+1][pos_y[3]+1] = 10+current_color;
			play_field[pos_x[3]][pos_y[3]+1] = 10+current_color;
			status --;
		}
	}else if(current_type == 's'){
		if(status == 0){
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]-1] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color;
			status++;
		}else if(status == 1){
			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]+1] = 10+current_color;
			play_field[pos_x[2]-1][pos_y[2]+1] = 10+current_color;
			status--;
		}
	}else if(current_type == 'J'){
		play_field[pos_x[2]][pos_y[2]] = 10+current_color;
		if(status == 0){
			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]-1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]-1][pos_y[2]-1] = 10+current_color;
			status++;
		}else if(status == 1){
			play_field[pos_x[2]+1][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]+1] = 10+current_color;
			status++;
		}else if(status == 2){
			play_field[pos_x[2]][pos_y[2]] = 0;
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]+1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]+1][pos_y[1]+1] = 10+current_color;
			status++;
		}else if(status == 3){
			play_field[pos_x[2]][pos_y[2]] = 0;
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]-1] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]+1] = 10+current_color;
			status =0 ;
		}
	}else if(current_type == 'L'){
		play_field[pos_x[2]][pos_y[2]] = 10+current_color;
		if(status == 0){
			play_field[pos_x[2]][pos_y[2]] = 0;
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]+1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]+1] = 10+current_color;
			status++;
		}else if(status == 1){
			play_field[pos_x[2]-1][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]+1] = 10+current_color;
			status++;
		}else if(status == 2){

			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]-1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]+1][pos_y[2]-1] = 10+current_color;
			status++;
		}else if(status == 3){
			play_field[pos_x[2]][pos_y[2]] = 0;
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]-1] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color;
			play_field[pos_x[1]+1][pos_y[1]+1] = 10+current_color;
			status =0 ;
		}
	}else if(current_type =='I'){
		if(status == 0){
			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color
			for(let x=0;x<3;x++){
				play_field[pos_x[2]-x][pos_y[2]] = 10+current_color;
			}
			status++;
		}else if(status == 1){
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color
			for(let x=0;x<3;x++){
				play_field[pos_x[1]][pos_y[1]-x] = 10+current_color;
			}
			status++;
		}else if(status == 2){
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color
			for(let x=0;x<3;x++){
				play_field[pos_x[1]+x][pos_y[1]] = 10+current_color;
			}
			status++;
		}else if(status == 3){
			play_field[pos_x[2]][pos_y[2]-1] = 10+current_color;
			for(let x=0;x<3;x++){
				play_field[pos_x[2]][pos_y[2]+x] = 10+current_color;
			}
			status =0;
		}
	}else if(current_type == 't'){
		if(status == 0){
			play_field[pos_x[2]][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]+1	] = 10+current_color;
			status++;
		}else if(status == 1){
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]+1][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			status++;
		}else if(status == 2){
			play_field[pos_x[1]][pos_y[1]] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]-1] = 10+current_color;
			play_field[pos_x[1]][pos_y[1]+1] = 10+current_color;
			play_field[pos_x[1]-1][pos_y[1]] = 10+current_color;
			status++;
		}else if(status == 3){
			play_field[pos_x[2]][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]][pos_y[2]-1] = 10+current_color;
			play_field[pos_x[2]+1][pos_y[2]] = 10+current_color;
			play_field[pos_x[2]-1][pos_y[2]] = 10+current_color;
			status=0;
		}
	}else if(current_type == 'o'){
		for(let i =0; i <4; i++){
			play_field[pos_x[i]][pos_y[i]] = 10+current_color;
		}
	}
	ctx.clearRect(0,0,canvas.width, canvas.height);
	draw_field();
	draw_figure();
}

function check_for_line_and_shift() {
	let line_x = [];
	let line_y = [];
	let temp =0;
	let s=0;
	for(let y=0; y<16; y++){
		for(let x=0; x<10; x++){
			if(play_field[x][y] >=20){
				temp ++;
			}
		}
		if(temp == 10){
			line_y[s] = y;
			s++;
		}
		temp =0;
	}
	s=0;
	for(let y =0; y<line_y.length; y++){
		for(let x=0; x<10; x++){
			play_field[x][line_y[s]]=0;
		}
		s++;
	}
	score +=(line_y.length*10);
	document.title ="score: "+score ;
	let shift_temp =0;

	if(line_y.length>0){
	for(let y=Math.min(...line_y)-1;y>=0; y--){
		for(let x =0; x<10;x++){
			if(play_field[x][y]>20){
				shift_temp = play_field[x][y];
				play_field[x][y] =0;
				play_field[x][y+line_y.length] = shift_temp;
				console.log(shift_temp);
			}
		}
	}}
	ctx.clearRect(0,0,canvas.width, canvas.height);
	draw_field();
	get_figure();
	draw_figure();
	console.log(line_y);
}
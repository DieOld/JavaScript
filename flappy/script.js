let o1,o2,o3,o4,canvas, ctx, bg,bg1,bg1_pos_x, bg_pos_x = 0, bg_moving_animation, down_animation,bird, up_animation, between = 200;
let down_velocity =5; let up_velocity = 5 ;score = 0;
let bird_pos_y, bird_pos_x, bird_afk_moving , move_vector = 0, game=false,un_bug_enter = 0;
class obstacles {

    constructor(){
        this.up_obstacle= new Image();
        this.down_obstacle = new Image();
        this.up_obstacle.src = 'res/img/wall1.png';
        this.down_obstacle.src = 'res/img/wall1.png';
        this.pos_x = canvas.width;
        this.pos_y_down = Math.random()*(500-200)+200;
        this.pos_y_up = (this.pos_y_down-between)-600;
        this.checking = 0;
        console.log(this.pos_y_down, this.pos_y_up);
    }
    update (){
            this.pos_x--;
            if(this.pos_x<0-this.up_obstacle.width){
                this.pos_x = canvas.width;
                this.pos_y_down = Math.random()*(500-200)+200;
                this.pos_y_up = this.pos_y_down-between-600;
                console.log(this.pos_y_up,this.pos_y_down);
                this.checking = 0;
            }
    }
    check_for_lose(){
        if(((bird_pos_y+39.5>this.pos_y_down||bird_pos_y<this.pos_y_up+598)&&(bird_pos_x+47>this.pos_x&&bird_pos_x<this.pos_x+50))){
            alert('you lose. Your score is ' + score.toString());
            clearInterval(up_animation);
            clearInterval(down_animation);
            clearInterval(bg_moving_animation);
            game = false;
            let lose_animation = setInterval(function () {
                bird_pos_y+=4;
                draw();
                if(bird_pos_y>canvas.height){
                    clearInterval(lose_animation)
                    setTimeout(function () {
                        start_action();
                    },1000);
                }
            },2);
        } else if(this.pos_x<bird_pos_x && this.checking == 0){
            score++;
            this.checking ++;
        }
    }
}
window.onload = function () {
  canvas = document.getElementById('canvas');//Берём канвас по ИД
  ctx = canvas.getContext('2d');//а здесь контекст)
  bg = new Image(); // Новый объект картинок
  bg1 = new Image();//вторая картинка которая будет за кадром, пока первая в кадре
  bird = new Image();
  o1 = new obstacles();
  o2 = new obstacles();
  o3 = new obstacles();
  o4 = new obstacles();
  start_action();
};
function start_action(){
    o1.pos_x = canvas.width;
    o2.pos_x = o1.pos_x+220;
    o3.pos_x =o2.pos_x+220;
    o4.pos_x =o3.pos_x+220;
    bird.src = 'res/img/bird1.png';
    bg1.src = 'res/img/back.png';
    bg_pos_x = 0;
    bg1_pos_x = canvas.width;//позиция второй картинки
    bird_pos_y = (canvas.height/2)-(bird.height/2);//начальная позиция птицы
    bird_pos_x = (canvas.width/2)-(bird.width/2);
    bg.src = 'res/img/back.png'; //здесь присваиваем атрибуду нашей картинки источник
    bg.onload = function(){
        ctx.drawImage(bg,bg_pos_x,0);//рисовка картинки на нашем холсте
    }; //Это функция когда картинка прогружается
    bg1.onload = function(){
        ctx.drawImage(bg1, bg1_pos_x,0)//отрисовка второй картинки, хотя мне кажется что это не обязательно
    };
    move_bg(); //функция которая вращает наш задний фон
    un_bug_enter =0;
    score = 0;
    afk_moving();
}
function  move_bg() {
    bg_moving_animation = setInterval(function () {//Задаем анимацию
        if(bg_pos_x-1<canvas.width*-1) bg_pos_x = canvas.width;//усновие, что если картинка полностью выехала за кадр// то она заменяет вторую картинку
        if(bg1_pos_x-1<canvas.width*-1) bg1_pos_x=canvas.width;//аналогично здесь)
        bg_pos_x --;//сдвигаем бг влево
        bg1_pos_x--;//это тоже сдвиг
        check_fl();
        draw();
    if(game){
    o1.update();
    o2.update();
    o3.update();
    o4.update();
    }
    },5);
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);// очищаем наш холст для перерисовки бг
    ctx.drawImage(bg, bg_pos_x,0);//рисуем.
    ctx.drawImage(bg1,bg1_pos_x,0);//рисуем
    ctx.drawImage(o1.up_obstacle, o1.pos_x, o1.pos_y_up);
    ctx.drawImage(o1.down_obstacle, o1.pos_x, o1.pos_y_down);
    ctx.drawImage(o2.up_obstacle, o2.pos_x, o2.pos_y_up);
    ctx.drawImage(o2.down_obstacle, o2.pos_x, o2.pos_y_down);
    ctx.drawImage(o3.up_obstacle, o3.pos_x, o3.pos_y_up);
    ctx.drawImage(o3.down_obstacle, o3.pos_x, o3.pos_y_down);
    ctx.drawImage(o4.up_obstacle, o4.pos_x, o4.pos_y_up);
    ctx.drawImage(o4.down_obstacle, o4.pos_x, o4.pos_y_down);
    ctx.drawImage(bird,bird_pos_x,bird_pos_y);//рисовка птицы
    if(game){
    ctx.font = '80px san-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(score.toString(),canvas.width/2,100);
    ctx.strokeStyle = '#000000';
    ctx.strokeText(score.toString(),canvas.width/2,100);
}
}

function afk_moving(){
    bird_afk_moving = setInterval(function(){//движение птицы до начала игры
        if(move_vector == 0){
            if(bird_pos_y-1<(canvas.height/2)-bird.height/2){
                move_vector++;
            }else{
                bird_pos_y--;
            }
        }else if(move_vector == 1){
            if(bird_pos_y+1>(canvas.height/2)+bird.height/2){
                move_vector--;
            }else{
                bird_pos_y++;
            }
        }
    },15);
}

addEventListener('keydown', function (key) {
    switch (key.keyCode) {
        case 32:
            if(game){
            clearInterval(bird_afk_moving);
            up();}
            key.preventDefault();
        break;
        case 13:
        if(un_bug_enter ==0 ) {start_pos(); un_bug_enter++;}
        break;
    }
})
function start_pos() {
    let put_at_start_position = setInterval(function () {
        if(bird_pos_x-1 > 100) {bird_pos_x--;
        }else{
            clearInterval(put_at_start_position);
            clearInterval(bird_afk_moving);
            down();
            game = true;
        }
    }, 5);
}
function up() {
    clearInterval(up_animation);
    clearInterval(down_animation);
    let counter = 0;

    up_animation = setInterval(function () {
        if(counter+1 == 30){
            clearInterval(up_animation);
            down();}
        check_fl();
        if(bird_pos_y > 0) bird_pos_y -=2 ;

        counter++;
        check_for_lose();
    },up_velocity);

}

function down() {
    let a=1;
    down_animation = setInterval(function () {
        check_fl();
        if (bird_pos_y-2 < canvas.height-bird.height){
            a+=0.0598;
            bird_pos_y+=a;

        };
    }, down_velocity);
}

function check_fl() {
    o1.check_for_lose();
    o2.check_for_lose();
    o3.check_for_lose();
    o4.check_for_lose();
}
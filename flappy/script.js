let canvas, ctx, bg,bg1,bg1_pos_x, bg_pos_x = 0, bg_moving_animation,bird;
let bird_pos_y,  move_vector = 0;

window.onload = function () {
  canvas = document.getElementById('canvas');//Берём канвас по ИД
  ctx = canvas.getContext('2d');//а здесь контекст)
  bg = new Image(); // Новый объект картинок
  bg1 = new Image();//вторая картинка которая будет за кадром, пока первая в кадре
  bird = new Image();
  bird.src = 'res/img/bird1.png';
  bg1.src = 'res/img/back.png';
  bg1_pos_x = canvas.width;//позиция второй картинки
  bird_pos_y = (canvas.height/2)-(bird.height/2);//начальная позиция птицы
  bg.src = 'res/img/back.png'; //здесь присваиваем атрибуду нашей картинки источник
  bg.onload = function(){
      ctx.drawImage(bg,bg_pos_x,0);//рисовка картинки на нашем холсте
  }; //Это функция когда картинка прогружается
  bg1.onload = function(){
   ctx.drawImage(bg1, bg1_pos_x,0)//отрисовка второй картинки, хотя мне кажется что это не обязательно
  };
    move_bg(); //функция которая вращает наш задний фон
    afk_moving();
};
function  move_bg() {
    bg_moving_animation = setInterval(function () {//Задаем анимацию
        if(bg_pos_x-1<canvas.width*-1) bg_pos_x = canvas.width;//усновие, что если картинка полностью выехала за кадр
                                                               // то она заменяет вторую картинку
        if(bg1_pos_x-1<canvas.width*-1) bg1_pos_x=canvas.width;//аналогично здесь)
        bg_pos_x --;//сдвигаем бг влево
        bg1_pos_x--;//это тоже сдвиг
        draw();

    },5);
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height); // очищаем наш холст для перерисовки бг
    ctx.drawImage(bg, bg_pos_x,0);//рисуем.
    ctx.drawImage(bg1,bg1_pos_x,0);//рисуем
    ctx.drawImage(bird,50,bird_pos_y);//рисовка птицы
}

function afk_moving(){
    let animation_bird_moving = setInterval(function(){//движение птицы до начала игры
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
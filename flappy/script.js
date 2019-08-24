let canvas, ctx, moving_bg_animations, bg,bg2,bg2_pos_x, bg_pos_x =0;

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  bg = new Image();
  bg2 = new Image();
  bg2.src = 'res/img/back.png'
  bg.src = 'res/img/back.png';
  bg.onload = function(){
      ctx.drawImage(bg, bg_pos_x,0);
  };
  bg2_pos_x = canvas.width;
  bg2.onload = function(){
    ctx.drawImage(bg2, bg2_pos_x,0);
  };
  move_bg();
};

function move_bg() {
    moving_bg_animations = setInterval(function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        if(bg_pos_x-1<canvas.width*(-1)){
            bg_pos_x = canvas.width;
        }
        if(bg2_pos_x-1<canvas.width*(-1)){
            bg2_pos_x = canvas.width;
        }
        bg_pos_x--;
        bg2_pos_x--;
        ctx.drawImage(bg, bg_pos_x,0);
        ctx.drawImage(bg2, bg2_pos_x,0);
    },5);
}
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var PARTICLE_COUNT=10;

//const endTime = new Date();
//endTime.setTime(endTime.getTime() + 3600 *1000);
////设定刚刚好是倒计时一小时
//var curShowTimeSeconds = 0

var balls = [];
//用来储存准备掉下来的小球
const colors = ["#7edbfd","#04abe3","#802daa","#cb71f8","#c4f531","#5a810d","#f8c255","#FF8800","#fd0b0b","#a70606"]
//用来负责随机颜色的数组

MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1

MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
//curShowTimeSeconds = getCurrentShowTimeSeconds();

function random(min, max){
    return Math.random()*(max-min) + min;
}

//var particles=[];
var hue= 120;

window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();
//负责对浏览器优化的循环动画

window.onload = loop;

function loop(){

    // WINDOW_WIDTH = document.body.clientWidth
    // WINDOW_HEIGHT = document.body.clientHeight
    requestAnimFrame(loop);
    hue+=0.5;
    render(context);
    update();
//    真正循环调用的是这两个函数render和update
}

function getCurrentHour() {
    var rawDate = new Date();
    return rawDate.getHours();
}

function getCurrentMinute(){
    var rawDate = new Date();
    return rawDate.getMinutes();
}

function getCurrentSecond(){
    var rawDate = new Date();
    return rawDate.getSeconds();
}

var InitialTimeHour=getCurrentHour();
var InitialTimeMinute=getCurrentMinute();
var InitialTimeSecond=getCurrentSecond();

function update(){
//这个函数里面定义我们需要动态的东西

    var nextHours = getCurrentHour();
    var nextMinutes = getCurrentMinute();
    var nextSeconds = getCurrentSecond();
    console.log("the current second is:"+ nextSeconds.toString());

    var curHours = InitialTimeHour;
    var curMinutes = InitialTimeMinute;
    var curSeconds = InitialTimeSecond;
    console.log("the initial second is:"+ curSeconds.toString());

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            createParticles( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
//            如果现在的时间和之前已开始定义的时间， 也就是current， 不一样的话， 我们就增加一个球， 分别将这个大的数字应该在的位置传入；
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            createParticles( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            createParticles( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            createParticles( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            createParticles( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            createParticles( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        InitialTimeHour= nextHours;
        InitialTimeMinute= nextMinutes;
        InitialTimeSecond= nextSeconds;
    }

    updateBalls();

    console.log( balls.length);
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){
        var len=balls[i].length;
        var oParticles= balls[i];
        for(var j=0; j<len; j++){
            if(oParticles[j].alpha<0.1){
                balls.splice(i, 1);
            }
        }
    }
//
//    var cnt = 0
//    for( var i = 0 ; i < balls.length ; i ++ )
//        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
//            balls[cnt++] = balls[i]
//
//    while( balls.length > Math.min(300,cnt) ){
//        balls.pop();
//    }
}

function Particle(x, y){
    this.x=x;
    this.y=y;
    this.coordinates=[];
    this.coordinateCount=5;
    while(this.coordinateCount--){
        this.coordinates.push([this.x, this.y])
    }
    this.angle= random(0, Math.PI*2);
    this.speed= random(1,8);
    this.friction= 0.95;
    this.gravity= 1;
    this.hue= random(hue-20, hue+20);
    this.brightness= random(50, 80);
    this.alpha= 1;
    this.decay= random(0.015, 0.03);
}

Particle.prototype.update=function(){
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle)*this.speed;
    this.y += Math.sin(this.angle)*this.speed;
    this.alpha -= this.decay;
}

Particle.prototype.draw= function(){
    context.beginPath();
    context.moveTo(this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]);
    context.lineTo(this.x, this.y);
    context.strokeStyle="hsla("+this.hue+ ", 100%,"+ this.brightness+ "%,"+this.alpha+")";
    context.stroke();
}

function createParticles(x,y, num){
    for(var i=0; i<digit[num].length; i++)
        for(var j=0; j<digit[num].length; j++)
            if(digit[num][i][j]==1){
                var aParticles=[];
                var particleCount=PARTICLE_COUNT;
                                
                while(particleCount--){
//                    aParticles.push(new Particle(x,y));
                    var oParticle=new Particle(x, y);
                    oParticle.x=x+j*2*(RADIUS+1)+(RADIUS+1);
                    oParticle.y=y+i*2*(RADIUS+1)+(RADIUS+1);
                    aParticles.push(oParticle);
                }
                balls.push(aParticles);
            }

}

//function addBalls( x , y , num ){
//
//    for( var i = 0  ; i < digit[num].length ; i ++ )
//        for( var j = 0  ; j < digit[num][i].length ; j ++ )
//            if( digit[num][i][j] == 1 ){
//                var aBall = {
//                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
//                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
////                    传入的x和y是那些小时和分钟应该对应的在canvas上的位置， 现在计算对应到每一个小球应该在的位置， 因为我们每一个格子的长度是2*(radius+1)
//                    g:0.3+ Math.random(),
//                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
//                    vy:-5,
//                    color: colors[ Math.floor( Math.random()*colors.length ) ]
//                }
//
//                balls.push( aBall )
//            }
//}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = InitialTimeHour;
    var minutes = InitialTimeMinute;
    var seconds = InitialTimeSecond;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        for(var j=0; j< balls[i].length; j++){
            balls[i][j].draw();
            balls[i][j].update();
        }
//        cxt.fillStyle=balls[i].color;
//
//        cxt.beginPath();
//        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
//        cxt.closePath();
//
//        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}


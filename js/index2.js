var chessBoard = [];
for(var i=0; i<15; i++){
    chessBoard[i] = [];
    for(var j=0; j<15; j++){
        chessBoard[i][j] = 0;
    }
}



var chess = document.getElementById('chess');
var ul = document.getElementsByTagName('ul')[0];
var context = chess.getContext('2d');
var div = document.getElementsByTagName("div")[0];
var me = true;

context.strokeStyle = "black";

var logo = new Image();
logo.src = "images/logo.jpg";
logo.onload = function () {
    context.drawImage(logo,0,0,450,450);
    drawChessBoard();
}



var drawChessBoard = function () {
    for(var i=0; i<15; i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}


var oneStep = function (i,j,me) {
    context.beginPath();
    context.arc(15+i*30, 15+j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2,13,15+i*30+2 , 15+j*30-2 ,0);
    if(me){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766")
    } else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9")
    }
    context.fillStyle = gradient;
    context.fill();
}


var index= 0;
chess.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x/30);

    var j = Math.floor(y/30);
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        if(me){
            index = index + 1;
            var li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML =  "第"+index+"步 黑子落:(" +i+ "," + j + ")"  ;
        }else {
            index = index + 1;
            var li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML =  "第"+index+"步 白子落:(" +i+ "," + j + ")"  ;
        }

        if(me){
            chessBoard[i][j] = 1;
        }else {
            chessBoard[i][j] = 2;
        }
        me =! me;
    }
}
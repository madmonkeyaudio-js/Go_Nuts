// console.log('loaded!');


let canvas = document.querySelector('#canvas');
let squirrel1= document.getElementById('squirrel-div1');
let squirrel2 = document.getElementById('squirrel-div2')
let acornDiv = document.createElement('div');
let player1Score = 0;
let player2Score = 0;
let rounds = 0;


//START GAME !!!!!
document.getElementById('start').addEventListener('click', startGame);
function startGame(){
    let timer = 60;
    //document.getElementById('music').play();
   
    if (rounds === 0){
        squirrel1.style.display = "";
        squirrel2.style.display = "none";
    }else if(rounds === 1){
        squirrel1.style.display = "none";
        squirrel2.style.display = "";
    }else {
        squirrel1.style.display = "";
        setTimeout(function(){
            squirrel2.style.display = "";
        }, 60);
    }
    document.getElementById('score-board').textContent += "Round 1"
    
    let acornsArray = [];
    let heartsArray = [];
    

    document.getElementById('instruction-board').style.display = "none";
//GAME COUNTDOWN
let countDown = setInterval(function() {
    let count = document.getElementById('count-down');
    count.textContent = "";
    count.textContent += `${timer}`;
    timer--;
    stopClock();

}, 100);

//UPDATING SQUIRREL X/Y AXIS
let dx = 40;
let dy = 20;
let ax = 20;
let ay = 20;

setInterval(function() {
    
    squirrel1.style.left = `${dx}%`;
    squirrel1.style.top =  `${dy}%`;
    squirrel2.style.left = `${ax}%`;
    squirrel2.style.top = `${ay}%`;


    if (dx < 5){
        dx = 5;
    }
    if (dx > 100){
        dx = 100;
    }
    if (dy < 5){
        dy = 5;
    }
    if (dy > 80){
        dy = 80;
    }
    if (ax < 5){
        ax = 5;
    }
    if (ax > 100){
        ax = 100;
    }
    if (ay < 5){
        ay = 5;
    }
    if (ay > 80){
        ay = 80;
    }
   
}, 50);
//MOVEMENT KEYDOWN LOGIC FOR SQUIRREL
document.addEventListener('keydown', move);

function move(e){
    
    switch (e.keyCode) {
        case 37: 
            dx -= 2;
            squirrel1.style.backgroundImage = "url('sprites/squirrel_left.png')";
            break;
        case 38: 
            dy -= 3;
            squirrel1.style.backgroundImage = "url('sprites/squirrel_up.png')";
            break;
        case 39: 
            dx += 2;
            squirrel1.style.backgroundImage = "url('sprites/squirrel_right.png')";
            break;
        case 40: 
            dy += 3;
            squirrel1.style.backgroundImage = "url('sprites/squirrel_down.png')";
            break;
        case 32: 
            dx + 0;
            dy + 0;
            squirrel1.style.backgroundImage = "url('sprites/Screen\ Shot\ 2019-08-02\ at\ 3.57.51\ PM.png')";
            break;
        case 65: 
            ax -= 2;
            squirrel2.style.backgroundImage = "url('sprites/squirrel_left.png')";
            break;
        case 87: 
            ay -= 3;
            squirrel2.style.backgroundImage = "url('sprites/squirrel_up.png')";
            break;
        case 68: 
            ax += 2;
            squirrel2.style.backgroundImage = "url('sprites/squirrel_right.png')";
            break;
        case 83: 
            ay += 3;
            squirrel2.style.backgroundImage = "url('sprites/squirrel_down.png')";
            break;
    }
}
//POPULATE THE GAME-BOARD WITH RANDOMLY PLACED HEARTS
let populateHearts = setInterval(function(){
    //STOP ACTIVATES AT MAX HEARTS
    stopHeartInterval();
    let heartDiv = document.createElement('div');
        heartDiv.classList = "new-heart";
        heartDiv.style.left = `${randomPlacementLeft()}%`;
        heartDiv.style.top = `${randomPlacementTop()}%`;
        heartsArray.push(heartDiv);
        heartDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(heartDiv);
}, 6200);
// stopHeartInterval();

//POPULATE THE GAME-BOARD WITH RANDOMLY PLACED ACORNS
let populateAcorns = setInterval(function(){
    //STOP ACTIVATES AT MAX ACORNS
    stopAcornInterval();
    let acornDiv = document.createElement('div');
        acornDiv.classList = "new-acorn";
        acornDiv.style.left = `${randomPlacementLeft()}%`;
        acornDiv.style.top = `${randomPlacementTop()}%`;
        acornsArray.push(acornDiv);
        acornDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(acornDiv);
        //console.log(acornDiv.getBoundingClientRect())

},2000)

//APPLY MAXIMUM NUM OF HEARTS AND ACORNS ON THE BOARD AT ONE TIME;
// stopAcornInterval();

function randomPlacementTop(){
   return Math.floor((Math.random()*90) + 1);
}
function randomPlacementLeft(){ 
    return Math.floor((Math.random()*100) + 1);
 }

//UPDATE SQUIRREL BOUNDS POSITION
//IS OVERLAPPED WITH ACORN??????
setInterval(function(){ 
     
    acornsArray.forEach(acorn => {
       
    if(isCollide(acorn.getBoundingClientRect(), squirrel1.getBoundingClientRect()) === true){
        acorn.style.display = "none";
        //document.getElementById('acorn').play();
        player1Score++;
        
    }if (isCollide(acorn.getBoundingClientRect(), squirrel2.getBoundingClientRect()) === true){
        acorn.style.display = "none";
        //document.getElementById('acorn').play();
        player2Score++;
    }
})
}, 200);

 function isCollide(acorn, squirrel) {
    
    let rect1 = acorn;
    let rect2 = squirrel;

    let overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)

    return overlap;
 }
   
    //STOP INTERVALS
    function stopAcornInterval(){
            clearInterval(populateAcorns);
    }
    function stopHeartInterval(){
            clearInterval(populateHearts);
    }
    function stopClock(){
        if (timer < 0){
            clearInterval(countDown);
            rounds++;
            determineRound();
            stopAcornInterval();
            stopHeartInterval();

        }
    }
}
//COUNT ROUNDS TO INDICATE WHICH INSTRUCTION BOARD COMES NEXT
    function determineRound(){
        if (rounds === 1){
            roundTwo();
        }if (rounds === 2 && player1Score === player2Score){
            roundThree();
        }
    }
    function roundTwo(){
        document.getElementById('round-2').style.visibility = "visible";
    }
//START ROUND TWO
    document.getElementById('start-round2').addEventListener('click', function(){
       
        document.getElementById('score-board').textContent = "";
                document.getElementById('score-board').textContent += "Round 2"
                document.getElementById('round-2').style.display = "none";
                startGame();
    });

    function roundThree(){
        document.getElementById('round-3').style.visibility = "visible";
    }
    document.getElementById('start-round3').addEventListener('click', function(){
       
        document.getElementById('score-board').textContent = "";
                document.getElementById('score-board').textContent += "Round 3"
                document.getElementById('round-3').style.display = "none";
                startGame();
    });



//When you start the second round, you want the player, player controls, player 
//tally, and round to change. Everything else should be left as is. 




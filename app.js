console.log('loaded!');

let canvas = document.querySelector('#canvas');
let squirrel1= document.getElementById('squirrel-div');
let acornDiv = document.createElement('div');
let acornsArray = [];
let heartsArray = [];
let timer = 60;
let player1Score = 0;
let player2Score = 0;



document.getElementById('start').addEventListener('click', startGame);


function startGame(e){
    e.preventDefault();
    document.getElementById('instruction-board').style.display = "none";


let dx = 20;
let dy = 20;

let countDown = setInterval(function() {
    let count = document.getElementById('count-down');
    count.textContent = "";
    count.textContent += `${timer}`;
    timer--;
    stopClock();

}, 1000);

setInterval(function() {
    
    squirrel1.style.left = `${dx}%`;
    squirrel1.style.top = `${dy}%`;

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
   
}, 50);

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
    }
}
let populateHearts = setInterval(function(){
    stopHeartInterval();
    let heartDiv = document.createElement('div');
        heartDiv.classList = "new-heart";
        heartDiv.style.left = `${randomPlacementLeft()}%`;
        heartDiv.style.top = `${randomPlacementTop()}%`;
        heartsArray.push(heartDiv);
        heartDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(heartDiv);
//console.log(heartDiv.getBoundingClientRect());
}, 6200);
stopHeartInterval();

let populateAcorns = setInterval(function(){
    stopAcornInterval();
    let acornDiv = document.createElement('div');

        acornDiv.classList = "new-acorn";
        acornDiv.style.left = `${randomPlacementLeft()}%`;
        acornDiv.style.top = `${randomPlacementTop()}%`;
        acornsArray.push(acornDiv);
        acornDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(acornDiv);
        console.log(acornsArray);
       // console.log(acornDiv.getBoundingClientRect());

},2000)

//If acorn count on map is at max, clear the interval;
stopAcornInterval();

function randomPlacementTop(){
   return Math.floor((Math.random()*90) + 1);
}
function randomPlacementLeft(){ 
    return Math.floor((Math.random()*100) + 1);
 }


setInterval(function(){ 
    updateSquirrelPosition();
    acornsArray.forEach(acorn => {
        acorn.getBoundingClientRect();
        isCollide();
    if(isCollide() === true){
    console.log('DONT DISPLAY THE ACORN!')
    }
 
})
    
}, 500);


 function isCollide() {
    let rect1 = acornDiv.getBoundingClientRect();
    let rect2 = squirrel1.getBoundingClientRect();

    let overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)

    return overlap;
 }

    //STOP INTERVALS

    function updateSquirrelPosition(){
        return squirrel1.getBoundingClientRect();  
    }
 
    function stopAcornInterval(){
        if (acornsArray.length >= 4){
            clearInterval(populateAcorns);
        }
    }
    function stopHeartInterval(){
        if (heartsArray.length >= 4){
            clearInterval(populateHearts);
        }
    }
    function stopClock(){
        if (timer < 0){
            clearInterval(countDown);
        }
    }


}
//FUNCTION TO DETECT COLLISION

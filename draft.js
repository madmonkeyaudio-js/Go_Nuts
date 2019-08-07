let player1Score;
let player2Score;
let player1Report = 1;
let player2Report = 1;
let player1Health;
let player2Health;
let player1HealthBar = 0;
let player2HealthBar = 0;
let canvas;
document.getElementById('win').style.display = "none";
let squirrel1= document.getElementById('squirrel-div1');
squirrel1.style.display = "none";
let squirrel2 = document.getElementById('squirrel-div2');
squirrel2.style.display = "none";
let acornsArray;
let heartsArray;
let timer;
let rounds = 0;
let countDown;
let acornId;
let heartId;
let populateAcorns;
let populateHearts;

document.getElementById('reset').addEventListener('click', restart);

//START GAME !!!!!
document.getElementById('start').addEventListener('click', startGame);

stopClock();
function startGame(){
    initialize();
    
   document.getElementById('music').play();
    if (rounds === 0){
        squirrel1.style.display = "";
        squirrel2.style.display = "none";
    }else if(rounds === 1){
        squirrel1.style.display = "none";
        squirrel2.style.display = "";
    }else {
        squirrel1.style.display = "";
        //SET TIMEOUT TO PREVENT GLITCHING
        setTimeout(function(){
            squirrel2.style.display = "";
        }, 60);
    }
    populateMap();
    overlapAcorn(squirrel1, player1Score);
    overlapAcorn(squirrel2, player2Score);
    overlapHeart(squirrel1, player1Health);
    overlapHeart(squirrel2, player2Health);
    overlapSquirrels(squirrel1, squirrel2);
    // clockCountdown();

}   
//GAME COUNTDOWN
function clockCountdown(){
countDown = setInterval(function() {
    let count = document.getElementById('count-down');
    count.textContent = "";
    count.textContent += `${timer}`;
    timer--;
    stopClock();

}, 400);
}
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
//MOVEMENT KEYDOWN LOGIC FOR SQUIRRELS
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
//POPULATE THE GAME-BOARD WITH RANDOMLY PLACED ITEMS
function populateMap(){
populateHearts = setInterval(function(){
   let heartDiv = document.createElement('div');
        heartDiv.classList = "new-heart";
        heartId++;
        heartDiv.setAttribute("id", heartId);
        heartDiv.style.left = `${randomPlacementLeft()}vw`;
        heartDiv.style.top = `${randomPlacementTop()}%`;
        heartsArray.push(heartDiv);
        heartDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(heartDiv);
        //document.getElementById('heart-pop').play();
}, 6200);
populateAcorns = setInterval(function(){
    let acornDiv = document.createElement('div');
        acornDiv.classList = "new-acorn";
        acornId++;
        acornDiv.setAttribute("id", acornId);
        acornDiv.style.left = `${randomPlacementLeft()}vw`;
        acornDiv.style.top = `${randomPlacementTop()}%`;
        acornsArray.push(acornDiv);
        acornDiv.getBoundingClientRect();
        document.querySelector('#canvas').append(acornDiv);
},3000)
function randomPlacementLeft(){ 
    return Math.floor((Math.random()*80) + 0);
 }
function randomPlacementTop(){
   return Math.floor((Math.random()*30) + 0);
}

}


//COLLISION FUNCTIONS
function overlapAcorn(squirrel, playerTally){
    let overlapVar = setInterval(function(){
        acornsArray.forEach(acorn => {
            if(isCollide(squirrel.getBoundingClientRect(), acorn.getBoundingClientRect())===true){
                clearAcorns(acorn);
               document.getElementById('munch').play();
              
                if (playerTally === player1Score){
                    document.getElementById('player1-score').textContent = `Player1 score = ${player1Report++}`;
                }else {
                    document.getElementById('player2-score').textContent = `Player2 score = ${player2Report++}`;
                }
            }
        })
    }, 100)
}
function overlapHeart(squirrel, playerTally){
    let overlapVar = setInterval(function(){
        heartsArray.forEach(heart => {
            if(isCollide(squirrel.getBoundingClientRect(), heart.getBoundingClientRect())===true){
              clearHearts(heart);
               document.getElementById('heart').play();
               
                if (playerTally === player1Health){
                    player1HealthBar++
                    document.getElementById('player1-health').textContent = `Player1 health = ${player1HealthBar}`;
                }else {
                    player2HealthBar++
                    document.getElementById('player2-health').textContent = `Player2 health = ${player2HealthBar}`;
                }
            }
        })
    }, 100)
}
function overlapSquirrels(squirrel1, squirrel2){
    
        if(isCollide(squirrel1.getBoundingClientRect(), squirrel2.getBoundingClientRect())===true){
            if (player1HealthBar > player2HealthBar){
                squirrel2.style.display = "none";
            }else if (player2HealthBar > player1HealthBar){
                squirrel1.style.display = "none";
            }else {
                console.log('same');
        }
    }
}
    //DETERMINE OVERLAP FUNCTION
function isCollide(squirrel, item) {
    
    let rect1 = squirrel;
    let rect2 = item;

    let overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)

    return overlap;
 }
    //STOP INTERVALS
function stopClock(){
    if (timer < 0){
        clearInterval(countDown);
        rounds++;
        stopPopulateInterval();
        acornsArray.forEach(function(acorn){
            clearAcorns(acorn);
        });
        heartsArray.forEach(function(heart){
            clearHearts(heart);
        })
        determineRound();
    }
}
function stopPopulateInterval(){
    clearInterval(populateAcorns);
    clearInterval(populateHearts);
}
//COUNT ROUNDS TO INDICATE WHICH INSTRUCTION BOARD COMES NEXT
function determineRound(){
    if (rounds === 1){
        
      
        console.log(acornsArray);
        roundTwo();
    }else if (rounds === 2){
        if(player1Report > player2Report){
            document.getElementById('win').style.display = "";
            document.getElementById('win').textContent += "Player 1 Wins!";
        }else if(player1Report < player2Report){
            document.getElementById('win').style.display = "";
            document.getElementById('win').textContent += "Player 2 Wins!";
        }else {
            roundThree();
        }
    }else if (rounds >= 3){
        if (player1Report > player2Report){
            document.getElementById('win').style.display = "";
            document.getElementById('win').textContent += "Player 1 Wins!";
        }else if (player2Report > player1Report){
            document.getElementById('win').style.display = "";
            document.getElementById('win').textContent += "Player 2 Wins!";
        }else {
            document.getElementById('win').style.display = "";
            document.getElementById('win').textContent += "We have a Draw!";
        }
    }
}
    //START ROUND TWO
function roundTwo(){

    document.getElementById('round-2').style.visibility = "visible";
    squirrel1.style.display = "none";
}
    document.getElementById('start-round2').addEventListener('click', function(){
    document.getElementById('round-2').style.display = "none";
    
    startGame();
  });
    //START ROUND THREE
function roundThree(){
    document.getElementById('round-3').style.visibility = "visible";
    squirrel2.style.display = "none";
    }
    document.getElementById('start-round3').addEventListener('click', function(){
    document.getElementById('round-3').style.display = "none";
    startGame();
    });
    
function restart(){
    
    document.getElementById('instruction-board').style.display = "";
    clearInterval(countDown);
    stopPopulateInterval();
    document.getElementById('round-2').style.visibility = "hidden";
    document.getElementById('round-3').style.visibility = "hidden";
    document.getElementById('winter').style.visibility = "hidden";
    document.getElementById('win').style.display = "none";
    rounds = 0;
    acornsArray.forEach(function(acorn){
        clearAcorns(acorn);
    });
    heartsArray.forEach(function(heart){
        clearHearts(heart);
    })
    determineRound();
}

function initialize(){
    clearInterval(countDown);
    stopPopulateInterval();
    player1Score = "player1";
    player2Score = "player2";
    player1Health = "player1 Health";
    player2Health = "Player2 Health";
    canvas = document.querySelector('#canvas');
    squirrel1= document.getElementById('squirrel-div1');
    squirrel1.style.display = "none";
    squirrel2 = document.getElementById('squirrel-div2')
    squirrel2.style.display = "none";
    document.getElementById('instruction-board').style.display = "none";
    document.getElementById('winter').style.visibility = "visible";
    acornsArray = [];
    heartsArray = [];
    timer = 20;
    countDown;
    acornId = 0;
    heartId = 0;

    clockCountdown();
}


//CLEAR ACORNS AND HEARTS
function clearAcorns(acorn){
    let index = acornsArray.findIndex(function(nut){
        return nut.id === acorn.id;
    })
    acorn.parentNode.removeChild(acorn);
    acornsArray.splice(index, 1);
}
function clearHearts(heart){
    let index = heartsArray.findIndex(function(item){
        return item.id === heart.id;
    })
    heart.parentNode.removeChild(heart);
    heartsArray.splice(index, 1);
}
const game = () => {
  let pScore = 0;
  let cScore = 0;
  var score = 0;
  var highscore = localStorage.getItem("highscore");
  var phighscore = localStorage.getItem("phighscore");
  var chighscore = localStorage.getItem("chighscore");



  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".startButton");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const result = document.querySelector(".result");
    let seconds = 60;
    let minutes = 2;
    const timer = document.querySelector(".timer");


    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn"); 
      var myTimer = setInterval(function() {
    	timer.innerHTML = `<h2>${minutes}:${--seconds}</h2>`;
    	if(seconds === 0) {
    		seconds = 60;
    		minutes--;
    	}
    	if(minutes< 0) {
    		clearInterval(myTimer);
    		timer.innerHTML = "<h2>0:00</h2>";
    		if(pScore > cScore) {
    			result.innerHTML = `<h1>Player Wins</h1><h2>${pScore} - ${cScore}</h2><h3>Hi-score: `;
    		}
    		else if(pScore === cScore) {
    			result.innerHTML = `<h1>Its a tie</h1><h2>${pScore} - ${cScore}</h2>`;
    		}
    		else {
    			result.innerHTML = `<h1>Computer Wins</h1><h2>${pScore} - ${cScore}</h2>`;
    		}
    		match.classList.add("fadeOut");
    		result.classList.add("fadeIn");
    		score = pScore - cScore;
    		highscoreCalc();
    		var h3 = document.createElement("h3");
    		result.appendChild(h3);
    		var h3Edit = document.querySelector(".result h3");
    		console.log(phighscore);
    		if(score < highscore) {
    			h3Edit.textContent = `Hi-score: ${phighscore} - ${chighscore}`;
    		}
    		else {
    			h3Edit.textContent = `HI-score: ${pScore} - ${cScore}`;
    		}
    	}
    },1000); 
    });
    }

   const highscoreCalc = () => {
   	if(highscore !== null){
		if (score > highscore) {
    		localStorage.setItem("highscore", score);
	        	localStorage.setItem("phighscore", pScore);
	        	localStorage.setItem("chighscore", cScore);      
	    	}
		}
		else{
			localStorage.setItem("highscore", score);
	    	localStorage.setItem("phighscore", pScore);
	        localStorage.setItem("chighscore", cScore);
		}
   }
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });


    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `${this.textContent}.png`;
          computerHand.src = `${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "One point to player";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "One point to computer";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "One point to computer";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "One point to player";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "One point to computer";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "One point to player";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();

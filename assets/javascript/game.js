window.onload = function() {
	$('#start').html('<div class="text-center"><button type="button" class="btn btn-default" style="font-size: 140%;">Start</button></div>');
};

var questionArray = [
	"On the Fresh Prince of Bel'air, who played Will's cousin, Carleton?",
	 "Tim Taylor, a handyman prone to accidents, was played by which actor?",
	 "Ash Ketchum's first Pokemon was...", 
	 "The Green Power Ranger later became which Power Ranger in the original show?", 
	 "In the animated TV Show the rugrats, what did Tommy carry with him at all times?"
	 ];

var optionArray = [
	["DJ Jazzy Jeff", "James Avery", "Alfonso Ribeiro", "Shaq"], 
	["Jonathan Taylor Thomas", "Tim Allen", "Richard Karn", "Patricia Richardson"], 
	["Charmander", "Pikachu", "Squirtle", "Mew"], 
	["The White Ranger", "The Red Ranger", "The Black Ranger", "The Pink Ranger"], 
	["A hammer", "A socket wrench", "A screwdriver", "A nail gun"]
];

var answerArray= [
	"Alfonso Ribeiro", "Tim Allen", "Pikachu", "The White Ranger", "A screwdriver"
	];

var imageArray= [
	"https://media.giphy.com/media/lF1XZv45kIwMw/giphy.gif", 
	"https://media.giphy.com/media/8Rf3xSwC1R39u/giphy.gif", 
	"https://media.giphy.com/media/39GAXpLVKvYRO/giphy.gif", 
	"https://media.giphy.com/media/y65VoOlimZaus/giphy.gif", 
	"https://media.giphy.com/media/wal9YS0UHbTby/giphy.gif"
];

var count = 0;
var question = 0;
var selectedAnswerIndex = 0;
var rightAnswer = 0;
var wrongAnswer = 0;

var time = 10;
var intervalId;

$("#start").on('click', function() {

	// Count Down Timer //
	function startTime() {
	    intervalId = setInterval(count, 1000);
	}

	function count() {
		time--;
	    $('#timer').html(time);
	    if (time === 3) {
	    	$("#timer").css("color","red");
	    }
	    if (time === 0) {
	    	if (question === questionArray.length-1) {
	    		$("#timer").css("color","green").empty();
	    		stop();
	    		wrongAnswer++;
	    		$("#rightAnswer").html("<h3>Right Answers: </h3>" + rightAnswer);
	    		$("#wrongAnswer").html("<h3>Wrong Answers: </h3>" + wrongAnswer);
	    		$("#question").empty().append('<h3>You ran out of time!<br><br>The right answer is ' + answerArray[question] + '</h3><br><img src=' + imageArray[question] + '>');;
	    		$("#options").empty();
				setTimeout(startOver, 4000);
				function startOver() {
					$("#question").empty();
					$("#timer").empty();
					$("#options").empty().append("<h3>Wasn't that fun?<br><br></h3><button class='startOver'>Play Again!</button>'");
					$(".startOver").on('click', function() {
						wrongAnswer = 0;
						rightAnswer = 0;
						question = 0;
						$("#wrongAnswer").empty();
						$("#rightAnswer").empty();
						nextQuestion();
					});
				}
	    	} else {
	    	$("#timer").css("color","green").empty();
	    	stop();
	    	$("#question").empty().append('<h3>You ran out of time!<br><br>The right answer is ' + answerArray[question] + '</h3><br><img src=' + imageArray[question] + '>');;
			$("#options").empty();
			$("#timer").empty();
			question++;
			wrongAnswer++;
			$("#wrongAnswer").html("<h3>Wrong Answers: </h3>" + wrongAnswer);
			$("#rightAnswer").html("<h3>Right Answers: </h3>" + rightAnswer);
			setTimeout(nextQuestion, 4000);
		}
	    }
	}

	function stop() {
		clearInterval(intervalId);
		time = 10;
	}

	$(this).css("display","none");
	nextQuestion();

	// Count Down Timer END //
	function nextQuestion() {
		startTime();

		$("#timer").html("10");
		$("#options").empty();
		$("#rightAnswer").empty();
		$("#wrongAnswer").empty();
		$("#question").html('<h3>' + questionArray[question] + '</h3>');
	
		if (question != questionArray.length) {	
			for (var j = 0; j < 4; j++) {
				$("#options").append('<button class="choice" id="choice_' + j + '">' + optionArray[question][j] + "</button>" + "<br>");
			}
			select();
			} else {
				question = 0;
				$("#options").empty();
		}
	}

	function select() {
		$(".choice").on('click', function() {
			console.log('click');
			// Get the index of the selected answer through the ID attribute
		    selectedAnswerIndex = $(this).attr('id').substring("choice_".length);

			if (optionArray[question][selectedAnswerIndex] === answerArray[question]) {
				$("#question").empty();
				$("#timer").empty();
				$("#options").empty().append('<h3>You picked the right answer!<br><br>' + answerArray[question] + '</h3><br><img src=' + imageArray[question] + '>');
				question++;
				rightAnswer++;
				$("#rightAnswer").html("<h3>Right Answers: </h3>" + rightAnswer);
				$("#wrongAnswer").html("<h3>Wrong Answers: </h3>" + wrongAnswer);
				stop();
			} else {
				$("#question").empty();
				$("#timer").empty();
				$("#options").empty().append('<h3>You picked the wrong answer!<br><br>The right answer is ' + answerArray[question] + '</h3><br><img src=' + imageArray[question] + '>');
				question++;
				wrongAnswer++;
				$("#rightAnswer").html("<h3>Right Answers: </h3>" + rightAnswer);
				$("#wrongAnswer").html("<h3>Wrong Answers: </h3>" + wrongAnswer);
				stop();
			}

			if (question === questionArray.length) {
				stop();
				setTimeout(startOver, 4000);
				function startOver() {
					$("#question").empty();
					$("#timer").empty();
					$("#options").empty();
					$("#start-over").append("<h3>Wasn't that fun?<br><br></h3><button class='startOver'>Play Again!</button>'");
					$(".startOver").on('click', function() {
						wrongAnswer = 0;
						rightAnswer = 0;
						question = 0;
						$("#start-over").empty();
						$("#wrongAnswer").empty();
						$("#rightAnswer").empty();
						nextQuestion();
					});
				}
			} else {
				stop();
				setTimeout(nextQuestion, 4000);
			}
		});
	}

});
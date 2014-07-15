$(document).ready(function() {
    var answer = Math.ceil((Math.random() * 100)+1);  
    console.log("The magic number is " + answer);
    var numberOfGuesses = 0;
    var numberOfGuessesRemaining = 10;
    var guesses = [];
    var distance = null;
    var previousDistance = null;

    function getGuess() {
        $("#submit").click(game);
        $("#guess").keydown(function (enter) {
            if (enter.keyCode == 13) {
                game();
            }
        });
    }

    getGuess();

    function game() {  
        var guess = parseInt($('#guess').val());
        if (guesses.indexOf(guess) >= 0) {            
            $('.background').removeClass("cold warm fire correct white").addClass("white");
            $('#header').empty().html('ERROR').css({color:'black'});
            $('#response').html("This number has already been entered. Try again.").css({color:'black'});
            return false
        }
        else if (guess !== null && $.isNumeric(guess) && guess >= 1 && guess <= 100) {
            $('#guess').val('');
            numberOfGuesses += 1;
            numberOfGuessesRemaining -= 1;
            guesses.push(guess);
            distance = Math.abs(answer - guess);
            previousDistance = Math.abs(answer - guesses[guesses.length - 2]);
            if (guess === answer) {
                $('.background').removeClass("cold warm fire correct white").addClass("correct");
                $('#header').empty().html('CONGRATS!').css({color: 'white'});
                $('#response').html('You got the magic number after ' + numberOfGuesses + ' guess(es)! The number was ' + answer + ".").css({color: 'white'});
            } else {
                // console.log(guess, answer, previousDistance, distance);
                if (isNaN(previousDistance)) {
                    if (guess > answer) {
                       $('#header').empty().html('Try again').css({color: 'white'});
                        $('#response').html('Guess lower - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    } else if (guess < answer) {
                        $('#header').empty().html('Try again').css({color: 'white'});
                        $('#response').html('Guess higher - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    }

                } else if (distance > previousDistance) {
                    if (numberOfGuesses >= 10) {
                        $('.background').removeClass("cold warm fire correct white");
                        $('#header').empty().html("GAME OVER").css({color: 'white'});
                        $('#response').html('To play again, click "Start a New Game"').css({color: 'white'});
                    }
                    else if (guess > answer) {
                        $('.background').removeClass("cold warm fire correct white").addClass("cold");
                        $('#header').empty().html("Gettin' COLDER.").css({color: 'white'});
                        $('#response').html('Guess lower - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    } else if (guess < answer) {
                        $('.background').removeClass("cold warm fire correct white").addClass("cold");
                        $('#header').empty().html("Gettin' COLDER").css({color: 'white'});
                        $('#response').html('Guess higher - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    }
                } else if (distance < previousDistance) {
                    if (numberOfGuesses >= 10) {
                        $('.background').removeClass("cold warm fire correct white");
                        $('#header').empty().html("GAME OVER").css({color: 'white'});
                        $('#response').html('To play again, click "Start a New Game"').css({color: 'white'});
                    }
                    else if (guess > answer) {
                        $('.background').removeClass("cold warm fire correct white").addClass("warm");
                        $('#header').empty().html("Gettin' WARMER").css({color: 'white'});;
                        $('#response').html('Guess lower - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    } else if (guess < answer) {
                        $('.background').removeClass("cold warm fire correct white").addClass("warm");
                        $('#header').empty().html("Gettin' WARMER").css({color: 'white'});;
                        $('#response').html('Guess higher - your last guess was ' + guess + ".<br>You have " + numberOfGuessesRemaining + " guess(es) remaining.").css({color: 'white'});
                    }
                } 
            } 
        }
        
        $('#newgame').click(function (e) {
            e.preventDefault();
            answer = Math.floor((Math.random() * 100) + 1);
            console.log(answer);
            numberOfGuesses = 0;
            numberOfGuessesRemaining = 10;
            guesses = [];
            distance = null;
            previousDistance = null;
            $('.background').removeClass("cold warm fire correct white");
            $('#header').empty().html('Guess the Number!').css({color:'white'});
            $('#response').html('');
            $('#guess').val('');
        });

        $('#answer').click(function (e) {
            e.preventDefault();
            $('#header').empty().html("The answer is " + answer).css({color:'black'})
        });
    }
});

   
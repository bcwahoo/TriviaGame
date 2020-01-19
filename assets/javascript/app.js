var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
    question: "When he wasn't shooting movies or TV shows, the actor was showing the world how to get 'Jiggy With it'?",
    answers: ["Martin Lawerence", "LL Cool J", "Will Smith", "Marcus Houston"],
    correctAnswer: "Will Smith",
    image: "assets/images/will-smith.gif"
}, {
    question: "Inspired by Mel Gibson's Mad Max, this song became an anthem for its state?",
    answers: ["Welcome to Atlanta", "Midwest Swing", "California Love", "I'm from New York"],
    correctAnswer: "California Love",
    image: "assets/images/cali-love.gif"
}, {
    question: "Alongside his DJ, Eric B, this New York Native MC showed the world his master plan?",
    answers: ["Africa BamBata", "Rakim", "KRS-One", "Young MC"],
    correctAnswer: "Rakim",
    image: "assets/images/rakim.gif"
}, {
    question: "Even though it had nothing to do with writing, MC made this dance move popular wearing parachute pants?",
    answers: ["Chinese Typewriter", "Bankhead Boune", "The Offspring", "Roger Rabbit"],
    correctAnswer: "Chinese Typewriter",
    image: "assets/images/hammer-time.gif"
}, {
    question: "In the song, \"Mo Money, Mo Probelms\", The Notorious B.I.G. told people to wave this famous watch in the sky and wave it side to side?",
    answers: ["Casion", "Timex", "Rolex", "Fitbit"],
    correctAnswer: "Rolex",
    image: "assets/images/rolex.gif"
}, {
    question: "This hit single from Aaliyah was created with porducer Timbaland & Static Major in one evening  after a concert",
    answers: ["Are You That Somebody", "One in A Million", "Try Again", "We Need a Resolution"],
    correctAnswer: "Are You That Somebody",
    image: "assets/images/aaliyah.gif"
}, {
    question: "Her and Timbaland grabbed the Jeep and traveled to 1973 to get the sample from Ann Peebles classic?",
    answers: ["Shaka Khan", "Queen Latifah", "Missy Elliott", "Lil Kim"],
    correctAnswer: "Missy Elliott",
    image: "assets/images/missy.gif"
}, {
    question: "Despite having to file for bankruptcy, this group was able to merge hip hop and R & B on their way to several Grammys and a #1 album?",
    answers: ["Destiny Child", "TLC", "SWV", "Boyz 2 Men"],
    correctAnswer: "TLC",
    image: "assets/images/tlc.gif"
}, {
    question: "Smooth meleodies and wild antics was part of this group demeanor. To the point that were refered in many circles as, \"The Bad Boys of R&B\"?",
    answers: ["Jodeci", "Dru Hill", "Soul 4 Real", "Boyz 2 Men"],
    correctAnswer: "Jodeci",
    image: "assets/images/jodeci.gif"
},
{
    question: "Dubbed as the \"Ghetto Anthem\", Jay-Z enlisted the help of this Broadway Musical to help him create the 11th Greatest Song in Hip-Hop according to VH1?",
    answers: ["Cats", "Annie", "Fiddler on the Roof", "West Side Story"],
    correctAnswer: "Annie",
    image: "assets/images/annie.gif"
}];

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        this.counter--;
        $("#counter-number").text(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(this.countdown.bind(this), 1000);

        card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function () {
        this.counter = window.countStartNumber;
        $("#counter-number").text(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function () {

        clearInterval(window.timer);

        $("#counter-number").text(this.counter);

        card.html("<h2>Out of Time!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        card.append("<img class='center' src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results, 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },

    results: function () {

        clearInterval(window.timer);

        card.html("<h2>All done, heres how you did!</h2>");

        $("#counter-number").text(this.counter);

        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
        card.append("<img class='center' src='assets/images/juice.gif' />");
        card.append("<br><button id='start-over'>Run it Back?</button>");
    },

    clicked: function (e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        this.incorrect++;

        clearInterval(window.timer);

        card.html("<h2>Nah, Son!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        card.append("<img class='center' src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(window.timer);

        this.correct++;

        card.html("<h2>THAT'S WHAT'S UP!</h2>");
        card.append("<img class='center' src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        }
        else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function (e) {
    game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion.bind(game)();
});

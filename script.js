const challenges = [
    "Take sip of your drink equal to your score.",
    "Give a sip to someone else.",
    "Finish your drink.",
    "Take twenty sips.",
    "Make a rule for the next round.",
    "Everyone drinks.",
    "Skip your next turn.",
    "Swap drinks with someone.",
    "Do a funny dance.",
    "Tell a joke. If no one laughs, drink.",
    "Take a sip without using your hands.",
    "Make a toast to the player on your left.",
    "Recite a tongue twister without messing up.",
    "Spin around three times and take a sip.",
    "Name three types of cocktails in five seconds.",
    "Perform a magic trick for the group.",
    "Take a sip while balancing a coin on your forehead.",
    "Say 'Cheers!' in three different languages.",
    "Recreate your favorite emoji face and hold it for five seconds.",
    "Describe the taste of your drink in three words under 5 seconds.",
    "Take a sip and tell a short story related to the color of your drink.",
    "Play a round of rock-paper-scissors with the player across from you. Loser takes a sip.",
    "Recite the alphabet backward without mistakes.",
    "Name three famous fictional characters who would enjoy this drink.",
    "Do an impression of your favorite celebrity while taking a sip.",
    "Drink with your non-dominant hand for the next two turns.",
    "Take a sip and perform your best dance move.",
    "Hold your breath for five seconds before taking a sip.",
    "Take a sip and sing the chorus of your favorite song.",
    "Describe the aroma of your drink in three words.",
    "Take a sip and tell a joke. If no one laughs, take another sip.",
    "Share a fun fact about the history of drinking games.",
    "Take a sip and imitate an animal sound.",
    "Close your eyes and take a sip without spilling.",
    "Name three things that rhyme with the word 'drink'.",
    "Take a sip and do a cartwheel (or attempt one).",
    "Take a sip and give a compliment to the player on your right.",
    "Take a sip and recite a quote from your favorite movie.",
    "Take a sip and share a memorable drinking story.",
    "Name three countries known for their unique alcoholic beverages.",
    "Take a sip and share your favorite childhood memory.",
    "Take a sip and guess the song playing in the background.",
    "Take a sip and describe your dream vacation destination.",
    "Share a funny drinking-related anecdote.",
    "Take a sip and perform an air guitar solo.",
    "Name three types of wine without repeating any colors.",
    "Take a sip and describe the texture of your drink in three words.",
    "Take a sip and list three items you would bring to a desert island.",
    "Share an embarrassing moment you've had while drinking.",
    "Take a sip and share a strange food combination you enjoy.",
    "Name three historical figures you'd invite to a party.",
    "Take a sip and recite a limerick.",
    "Share a favorite memory from a past party or gathering.",
    "Take a sip and tell a story using only gestures.",
    "Describe the glassware you're drinking from in three words.",
    "Take a sip and invent a new cocktail recipe on the spot.",
    "Share an interesting fact about the drink you're currently having.",
    "Take a sip and tell a secret (it can be silly or serious).",
    "Name three superpowers you wish you had.",
    "Take a sip and express gratitude for something in your life."
];

let players = [];
let currentPlayerIndex = 0;
let maxPoints = 5;

const startScreen = document.getElementById("startScreen");
const nameScreen = document.getElementById("nameScreen");
const gameScreen = document.getElementById("gameScreen");
const leaderboardScreen = document.getElementById("leaderboardScreen");
const challengeBtn = document.getElementById("challengeBtn");
const completedBtn = document.getElementById("completedBtn");
const forfeitBtn = document.getElementById("forfeitBtn");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");
const startGameBtn = document.getElementById("startGameBtn");
const submitNamesBtn = document.getElementById("submitNamesBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const numPlayersInput = document.getElementById("numPlayers");
const maxPointsSelect = document.getElementById("maxPoints");
const nameForm = document.getElementById("nameForm");
const challengeText = document.getElementById("challenge");
const scoreText = document.getElementById("score");
const currentPlayerText = document.getElementById("currentPlayer");
const leaderboardDiv = document.getElementById("leaderboard");

startGameBtn.addEventListener("click", function() {
    const numPlayers = numPlayersInput.value;
    maxPoints = parseInt(maxPointsSelect.value, 10);
    nameForm.innerHTML = '';
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Player ${i + 1} Name`;
        input.required = true;
        nameForm.appendChild(input);
    }
    startScreen.classList.add("hidden");
    nameScreen.classList.remove("hidden");
});

submitNamesBtn.addEventListener("click", function() {
    const inputs = nameForm.querySelectorAll("input");
    players = Array.from(inputs).map(input => ({ name: input.value, score: 0 }));
    nameScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    resetGame();
    updateCurrentPlayer();
});

challengeBtn.addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    challengeText.innerText = challenges[randomIndex];
    toggleChallengeButtons(true);
});

completedBtn.addEventListener("click", function() {
    players[currentPlayerIndex].score++;
    updateScores();
    nextPlayer();
    checkEndOfGame();
});

forfeitBtn.addEventListener("click", function() {
    nextPlayer();
    checkEndOfGame();
});

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", function() {
    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

playAgainBtn.addEventListener("click", function() {
    leaderboardScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

function resetGame() {
    currentPlayerIndex = 0;
    players.forEach(player => player.score = 0);
    challengeText.innerText = "Press the button to get a challenge!";
    updateScores();
    updateCurrentPlayer();
    toggleChallengeButtons(false);
}

function updateScores() {
    scoreText.innerText = `Score: ${players[currentPlayerIndex].score}`;
}

function updateCurrentPlayer() {
    currentPlayerText.innerText = `${players[currentPlayerIndex].name}'s Turn`;
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
    toggleChallengeButtons(false);
}

function toggleChallengeButtons(enable) {
    completedBtn.disabled = !enable;
    forfeitBtn.disabled = !enable;
}

function checkEndOfGame() {
    if (players.some(player => player.score >= maxPoints)) {
        showLeaderboard();
    }
}

function showLeaderboard() {
    gameScreen.classList.add("hidden");
    leaderboardScreen.classList.remove("hidden");
    players.sort((a, b) => b.score - a.score);
    leaderboardDiv.innerHTML = players.map((player, index) => `<p>${index + 1}. ${player.name}: ${player.score} points</p>`).join("");
}

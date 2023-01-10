
window.onload = function () {

  let numberCorrect = 0;

  let start = Date.now();
  const display = document.querySelector('#time');
  const duration = 60 * 5;


  const timer = (timeDifference) => {
    timeDifference = duration - (((Date.now() - start) / 1000) | 0);

    minutes = (timeDifference / 60) | 0;
    seconds = (timeDifference % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (timeDifference <= 0) {
      start = Date.now() + 1000;
    }
  }

  setInterval(timer, 1000);

  const questionArea = document.getElementsByClassName('questions')[0];
  const answerArea = document.getElementsByClassName('answers')[0];
  const checker = document.getElementsByClassName('checker')[0];
  let current = 0;

  allQuestions = {
    'What is NOT a style of pizza?': ['Altoona', 'New York', 'Neopolitan', 'Greek', 'Gatekeeping Pizza is Wrong', 4],

    'Will I pass this course': ['Yes', 'Maybe', 'No', 1],

    'Why am I still trying to succeed in life': ['Trying not to be homeless', 'Fear of dying alone', 'My parents are telling me to', 1],

    'What is the best way to avoid responsibility?': ['Blame others', 'Ignore the problem and hope it goes away', 'Crying in the fetal position', 'All of the above', 3],

    'Placeholder': ['A', 'Correct Answer', 'C', 'D', 1],

    '2nd Placeholder': ['A', 'B', 'Correct Answer', 'D', 2],

  };

  const loadQuestion = (curr) => {

    const question = Object.keys(allQuestions)[curr];

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }

  const loadAnswers = (curr) => {

    const answers = allQuestions[Object.keys(allQuestions)[curr]];

    answerArea.innerHTML = '';

    for (var i = 0; i < answers.length - 1; i += 1) {
      var createDiv = document.createElement('div'),
        text = document.createTextNode(answers[i]);

      createDiv.appendChild(text);
      createDiv.addEventListener("click", checkAnswer(i, answers));


      answerArea.appendChild(createDiv);
    }
  }

  const checkAnswer = (i, arr) => {

    return function () {
      var givenAnswer = i,
        correctAnswer = arr[arr.length - 1];

      if (givenAnswer === correctAnswer) {
        addChecker(true);
        numberCorrect += 1;
        document.getElementById("numberCorrectAnswers").innerHTML = numberCorrect
      } else {
        addChecker(false);
      }

      if (current < Object.keys(allQuestions).length - 1) {
        current += 1;

        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = '🌭 You are so smart 🌭';
        answerArea.innerHTML = '';
      }

    };
  }

  const addChecker = (bool) => {

    var createDiv = document.createElement('div'),
      txt = document.createTextNode(current + 1);

    createDiv.appendChild(txt);

    if (bool) {

      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }

  loadQuestion(current);
  loadAnswers(current);

};
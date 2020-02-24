
let quest = {};

quest.currentQuestionText = document.querySelector('.current-question');
quest.resultsCard = document.querySelector('.results-card');
quest.questionForm = document.querySelector('.answers-form');
quest.questionText = document.querySelector('.question');
quest.answersText = document.querySelectorAll('input[name="answer"]+label');
quest.answersRadio = document.querySelectorAll('input[name="answer"]');
quest.nextBtn = document.querySelector('.next-question');
quest.previousBtn = document.querySelector('button.previous-question');
quest.submitBtn = document.querySelector('.calculate-mark');

quest.totalQuest = 0;

// Get initial data from JSON
quest.getQuestNum = $.ajax({url: "questions.json" ,complete: (xhr,status) => {
    let jsonContent = xhr.responseJSON;

    // Set total number of questions
    quest.totalQuest  = 10;
    quest.correctAnswerValue = 100/quest.totalQuest;

    // Randomize questions
    quest.questions = new Set();
    while(quest.questions.size < quest.totalQuest) {
      quest.questions.add(jsonContent[Math.round(Math.random() * ((quest.totalQuest - 1)  - 0) + 0)]);
    }
    quest.questions = Array.from(quest.questions);

    // Randomize answers
    for (let i = 0; i < quest.totalQuest; i++) {
      let shuffled = new Set();
      while (shuffled.size < quest.questions[i].answers.length) {
        shuffled.add(quest.questions[i].answers[Math.round(Math.random() * ((quest.questions[i].answers.length - 1)  - 0) + 0)]);
      }
      shuffled = Array.from(shuffled);
      quest.questions[i].answers = shuffled;
    }

    // Display first question
    quest.currentQuestion = 0;
    quest.displayNewQuestion();


}});

// Display new question
quest.displayNewQuestion = (navRequeuest) => {
  switch (navRequeuest) {
    case 'next':
      quest.currentQuestion++;
      if (quest.currentQuestion > quest.totalQuest - 1) {
        quest.currentQuestion = 0;
      }
      break;
    case 'previous':
      quest.currentQuestion--;
      if (quest.currentQuestion < 0) {
        quest.currentQuestion = quest.totalQuest - 1;
      }
      break;
  }
  quest.currentQuestionText.textContent = (quest.currentQuestion+1+"/"+quest.totalQuest);
  quest.questionText.textContent = quest.questions[quest.currentQuestion].question;
  quest.answersText[0].textContent = quest.questions[quest.currentQuestion].answers[0];
  quest.answersText[1].textContent = quest.questions[quest.currentQuestion].answers[1];
  quest.answersText[2].textContent = quest.questions[quest.currentQuestion].answers[2];

  if (quest.questions[quest.currentQuestion].selected) {
    quest.answersRadio[quest.questions[quest.currentQuestion].selected].checked = true;
  } else {
    quest.questionForm.reset();
  }
};


// Event handling
quest.nextBtn.addEventListener('click', () => {
  quest.displayNewQuestion('next');
});

quest.previousBtn.addEventListener('click', () => {
  quest.displayNewQuestion('previous');

});

quest.catchSelection = (selection) => {
    quest.questions[quest.currentQuestion].selected = selection.value;
}

quest.submitBtn.addEventListener('click', () => {
  // Score calculation
  quest.correctAnswers = 0;
  quest.wrongAnswers = 0;
  for (let i = 0; i < quest.totalQuest; i++) {
    if (quest.questions[i].selected) {
      quest.answered++;
      if (quest.questions[i].answers[Number(quest.questions[i].selected)] === quest.questions[i].correct) {
        quest.correctAnswers++;
      } else {
        quest.wrongAnswers++;
      }
    }
  }
  quest.resultsCard.textContent ='נכונות: '+quest.correctAnswers+' | שגויות: '+quest.wrongAnswers+' | לא נענו: '+(quest.totalQuest-(quest.wrongAnswers+quest.correctAnswers));
  quest.resultsCard.classList.add("show-results");
});

quest.submitBtn.addEventListener('blur', () => {
  quest.resultsCard.classList.remove("show-results");
});

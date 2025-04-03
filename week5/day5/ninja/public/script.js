document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const submitButton = document.getElementById('submit-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    document.querySelector('.quiz-container').insertBefore(timerElement, quizContainer);
    const progressBar = document.getElementById('progress-bar');
    const introScreen = document.getElementById('intro');
    const startButton = document.getElementById('start-btn');
    const currentQuestionNumber = document.getElementById('current-question');
    const totalQuestionsResult = document.getElementById('total-questions-result');
    const percentageElement = document.getElementById('percentage');
    const shareButton = document.getElementById('share-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let selectedOption = null;
    let timer;
    const TIME_PER_QUESTION = 15;

    startButton.addEventListener('click', () => {
      introScreen.classList.add('hide');
      quizContainer.classList.remove('hide');
      initQuiz();
    });

    function initQuiz() {
      fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
          questions = data;
          totalQuestionsElement.textContent = questions.length;
          showQuestion();
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          feedbackElement.textContent = 'Failed to load questions. Please try again.';
          feedbackElement.className = 'incorrect';
        });
    }

    function showQuestion() {
      resetState();
      startTimer();
      
      const progress = ((currentQuestionIndex) / questions.length) * 100;
      progressBar.style.width = `${progress}%`;
      
      currentQuestionNumber.textContent = currentQuestionIndex + 1;
      
      const currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  
      currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionElement.dataset.option = option;
        optionElement.addEventListener('click', () => selectOption(optionElement, option));
        optionsContainer.appendChild(optionElement);
      });
    }
  
    function resetState() {
      clearInterval(timer);
      feedbackElement.textContent = '';
      feedbackElement.className = '';
      optionsContainer.innerHTML = '';
      selectedOption = null;
      nextButton.classList.add('hide');
      submitButton.classList.remove('hide');
      timerElement.textContent = '';
      timerElement.className = '';
    }
  
    function startTimer() {
      let timeLeft = TIME_PER_QUESTION;
      updateTimerDisplay(timeLeft);
  
      timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
  
        if (timeLeft <= 0) {
          clearInterval(timer);
          timeUp();
        }
      }, 1000);
    }
  
    function updateTimerDisplay(timeLeft) {
      timerElement.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 5) {
        timerElement.className = 'warning';
      } else {
        timerElement.className = '';
      }
    }
  
    function timeUp() {
      feedbackElement.textContent = `Time's up! The correct answer was: ${questions[currentQuestionIndex].answer}`;
      feedbackElement.className = 'incorrect';
      submitButton.classList.add('hide');
      nextButton.classList.remove('hide');
      
      document.querySelectorAll('.option').forEach(option => {
        if (option.dataset.option === questions[currentQuestionIndex].answer) {
          option.classList.add('correct-answer');
        }
      });
    }
  
    function selectOption(optionElement, option) {
      document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
      });
  
      optionElement.classList.add('selected');
      selectedOption = option;
    }
  
    function checkAnswer() {
      if (!selectedOption) {
        feedbackElement.textContent = 'Please select an option';
        feedbackElement.className = 'incorrect';
        return false;
      }
  
      const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
      if (isCorrect) {
        score++;
        scoreElement.textContent = score;
      }
  
      showFeedback(isCorrect);
      submitButton.classList.add('hide');
      nextButton.classList.remove('hide');
      clearInterval(timer);
  
      if (!isCorrect) {
        document.querySelectorAll('.option').forEach(option => {
          if (option.dataset.option === questions[currentQuestionIndex].answer) {
            option.classList.add('correct-answer');
          }
        });
      }
  
      return isCorrect;
    }
  
    function showFeedback(isCorrect) {
      feedbackElement.textContent = isCorrect 
        ? 'Correct! 🎉' 
        : `Incorrect! The correct answer is: ${questions[currentQuestionIndex].answer}`;
      feedbackElement.className = isCorrect ? 'correct' : 'incorrect';
    }
  
    submitButton.addEventListener('click', checkAnswer);
  
    nextButton.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResults();
      }
    });
  
    function showResults() {
      quizContainer.classList.add('hide');
      resultsContainer.classList.remove('hide');
      
      const percentage = Math.round((score / questions.length) * 100);
      percentageElement.textContent = `${percentage}%`;
      totalQuestionsResult.textContent = questions.length;
      
      let message = '';
      
      if (percentage >= 80) {
        message = 'Excellent work! You\'re a quiz master! 🏆';
      } else if (percentage >= 60) {
        message = 'Good job! You\'ve got solid knowledge! 👍';
      } else if (percentage >= 40) {
        message = 'Not bad! A little more practice and you\'ll improve! 📚';
      } else {
        message = 'Keep learning and try again! Everyone starts somewhere! 💪';
      }
      
      const motivationMessage = document.getElementById('motivation-message');
      motivationMessage.textContent = message;
      
      progressBar.style.width = '100%';
    }
  
    restartButton.addEventListener('click', () => {
      currentQuestionIndex = 0;
      score = 0;
      scoreElement.textContent = score;
      resultsContainer.classList.add('hide');
      quizContainer.classList.remove('hide');
      
      const messageElement = document.querySelector('.motivation');
      if (messageElement) {
        messageElement.remove();
      }
      
      showQuestion();
    });
  
    shareButton.addEventListener('click', () => {
      const percentage = Math.round((score / questions.length) * 100);
      const text = `I scored ${score}/${questions.length} (${percentage}%) on the Quiz Master! Can you beat my score?`;
      
      if (navigator.share) {
        navigator.share({
          title: 'My Quiz Results',
          text: text,
          url: window.location.href,
        })
        .catch(error => console.log('Error sharing:', error));
      } else {
        alert('Share this result: ' + text);
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '4' && !submitButton.classList.contains('hide')) {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option');
        if (optionIndex < options.length) {
          const option = options[optionIndex];
          const optionValue = option.dataset.option;
          selectOption(option, optionValue);
        }
      } else if (e.key === 'Enter') {
        if (!submitButton.classList.contains('hide')) {
          checkAnswer();
        } else if (!nextButton.classList.contains('hide')) {
          nextButton.click();
        } else if (!restartButton.classList.contains('hide')) {
          restartButton.click();
        }
      }
    });
});

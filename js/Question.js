class Question {
    constructor(title, answers) {
      this.title = title;
      this.answers = answers.map((answer) => ({ ...answer }));
      this.selectedAnswerIndex = -1;
    }

    setSelectedAnswer(index) {
      this.selectedAnswerIndex = index;
    }

    getSelectedAnswer() {
      return this.selectedAnswerIndex;
    }
  }

  export default Question;
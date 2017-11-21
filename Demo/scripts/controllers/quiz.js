// <reference path="angular.min.js" />
// <reference path="../angular.js" />

(function () {

    angular.module("turtleFacts").controller("quizCtrl", QuizController)

    QuizController.$inject = ['quizMetrics','DataService']
    function QuizController(quizMetrics, DataService) {
        var vm = this;
        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectAnswer = selectAnswer;
        vm.finaliseAnswers = finaliseAnswers;

        var numQuesAns = 0;
        vm.activeQuestion = 0;
        vm.error = false;
        vm.finalise = false;
        

        function setActiveQuestion(index) {
            if (index === undefined){
                var comeOut = false;
                var quizlength = DataService.quizQuestions.length - 1;

                while (!comeOut) {
                    vm.activeQuestion = vm.activeQuestion < quizlength ? ++vm.activeQuestion : 0;

                    if (vm.activeQuestion === 0) {
                        vm.error = true;
                    }

                    if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                        comeOut = true;
                    }
                }
            } else {
                vm.activeQuestion = index;
            }
            
        }
        function questionAnswered() {

            var quizlength = DataService.quizQuestions.length;
            
            for (var x = 0; x < quizlength; x++) {

                if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                    numQuesAns++;
                    if (numQuesAns >= quizlength) {

                        for (var i = 0; i < quizlength; i++) {

                            if (DataService.quizQuestions[i].selected === null) {
                                setActiveQuestion(i);
                                return;
                            }
                        }
                        vm.error = false;
                        vm.finalise = true;
                        return;
                    }
                }
            }
           
            vm.setActiveQuestion();
        }

        function selectAnswer(index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;

        }

        function finaliseAnswers() {
            vm.finalise = false;
            numQuesAns = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
        }
    }
})();
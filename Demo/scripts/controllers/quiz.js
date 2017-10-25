/// <reference path="angular.min.js" />
/// <reference path="../angular.js" />

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
        vm.activeQuestion = 0;

        var numQuesAns = 0;

        function setActiveQuestion() {
            var comeOut = false;
            var quizlenght = DataService.quizQuestions.length - 1;

            while (!comeOut) {
                vm.activeQuestion = vm.activeQuestion < quizlenght ? ++vm.activeQuestion : 0;

                if (DataService.quizQuestion[vm.activeQuestion].selected === null) {
                    comeOut = true;
                }
            }
        }
        function questionAnswered() {

            var quizlen = DataService.quizQuestions.length;
            if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                numQuesAns++;
                if (numQuesAns >= quizlen) {

                }
            }
            vm.setActiveQuestion();
        }

        function selectAnswer(index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;

        }
    }
})();
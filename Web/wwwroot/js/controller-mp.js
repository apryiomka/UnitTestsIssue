feedbackApp.controller('feedbackControllerMP', function ($scope, SubmitFeedback, $window) {
    $scope.submit = function () {
        var response = packageResponse();
        SubmitFeedback.submit(response);
        fn = function () { $window.location.href = '/ThankYounb'; }
        $window.setTimeout(fn, 100);
    };

    $scope.next = function () {
        var response = packageResponse();
        SubmitFeedback.submit(response);

        if ($scope.page == $scope.data.pages.length) {
            fn = function () { $window.location.href = '/ThankYounb'; }
            $window.setTimeout(fn, 100);
        }
        else if ($scope.page == $scope.data.pages.length - 1) {

            var chance = Math.random();

            for (var q in $scope.data.pages[$scope.data.pages.length - 1].questions) {
                $scope.data.pages[$scope.data.pages.length - 1].questions[q].show = false;
            }

            var questionCount = 0;
            var min = 100;
            for (var q in $scope.data.pages[$scope.data.driverPage - 1].questions) {
                if ($scope.data.pages[$scope.data.driverPage - 1].questions[q].value
                    && $scope.data.pages[$scope.data.driverPage - 1].questions[q].type == "3"
                    && min > $scope.data.pages[$scope.data.driverPage - 1].questions[q].value) {
                    min = $scope.data.pages[$scope.data.driverPage - 1].questions[q].value;
                }
            }

            var candidates = [];
            var ratingQuestionIndex = 0;
            if (min < 100) {
                for (var q in $scope.data.pages[$scope.data.driverPage - 1].questions) {
                    if ($scope.data.pages[$scope.data.driverPage - 1].questions[q].type == "3") {
                        if ($scope.data.pages[$scope.data.driverPage - 1].questions[q].value
                            && min == $scope.data.pages[$scope.data.driverPage - 1].questions[q].value) {
                            questionCount++;
                            candidates.push(ratingQuestionIndex);
                        }
                        ratingQuestionIndex++;
                    }
                }
            }
            if (questionCount == 0) {
                questionCount++;
                candidates.push(0);
            }

            var questionShare = 1.00 / questionCount;

            var index = 1;
            var selected = false;
            for (var i in candidates) {
                if (chance < questionShare * index) {
                    $scope.data.pages[$scope.data.pages.length - 1].questions[candidates[i]].show = true;
                    selected = true;
                    break;
                }
                index++;
            }

            if (!selected) {
                $scope.data.pages[$scope.data.pages.length - 1].questions[0].show = true;
            }
        }

        $scope.page++;
    };

    $scope.cbclickIntra = function (index, q, p) {
        if (index == 0) {
            for (var cq in q.checkBoxQuestions) {
                if (cq != index) {
                    q.checkBoxQuestions[cq].value = false;
                }
            }
        }
        
        var showQuestions = q.checkBoxQuestions[index].showQuestion;
        if (showQuestions) {
            var showQuestionsCollection = showQuestions.split(":");
            for (var question in showQuestionsCollection) {
                var questionNum = Number(showQuestionsCollection[question]);
                if (questionNum > 0) {
                    p.questions[questionNum].show = true;
                } else {
                    p.questions[-questionNum].show = false;
                }
            }
        }

    }

    $scope.rbclick = function (index, q, p) {
        var showQuestions = q.radiobuttonQuestions[index].showQuestion;
        if (showQuestions) {
            var showQuestionsCollection = showQuestions.split(":");
            for (var question in showQuestionsCollection) {
                var questionNum = Number(showQuestionsCollection[question]);
                if (questionNum > 0) {
                    p.questions[questionNum].show = true;
                } else {
                    p.questions[-questionNum].show = false;
                }
            }
        }
    }

    init = function () {
        $scope.page = 1;
    }

    /**
     * function to package the response json to match the ASP.net model classes
     * @returns {} 
     */
    function packageResponse() {
        var response = {};
        for (var p in $scope.params) response[p] = $scope.params[p];
        response.ContactMePermission = $scope.data.pages[$scope.data.contactMePage - 1].contactMeChecked;
        response.ContactEmailAddress = $scope.data.pages[$scope.data.contactMePage - 1].contactMeEmail;

        for (var q in $scope.data.pages[0].questions) {
            if ($scope.data.pages[0].questions[q].type == "3") {
                response.Rating = $scope.data.pages[0].questions[q].value;
            }
        }

        var UserResponses = [];
        if ($scope.data.pages[$scope.data.contactMePage - 1].contactMeShow && $scope.data.pages[$scope.data.contactMePage - 1].contactMeChecked) {
            var contactMePermissionResponse = {};
            contactMePermissionResponse.Answer = response.ContactEmailAddress;
            contactMePermissionResponse.Question = $scope.data.pages[$scope.data.contactMePage - 1].contactMeTitle;
            contactMePermissionResponse.QuestionType = "0";
            UserResponses.push(contactMePermissionResponse);
        }

        for (var p in $scope.data.pages) {
            var pn = Number(p) + 1;
            if ($scope.page >= pn) {
                for (var q in $scope.data.pages[p].questions) {
                    if ($scope.data.pages[p].questions[q].show) {
                        var UserResponse = {};

                        if ($scope.data.pages[p].questions[q].type == "7") {
                            UserResponsesCB = [];

                            for (var cq in $scope.data.pages[p].questions[q].checkBoxQuestions) {
                                UserResponseCB = {};
                                UserResponseCB.Question = $scope.data.pages[p].questions[q].checkBoxQuestions[cq].question;
                                UserResponseCB.Answer = $scope.data.pages[p].questions[q].checkBoxQuestions[cq].value;
                                UserResponsesCB.push(UserResponseCB);
                            }

                            UserResponse.Answer = JSON.stringify(UserResponsesCB);
                        } else {
                            UserResponse.Answer = $scope.data.pages[p].questions[q].value;
                        }

                        UserResponse.Question = $scope.data.pages[p].questions[q].title;
                        UserResponse.QuestionType = $scope.data.pages[p].questions[q].type;
                        UserResponses.push(UserResponse);
                    }
                }
            }
        }

        response.Verbatim = UserResponses;

        return response;
    }

    init();
});

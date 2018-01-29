feedbackApp.controller('feedbackController', function ($scope, SubmitFeedback, $window) {
    $scope.submit = function () {
        var response = packageResponse();
        SubmitFeedback.submit(response);
        //immediate redirect to thank you page
        fn = function () {$window.location.href = '/ThankYou';}
        $window.setTimeout(fn, 100);
    };

    /**
     * function to package the response json to match the ASP.net model classes
     * @returns {} 
     */
    function packageResponse() {
        var response = {};
        for (var p in $scope.params) response[p] = $scope.params[p];
        response.ContactMePermission = $scope.data.contactMeChecked;
        response.ContactEmailAddress = $scope.data.contactMeEmail;
        var UserResponses = [];
        for (var f in $scope.feedback) {
            var UserResponse = {};
            //UserResponse.ComponentId = f;
            UserResponse.Answer = $scope.feedback[f];
            for (i =  0; i < $scope.data.questions.length;i++) {
                if ($scope.data.questions[i].id == f) {
                    if ($scope.data.questions[i].type == "1") {
                        response.Rating = $scope.feedback[f];
                    }
                    UserResponse.Question = $scope.data.questions[i].title;
                    UserResponse.QuestionType = $scope.data.questions[i].type;
                }
            }
            UserResponses.push(UserResponse);
        }
        response.Verbatim = UserResponses;
        
        return response;
    }

    
});
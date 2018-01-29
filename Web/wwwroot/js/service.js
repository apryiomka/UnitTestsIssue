//angular serive to submit feedback
feedbackApp.service("SubmitFeedback", function ($http) {
    this.submit = function (feedback) {
        return $http({
            method: 'POST',
            url: '/survey/submit',
            data: JSON.stringify(feedback),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
});
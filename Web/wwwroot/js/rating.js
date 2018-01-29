//custom angular directive to render and control the stars for rating
feedbackApp.directive('starRating', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        template: '<div class="rating-stars">' +
            '<ul><li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">\u2605</li>' +
            '</ul>' +
            '<div class="rating-label" >{{ratingLabels[ratingValue-1]}}</div></div>',
        scope: {
            ratingValue: '=',
            maxRating: '=',
            onRatingClick: '&',
            ratingLabels: '=',
            ratingId: '=',
        },

        link: function (scope, elem, attrs, ngModel) {

            ngModel.$setViewValue(scope.ratingValue);
            //function to update star colors when clicked
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.maxRating; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            //trigger the change in ngModel when a star is clicked
            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                ngModel.$setViewValue(scope.ratingValue);
                /*scope.onRatingClick({
                    id: scope.ratingId,
                    rating: index + 1
                });*/
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                    updateStars();
            });
        }
    }
});
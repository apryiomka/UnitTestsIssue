//custom angular directive to render and control the stars for rating
feedbackApp.directive('npsRating', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        template: '<div class="rating-radio">' +
            '<ul><li ng-repeat="num in numbers" ng-class="stars[num]" ng-click="toggle($index)">\u25c9<radio-text>{{num+1}}</radio-text></li><br/>' +
            '</ul>' +
            '<table class="rating-text" width="100%" align="center"><tr><td width=25% align="right">{{ratingLabels[0]}}</td><td width=50%></td><td width=25% align="left">{{ratingLabels[ratingLabels.length - 1]}}</td></tr></table>',
        scope: {
            ind: '@',
            ratingValue: '=',
            maxRating: '=',
            ratingLabels: '=',
        },

        link: function (scope, elem, attrs, ngModel) {

            ngModel.$setViewValue(scope.ratingValue);
            //function to update star colors when clicked
            var updateStars = function () {
                scope.stars = [];
                scope.numbers = [];
                for (var i = 0; i < scope.maxRating; i++) {
                    scope.stars.push({
                        filled: i == scope.ratingValue - 1
                    });

                    scope.numbers.push(i);
                }
            };
            
            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                ngModel.$setViewValue(scope.ratingValue);
                
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                updateStars();
            });
        }
    }
});

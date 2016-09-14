(function(){

   var app = angular.module('MultiJustRaceDirectives', []);

   app.directive('pwCheck', [function () {
            return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                        });
                });
        }
        }
    }]);

    app.directive('dateValidator', function() {
     return {
         require: 'ngModel',
         link: function (scope, elem, attr, ngModel) {
             function validate(value) {
                 if (value !== undefined && value != null) {
                     ngModel.$setValidity('badDate', true);
                     if (value instanceof Date) {
                         var d = Date.parse(value);
                         // it is a date
                         if (isNaN(d)) {
                             ngModel.$setValidity('badDate', false);
                         }
                     } else {
                         var myPattern = new RegExp(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/);
                         if (value !='' && !myPattern.test(value)) {
                             ngModel.$setValidity('badDate', false);
                         }
                     }
                 }
             }

             scope.$watch(function () {
                 return ngModel.$viewValue;
             }, validate);
         }
     };
});

    app.directive('confirmWindow', [
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.confirmWindow || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);

  

})();
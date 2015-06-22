var app = angular.module('vacature', [
    'ngRoute',
    'vacatureControllers'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'partials/add.html',
        controller: 'addVacatureCtrl'
    }).
    when('/beheer', {
        templateUrl: 'partials/beheer.html',
        controller: 'beheerCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
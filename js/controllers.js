var vacatureControllers = angular.module('vacatureControllers', [])

vacatureControllers.controller('addVacatureCtrl', function($scope, $http){
    $scope.bericht = "";
    $scope.submitVacature = function(){
        if($scope.titelVacature && $scope.tekstVacature){
            
            var saveData = $http({
                method: "post",
                url: "api/CRUD.php",
                data: {
                    titel: $scope.titelVacature,
                    tekst: $scope.tekstVacature,
                    action: "add"
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                       console.log(data);
                $scope.bericht = "Vacature is opgeslagen. Voeg er nog 1 toe?";
                $scope.titelVacature = "";
                $scope.tekstVacature = "";
            });

            
        }
        
    }
});



vacatureControllers.controller('beheerCtrl', function($scope,$http){
    $scope.data = {};
    $scope.data.loginStatus = 0;
    $scope.login = function(){
        if($scope.username && $scope.password) {
            var tryLogin = $http({
                method: "post",
                url: "api/CRUD.php",
                data: {
                    username: $scope.username,
                    password: $scope.password,
                    action: "login"
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.data.loginStatus = data.loginStatus;
                    if($scope.data.loginStatus == 0) {
                        $scope.data.loginError = "Login mislukt, verkeerde gegevens";
                    } else if ($scope.data.loginStatus == 1) {
                        $scope.data.loginError = "";
                        $scope.getVacatures();
                    }
                console.log(data);
            });
        }

     }
    $scope.getVacatures = function(){
        var requestVacatures = $http({
            method: "post",
            url: "api/CRUD.php",
            data: { action: "getVacatures"},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.data.vacatures = data;
        });
    }
    
    $scope.delVacature = function(id){
        var delVacature = $http({
            method: "post",
            url: "api/CRUD.php",
            data: {
                action: "delVacature",
                vacatureId: id
                  },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.getVacatures();
        });        
    }
    
    $scope.editVacature = function(id, titel, tekst){
        $scope.editing = 1;
        $scope.edit = {
            id: id,
            titel: titel,
            tekst: tekst
        }
        $scope.titelVacature = titel;
        $scope.tekstVacature = tekst;
    }
    
    $scope.saveChanges = function(id, titel, tekst){
        console.log(id + titel + tekst);
        var delVacature = $http({
            method: "post",
            url: "api/CRUD.php",
            data: {
                action: "editVacature",
                id: id,
                titel: titel,
                tekst: tekst
                  },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.editing = 0;
            $scope.edit = {};
            $scope.getVacatures();
        });        
    }
    
    
});

var app = angular.module('codeschunks',['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider.
      when('/addnewuser', {
        templateUrl: 'template/add_user.html',
        controller: 'addUserCtrl'
    }).
      when('/showusers', {
        templateUrl: 'template/show_users.html',
        controller: 'showUserCtrl'
      }).
      otherwise({
        redirectTo: '/showusers'
      });
});
app.controller('addUserCtrl', function($scope, $http) {
     
     $scope.addUser = function(userdata){
        
        console.log(userdata.username);
        console.log(userdata.fullname);

        $scope.message = "Form data is received";
        //$scope.msg_submitted = "";
        $http.post('index.php/adduser', userdata).success(function(){
            userdata.username = '';
            userdata.fullname = '';
            $scope.msg_submitted = "Data has been submitted";
            console.log('done');
        });
     };


});
 
 
app.controller('showUserCtrl', function($scope, $http) {
  $scope.showEditForm = false;
  $scope.getUser = function(id){

        $http.get('index.php/getuser/' + id).success(function(data, status, headers, config){

          $scope.user_data = data;
          $scope.showEditForm = true;
        });
     }

  $scope.getUsers = function(){
        $http.get('index.php/getusers').success(function(data, status, headers, config){
          $scope.received_data = data;
        });
     }
  $scope.hideRow = [];
  $scope.deleteUser = function(id, index){
    
    $http.get('index.php/deleteuser/'+id).success(function(data, status, headers, config){
         $scope.hideRow[index] = true;
        });
  }
  $scope.editUser = function(data){
        $scope.message = "Form data is received";
        
        $http.post('index.php/edituser', data).success(function(){
          $scope.message = "Update Successfully";
          $scope.showEditForm = false; 
        });
  }
  $scope.getUsers();

});
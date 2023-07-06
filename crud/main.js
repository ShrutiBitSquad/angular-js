var app = angular.module("crudApp", []);
app.controller('crudctrl', function ($scope) {
    $scope.records = [{ "name": "Shruti", "age": 29 }, { "name": "Prachi", "age": 45 }, { "name": "Trupti", "age": 29 }]
    console.log($scope.records);

    $scope.delete = function(){
        var index = this.$index
        $scope.records.splice(index,1);
    }
    $scope.adduser = function(){
        $scope.records.push({
            "name":$scope.data.name,
            "age":$scope.data.age
        })
        $scope.data.name="";
        $scope.data.age="";
    }
    $scope.edit = function(){
        var index = this.$index
        $scope.edit.index = index;
        $scope.edit.updatename=$scope.records[index].name;
        $scope.edit.age=$scope.records[index].age;
    }
    $scope.updateuser = function(){
        var index = $scope.edit.index;
        $scope.records[index] = {
            "name":$scope.edit.updatename,  
            "age":$scope.edit.age
        };
    };
});
angular.module('myApp', [])
    .controller('BookController', ['$scope', '$http', function ($scope, $http) {
        // Retrieve all books
        $http.get('http://127.0.0.1:8000/books/').then(function (response) {
            $scope.books = response.data;
        });
        $scope.books = [];
        $scope.edit = {};

        // Create a new book
        $scope.createBook = function() {
            var newBook = {
              title: $scope.title,
              author: $scope.author,
              publication_date: formatDate($scope.publicationDate)
            };
          
            $http.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
          
            $http.post('http://127.0.0.1:8000/books/', newBook).then(function(response) {
              $scope.books.push(response.data);
            });
          };
          
          function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
              console.log(document.cookie)
              var cookies = document.cookie.split(';');
              for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
                }
              }
            }
            return cookieValue;
          }
          

        function formatDate(date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return year + '-' + month + '-' + day;
        }

        $scope.editBook = function(book) {
          var index = $scope.books.indexOf(book);
          $scope.edit = {
            index: index,
            title: book.title,
            author: book.author
          };
        };
      
        $scope.updateBook = function () {
          var index = $scope.edit.index;
          var book = $scope.books[index];
          book.title = $scope.edit.title;
          book.author = $scope.edit.author;
      
          $http.put('http://127.0.0.1:8000/books/' + book.id + '/', book)
            .then(function (response) {
              $scope.books[index] = response.data;
              $scope.edit = {};
            })
            .catch(function (error) {
              console.log('Error updating book:', error);
            });
        };

        // Delete a book
        $scope.deleteBook = function (book) {
            $http.delete('http://127.0.0.1:8000/books/' + book.id + '/').then(function () {
                var index = $scope.books.indexOf(book);
                $scope.books.splice(index, 1);
            });
        };
    }]);

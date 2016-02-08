angular.module('todoApp', [])// this is a module, ng-app associatd is todoApp
  .controller('TodoListController', function() { // this is a controller in the module, it is named TodoListController
    var todoList = this;
    todoList.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}
		]; // this is a dictionary attached to this instance of todoList called todos

		todoList.status = 'play';
		todoList.play = true;



    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false}); // set text to todoList.todoText, done is false my default
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) { //foreach: an angular thing, or js thing?
        count += todo.done ? 0 : 1; // fuck u and ur ternary operator
      });
      return count;
    };

		todoList.test = function(){
			// todoList.test = "YO";
			console.log("what's up");
		};

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });

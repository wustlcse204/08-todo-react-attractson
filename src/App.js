import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apikey = "9080c03be58de416229857007d59e70f3f84e0e367dbf14a6b9be52924edfbf8"

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      input: ''
    }
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onchange(event){
    console.log(event.target.value);
    this.setState({
      input:event.target.value
    });
  }

  addTodo(event) {
    document.getElementById("newTodoForm").addEventListener("submit",function(event) {
      event.preventDefault();
        var self = this;
        var data = {
          text: self.state.input
        };

        var createRequest = new XMLHttpRequest();
          createRequest.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
              self.setState({
                todos : [...self.state.todos, JSON.parse(this.responseText)]
                });
              self.setState({
                input: ' '
              })
            } else if (this.readyState == 4) {
              console.log(this.responseText);
            }
        };
        createRequest.open("POST", "https://api.kraigh.net/todos/", true);
        createRequest.setRequestHeader("Content-type", "application/json");
        createRequest.setRequestHeader("x-api-key", apikey);
        createRequest.send(JSON.stringify(data));

    }
  )}







  // display ToDos on page

  // Handle new todo form submit.

  // display new Todo on page





   completeTodo(event) {

        console.log(event);
        var todoId = event.target.parentNode.id;
        var data = {
          completed: true
        };
        var comRequest = new XMLHttpRequest();
        comRequest.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200) {
            event.target.parentNode.classList.add("completed");
            //handlestate
          } else if (this.readyState == 4) {
            console.log(this.responseText)
          }
        }
        comRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
        comRequest.setRequestHeader("Content-type", "application/json");
        comRequest.setRequestHeader("x-api-key", apikey);
        comRequest.send(JSON.stringify(data));
        // add completed class
  }

   deleteTodo(event){
        // Handle Todo completion
        var todoId = event.target.parentNode.id;

        // event listener on button click
        // API Call,delete to remove

        var delRequest = new XMLHttpRequest();
        delRequest.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200) {
            event.target.parentNode.remove();
            //state.filter
          } else if (this.readyState == 4) {
            console.log(this.responseText);
          }
        }
        delRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
        delRequest.setRequestHeader("Content-type", "application/json");
        delRequest.setRequestHeader("x-api-key", apikey);
        delRequest.send();

        // remove from page
      }



  render() {
    return (
      <section id= "todos"> <NewTodo addTodo ={this.addTodo} input ={this.state.input} onchange={this.onChange}/>
      {this.state.todos.map((todo) =>
        <Todo key={todo.id} completed={todo.completed}
        text={todo.text} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo}/>
      )}      </section>

    );
  }

  componentDidMount(){
    var self = this;
    var listRequest = new XMLHttpRequest();
    listRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        // display Todos on page
        self.setState({todos: todos});
              } else if (this.readyState == 4){
        console.log(this.responseText);
      }
    }
    listRequest.open("GET", "https://api.kraigh.net/todos", true);
    listRequest.setRequestHeader("x-api-key",apikey);
    listRequest.send();
  }


}

export default App;

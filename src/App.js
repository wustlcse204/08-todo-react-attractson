import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apikey = "9080c03be58de416229857007d59e70f3f84e0e367dbf14a6b9be52924edfbf8"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      input: ''
    }
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    console.log(event.target.value);
    this.setState({
      input: event.target.value
    });
  }

  addTodo(event) {
      event.preventDefault();
        var self = this;
        var data = {
          text: self.state.input
        };

        var createRequest = new XMLHttpRequest();
          createRequest.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
              var temp = [...self.state.todos, JSON.parse(this.responseText)]
              temp.sort(function (a, b){

                return a.text.localeCompare(b.text);
              })
              self.setState({
                todos: temp
                })
              self.setState({
                input: ''
              });
            } else if (this.readyState === 4) {
              console.log(this.responseText);
            }
        };
        createRequest.open("POST", "https://api.kraigh.net/todos/", true);
        createRequest.setRequestHeader("Content-type", "application/json");
        createRequest.setRequestHeader("x-api-key", apikey);
        createRequest.send(JSON.stringify(data));

  }







  // display ToDos on page

  // Handle new todo form submit.

  // display new Todo on page






   deleteTodo(id){
     console.log(id);
        // Handle Todo completion
        var self = this;
        // event listener on button click
        // API Call,delete to remove

        var delRequest = new XMLHttpRequest();
        delRequest.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200) {
            //state.filter
            const remainTodos = self.state.todos.filter((todo) => {
              if (todo.id !== id){
                return todo;
              }
            });
            self.setState({ todos: remainTodos });
          } else if (this.readyState === 4) {
            console.log(this.responseText);
          }
        }
        delRequest.open("DELETE", "https://api.kraigh.net/todos/" + id, true);
        delRequest.setRequestHeader("Content-type", "application/json");
        delRequest.setRequestHeader("x-api-key", apikey);
        delRequest.send();

        // remove from page
      }



  render() {
    return (
      <section id= "todos"> <NewTodo addTodo={this.addTodo} input={this.state.input} onChange={this.onChange}/>
      {this.state.todos.map((todo) =>
        <Todo key={todo.id} id={todo.id} completed={todo.completed}
        text={todo.text} deleteTodo={this.deleteTodo}/>
      )}
      </section>

    );
  }

  componentDidMount(){
    var self = this;
    var listRequest = new XMLHttpRequest();
    listRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var todos = JSON.parse(this.responseText);
        // display Todos on page
        self.setState({todos: todos});
      } else if (this.readyState === 4){
        console.log(this.responseText);
      }
    }
    listRequest.open("GET", "https://api.kraigh.net/todos", true);
    listRequest.setRequestHeader("x-api-key",apikey);
    listRequest.send();
  }


}

export default App;

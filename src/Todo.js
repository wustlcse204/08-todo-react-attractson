import React, { Component, Fragment } from 'react';
import './Todo.css';
var apikey = "9080c03be58de416229857007d59e70f3f84e0e367dbf14a6b9be52924edfbf8"

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: this.props.completed
    }
    this.chkTodo = this.chkTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  chkTodo(event){
    console.log(this.props.id);
    var data = {
      completed: true
    }

    var self = this;

    var comRequest = new XMLHttpRequest();
    comRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status == 200) {

        self.setState({
          completed: true
        })
        //handlestate
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }
    comRequest.open("PUT", "https://api.kraigh.net/todos/" + self.props.id, true);
    comRequest.setRequestHeader("Content-type", "application/json");
    comRequest.setRequestHeader("x-api-key", apikey);
    comRequest.send(JSON.stringify(data));


  }

  deleteTodo(event){
    console.log("remove");
    console.log(this.props.id);
    this.props.deleteTodo(this.props.id);
  }



  render() {
      let classTodo = "todo";
      if (this.state.completed) {
        classTodo = "todo completed"
      }
      return (
        <article id={this.props.id} className={classTodo}>
          <button className="check" onClick={this.chkTodo}></button>
          <p>{this.props.text}</p>
          <button className="delete" onClick={this.deleteTodo}></button>
        </article>
    );
  }
}

export default Todo;

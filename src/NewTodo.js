import React, { Component, Fragment } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id="newtodo">
        <form id="newTodoForm">
          <input id="newtitle" type="text" placeholder="Type your works" value={this.props.input} onChange={this.props.onChange}/>
          <button id="newSubmit">+</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;

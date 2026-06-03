import { Component } from 'react';
import { Count } from './Count';
class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      inputValTwo: '',
      inputIndex: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeForEdit = this.handleInputChangeForEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(todo) {
    const todos = this.state.todos;
    const newTodos = todos.filter((t) => t !== todo);
    this.setState((state) => ({
      ...state,
      todos: newTodos,
    }));
  }

  handleEdit(index) {
    this.setState({
      inputIndex: index,
    });
  }

  handleInputChangeForEdit(e) {
    this.setState((state) => ({
      ...state,
      inputValTwo: e.target.value,
    }));
  }

  handleResubmit(e) {
    const currentInput = this.state.inputValTwo;
    const currentIndex = this.state.inputIndex;
    const currentTodos = [...this.state.todos];
    currentTodos[currentIndex] = currentInput;

    this.setState((state) => ({
      ...state,
      todos: currentTodos,
      inputIndex: null,
      inputValTwo: '',
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>
          All the tasks! <Count todos={this.state.todos} />
        </h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {this.state.inputIndex === index ? (
                <input
                  type="text"
                  name="task-entry"
                  value={this.state.inputValTwo}
                  onChange={this.handleInputChangeForEdit}
                />
              ) : (
                todo
              )}{' '}
              <button onClick={() => this.handleDelete(todo)}>Delete</button>
              <button
                onClick={(e) => {
                  if (this.state.inputIndex === index) {
                    this.handleResubmit(todo);
                  } else {
                    this.handleEdit(index);
                  }
                }}
              >
                {this.state.inputIndex === index ? 'Resubmit' : 'Edit'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;

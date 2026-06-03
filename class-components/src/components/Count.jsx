import { Component } from 'react';
import ClassInput from './ClassInput';

export class Count extends Component {
  render() {
    return <div>{this.props.todos.length}</div>;
  }
}

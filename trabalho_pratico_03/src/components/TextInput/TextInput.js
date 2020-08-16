import React, { Component } from 'react';

import './TextInput.css';

export default class ReadOlnyInput extends Component {
  render() {
    const { description, value } = this.props;

    return (
      <div
        id={description.toLowerCase().replace(' ', '-')}
        className="input-field col"
      >
        <input type="text" className="validate" value={value} disabled />
        <label>{description}</label>
      </div>
    );
  }
}

import React from 'react';
import './Form.css';

class ClearForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.clearTree();
  }

  render() {
    return (
      <form id='clear-form' onSubmit={this.handleSubmit}>
        <h2 class="texto">Borrar</h2>

        <input type='submit' value='Borrar'  class="button"/>
      </form>
    );
  }
}

export default ClearForm;
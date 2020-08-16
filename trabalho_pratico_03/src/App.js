import React, { Component } from 'react';

import { getCalculationsFrom } from './helpers/calculations';

import css from './App.module.css';
import TextInput from './components/TextInput/TextInput';

import M from 'materialize-css';

import './Global.css';

export default class App extends Component {
  constructor() {
    super();

    M.updateTextFields();

    this.state = {
      salary: 0,

      calculations: {
        netSalary: 0,
        baseInss: 0,
        discountInss: '0',
        baseIrpf: 0,
        discountIrpf: '0',
      },
    };
  }

  componentDidUpdate(_, previousState) {
    const { salary: oldNumber } = previousState;
    const { salary: newNumber } = this.state;

    if (oldNumber !== newNumber) {
      const calculations = getCalculationsFrom(this.state.salary);
      this.setState({ calculations });
    }
  }

  handleInputChange = (event) => {
    const newSalary = Number(event.target.value);

    this.setState({ salary: newSalary }, () => {
      const calculations = getCalculationsFrom(this.state.salary);
      this.setState({ calculations });
    });
  };

  render() {
    const { salary, calculations } = this.state;

    const {
      netSalary,
      baseInss,
      discountInss,
      baseIrpf,
      discountIrpf,
    } = calculations;

    return (
      <div>
        <h1 className={css.center}>Calculo de Salário</h1>

        <div className="row container">
          <div className="input-field col s12">
            <input
              type="number"
              step="0.01"
              className="validate"
              value={salary}
              onChange={this.handleInputChange}
            />
            <label>Digite o seu salário bruto</label>
          </div>
        </div>

        <div className="row container">
          <div className="col s12 m4">
            <TextInput
              className="salary"
              description="Salário Liquido"
              value={netSalary}
            />
          </div>
        </div>
        <div className="row container">
          <div className="col s12 m3">
            <TextInput description="Base INSS" value={baseInss} />
          </div>
          <div className="col s12 m3">
            <TextInput description="Desconto INSS" value={discountInss} />
          </div>
          <div className="col s12 m3">
            <TextInput description="Base IRPF" value={baseIrpf} />
          </div>
          <div className="col s12 m3">
            <TextInput description="Desconto IRPF" value={discountIrpf} />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './coffeeShop.css';
import Cafe from '../../Files/Photos/Cafe.jpeg';

class CoffeeShop extends Component {
  state = {
    selectedCoffee: null,
    coffees: [],
  };

  componentDidMount() {
    if (!navigator.onLine) {
      const storedCoffees = localStorage.getItem('coffees');
      if (storedCoffees) {
        this.setState({ coffees: JSON.parse(storedCoffees) });
      }
    } else {
      fetch('http://localhost:3001/cafes')
        .then(response => response.json())
        .then(data => {
          this.setState({ coffees: data });
          localStorage.setItem('coffees', JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error fetching coffees:', error);
        });
    }
  }

  handleCoffeeClick = (coffee) => {
    if (!navigator.onLine) {
      const storedCoffee = localStorage.getItem('selectedCoffee');
      if (storedCoffee) {
        this.setState({ selectedCoffee: JSON.parse(storedCoffee) });
      }
    } else {
      fetch(`http://localhost:3001/cafes/${coffee.id}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ selectedCoffee: data });
          localStorage.setItem('selectedCoffee', JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error fetching selected coffee:', error);
        });
    }
  };

  renderCoffeeDetails = () => {
    const { selectedCoffee } = this.state;

    if (selectedCoffee) {
      return (
        <table>
          <tbody>
            <tr>
              <strong className="coffee-detail-name">{selectedCoffee.nombre}</strong>
            </tr>
            <tr>
              <td className="coffee-detail-text">{selectedCoffee.fecha_cultivo}</td>
            </tr>
            <tr>
              <td>
                <img className="coffee-image" src={selectedCoffee.imagen} alt={selectedCoffee.nombre} />
              </td>
            </tr>
            <tr>
            Notas:
            </tr>
            <tr>
              <td className="coffee-detail-name">{selectedCoffee.notas}</td>
            </tr>
            <tr>
              <td className="coffee-detail-text">
                <strong>Cultivado a una altura de:</strong>
              </td>
            </tr>
            <tr>
              <strong className="coffee-detail-name">{selectedCoffee.altura} msnm</strong>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return ;
    }
  };

  render() {
    const { coffees } = this.state;

    return (
      <div className="coffee-encabezado">
        <h2>El aroma mágico</h2>
        <img src={Cafe} alt="Cafe" />
        <div className="coffee-Body">
          <table className="coffee-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map((coffee) => (
                <tr
                  key={coffee.id}
                  className={`coffee-row ${this.state.selectedCoffee === coffee ? 'selected' : ''}`}
                  onClick={() => this.handleCoffeeClick(coffee)}
                >
                  <td>{coffee.id}</td>
                  <td>{coffee.nombre}</td>
                  <td>{coffee.tipo}</td>
                  <td>{coffee.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="coffee-details">
            {this.renderCoffeeDetails()}
          </div>
        </div>
      </div>
    );
  }
}

export default CoffeeShop;

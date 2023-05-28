import React, { Component } from 'react';
import './coffeeShop.css';
import Cafe from '../../Files/Photos/Cafe.png';
import enTranslations from '../../Translations/en.json';
import esTranslations from '../../Translations/es.json';

class CoffeeShop extends Component {
  state = {
    selectedCoffee: null,
    coffees: [],
    currentLanguage: 'en',
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

    const userLanguage = navigator.language.substring(0, 2);
    if (userLanguage === 'es') {
      this.setState({ currentLanguage: 'es' });
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
    const { selectedCoffee, currentLanguage } = this.state;
    const translations = currentLanguage === 'en' ? enTranslations : esTranslations;

    if (selectedCoffee) {
      const date = new Date(selectedCoffee.fecha_cultivo);
      const formattedDate = date.toLocaleDateString(currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return (
        <div className="coffee-details">
        <table>
          <tbody>
            <tr>
              <strong className="coffee-detail-name">{selectedCoffee.nombre}</strong>
            </tr>
            <tr>
              <td className="coffee-detail-text">{formattedDate}</td>
            </tr>
            <tr>
              <td>
                <img className="coffee-image" src={selectedCoffee.imagen} alt={selectedCoffee.nombre} />
              </td>
            </tr>
            <tr>
              {translations.notes}
            </tr>
            <tr>
              <td className="coffee-detail-name">{selectedCoffee.notas}</td>
            </tr>
            <tr>
              <td className="coffee-detail-text">
                <strong>{translations.grown}</strong>
              </td>
            </tr>
            <tr>
              <strong className="coffee-detail-name"> {selectedCoffee.altura} {translations.msnm}</strong>
            </tr>
          </tbody>
        </table>
        </div>
      );
    } else {
      return (
        <div className="no-coffee-selected">
        </div>
      );
    }
  };

  renderContactInfo = () => {
    const { currentLanguage } = this.state;
    const translations = currentLanguage === 'en' ? enTranslations : esTranslations;

    return (
      <div className="contact-info">
        <p>
          {translations.contactUs}:
          +57 3102105253 - info@elaromamagico.com - @elaromamagico
        </p>
      </div>
    );
  };

  render() {
    const { coffees, currentLanguage } = this.state;
    const translations = currentLanguage === 'en' ? enTranslations : esTranslations;

    return (
      <div className="PrincipalContainer">
        <div className="coffee-encabezado">
          <div className="coffee-title">
            <h1>{translations.title}</h1>
          </div>
          <div className="Image">
            <hr />
            <img src={Cafe} alt="Cafe" className="img-fluid" />
            <hr />
          </div>
        </div>
        <div className="coffee-Body">
          <table className="coffee-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{translations.name}</th>
                <th>{translations.type}</th>
                <th>{translations.region}</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map((coffee) => (
                <tr
                  key={coffee.id}
                  className={`coffee-row ${this.state.selectedCoffee === coffee ? 'selected' : ''}`}
                  onClick={() => this.handleCoffeeClick(coffee)}
                >
                  <td><strong>{coffee.id}</strong></td>
                  <td>{coffee.nombre}</td>
                  <td>{coffee.tipo}</td>
                  <td>{coffee.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {this.renderCoffeeDetails()}
        </div>
        <div className="coffee-footer">
          {this.renderContactInfo()}
        </div>
      </div>
    );
  }
}

export default CoffeeShop;

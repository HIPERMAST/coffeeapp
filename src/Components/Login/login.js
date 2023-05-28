import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import LoginPhoto from "../../Files/Photos/Cafe.png";
import enTranslations from "../../Translations/en.json";
import esTranslations from "../../Translations/es.json";

const loginUrl = "http://localhost:3001/login";

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
    errorMessage: "",
    currentLanguage: navigator.language.substring(0, 2),
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  signIn = () => {
    const credentials = {
      login: this.state.form.username,
      password: this.state.form.password,
    };

    axios
      .post(loginUrl, credentials)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.status);
          console.log(response.data.message);
          const role = "Administrador";
          this.props.actualizarRole(role);
        }
      })
      .catch(() => {
        this.setState({ errorMessage: "Las credenciales proporcionadas son incorrectas." });
      });
  };

  changeLanguage = (language) => {
    this.setState({ currentLanguage: language });
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
    const { currentLanguage } = this.state;
    const translations = currentLanguage === 'en' ? enTranslations : esTranslations;

    return (
      <div className="PrincipalContainer">
        <div className="coffee-encabezado">
          <h1 className="title" style={{ textAlign: "left" }}>
            {translations.title}
          </h1>
          <div className="Image">
            <hr />
            <img src={LoginPhoto} alt="BumpClass" className="img-fluid" />
            <hr />
          </div>
        </div>
        <div className="LoginPage">
          <div className="LoginForm">
            <h1 className="LoginTitle">
              {translations.loginTitle}
            </h1>
            <div className="form-groups">
            <div className="form-group">
              <label className="login-label">{translations.username}</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder={translations.loginPlaceholder}
                value={this.state.form.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="login-label">{translations.password}</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder={translations.passwordPlaceholder}
                value={this.state.form.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="button-container">
              <button className="btn-primary" onClick={this.signIn}>
                <strong>{translations.loginButton}</strong>
              </button>
              <button className="btn-cancel">
                <strong>{translations.cancelButton}</strong>
              </button>
            </div>
            {this.state.errorMessage && (
              <div className="error-message">{this.state.errorMessage}</div>
            )}
          </div>
          </div>
        </div>
        <div className="coffee-footer">
          {this.renderContactInfo()}
        </div>
      </div>
    );
  }
}

export default Login;

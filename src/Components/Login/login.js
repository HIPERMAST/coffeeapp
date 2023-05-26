import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import LoginPhoto from "../../Files/Photos/Cafe.jpeg";

const loginUrl = "http://localhost:3001/login";

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
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

          // Perform other operations after successful authentication
        }
        if (response.status === 401) {
          console.log(response.data.status);
          console.log(response.data.message);

          // Handle failed authentication case
        }
      })
      .catch((error) => {
        const message = `Error during authentication: ${error}`;
        console.error(message);

        // Handle request error
      });
  };

  render() {
    return (
      <div className="PrincipalContainer">
        <div className="coffee-encabezado">
          <h1 className="title" style={{ textAlign: "left" }}>
            El aroma magico
          </h1>
          <div className="Image">
            <img src={LoginPhoto} alt="BumpClass" className="img-fluid" />
          </div>
        </div>
        <div className="LoginPage">
          <div className="LoginForm">
            <h1 className="title" style={{ textAlign: "left" }}>
              Inicio de Sesión
            </h1>
            <div className="form-group">
              <label className="login-label">Login</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Email"
                value={this.state.form.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={this.state.form.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="button-container">
              <button className="btn-primary" onClick={this.signIn}>
              <strong>Log in </strong>
              </button>
              <button className="btn-cancel">
                <strong>Cancel </strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

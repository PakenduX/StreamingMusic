import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

export default class SignUp extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      error: '',
      isSignUp: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    };

    axios.post('http://localhost:8000/signUp', data)
        .then(res => {
          if(res.data.status === 'error')
            this.setState({error: <div className="alert alert-danger" role="alert">{res.data.message}</div>});
          else {
            this.setState({isSignUp: true});
            alert('Your account has been created successfully');
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {

    if(!this.state.isSignUp)

      return (
          <div className="container">
            <div className="row" style={{marginTop: '50px'}}>
              <div className="col-md-3"></div>
              <div className="col-md-5">
                { this.state.error }
                <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>
                  <p className="h4 mb-4">Sign up</p>
                  <div className="form-row mb-4">
                    <div className="col">
                      <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          placeholder="First name"
                          onChange={(e) => this.setState({firstname: e.target.value})}
                      />
                    </div>
                    <div className="col">
                      <input
                          type="text"
                          id="last name"
                          className="form-control"
                          placeholder="Last name"
                          onChange={(e) => this.setState({lastname: e.target.value})}
                      />
                    </div>
                  </div>

                  <input
                      type="email"
                      id="email"
                      className="form-control mb-4"
                      placeholder="E-mail"
                      onChange={(e) => this.setState({email: e.target.value})}
                  />
                    <input
                        type="text"
                        id="username"
                        className="form-control mb-4"
                        placeholder="Username"
                        onChange={(e) => this.setState({username: e.target.value})}
                    />

                      <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          aria-describedby="passwordBlock"
                          onChange={(e) => this.setState({password: e.target.value})}
                      />
                        <small id="passwordBlock" className="form-text text-muted mb-4">
                          At least 8 characters
                        </small>

                        <button className="btn btn-info my-4 btn-block" type="submit">Register</button>

                </form>
              </div>
            </div>
          </div>
      );
    else
      return <Redirect to="/"/>
  }
}
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";


class SignIn extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
            logged: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password,
        };

        axios.post('http://mamadembele.fr:8000', data)
            .then(res => {
                if(res.data.status === 'error')
                    this.setState({error: <div className="alert alert-danger" role="alert">{res.data.message}</div>});
                else {
                    this.setState({logged: true});
                    this.props.cookies.set('username', this.state.username, { path: '/' });
                    this.props.cookies.set('isConnected', true, { path: '/' });
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if(!this.state.logged)
            return (
                <div className="container">
                    <div className="row" style={{marginTop: '50px'}}>
                        <div className="col-md-3"></div>
                        <div className="col-md-5">
                            { this.state.error }
                            <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>
                                <p className="h5 mb-4">Sign in to SM and start streaming</p>

                                <input
                                    type="text"
                                    id="username"
                                    value={this.state.username}
                                    className="form-control mb-4"
                                    placeholder="Username"
                                    onChange={(e) => this.setState({username: e.target.value})}
                                />

                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control mb-4"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(e) => this.setState({password: e.target.value})}
                                    />

                                        <button
                                            className="btn btn-info btn-block my-4"
                                            type="submit">
                                            Sign in
                                        </button>

                                        <p>Not registered yet ?
                                            <Link to="/signUp">Register</Link>
                                        </p>

                            </form>
                        </div>
                    </div>
                </div>
            );
        else
            return (<Redirect to={`/playlists`}/>);
    }
}

export default withCookies(SignIn);

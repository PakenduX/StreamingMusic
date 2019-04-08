import React from 'react';
import {withCookies, Cookies } from "react-cookie";
import { Redirect } from 'react-router-dom';
import {instanceOf} from "prop-types";

class Logout extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.unsetCookie = this.unsetCookie.bind(this);
    }
    unsetCookie = () => {
        this.props.cookies.remove('isConnected');
        this.props.cookies.remove('username');
    };

    render() {
        this.unsetCookie();
        return(
            <Redirect to="/"/>
        );
    }

}

export default withCookies(Logout);
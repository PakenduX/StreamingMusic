import React from 'react';
import axios from "axios";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import qs from "query-string";
import { Redirect } from 'react-router-dom';

class Upload extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            file: '',
            playlist: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).plId,
            username: props.cookies.cookies.username,
            userId: '',
            isUploaded: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let data = new FormData();
        data.append('file', this.state.file);
        data.append('playlist', this.state.playlist);
        data.append('user', this.state.userId);

        axios.post('http://mamadembele.fr:8000/music/create', data)
            .then(res => {
                if(res.data.status === 'error')
                    this.setState({error: <div className="alert alert-danger" role="alert">{res.data.message}</div>});
                else
                    this.setState({isUploaded: true});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get(`http://mamadembele.fr:8000/users/${this.state.username}`)
            .then(res => {
                this.setState({userId: res.data.id});

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        return(

            this.state.isUploaded ?
                <Redirect to="/playlists"/> :

                <div className="container">
                    <div className="row" style={{marginTop: '50px'}}>
                        {this.state.error}
                        <div className="col-md-3"></div>
                        <div className="col-md-5">
                            <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>
                                <p className="h5 mb-4">Upload your song</p>

                                <input
                                    type="file"
                                    id="file-with-current"
                                    className="input-default-js"
                                    onChange={(e) => this.setState({file: e.target.files[0]})}
                                />

                                <label
                                    className="label-for-default-js rounded-right mb-3"
                                    htmlFor="file-with-current">
                                    <span className="span-choose-file">Choose file</span>

                                    <div className="float-right span-browse">Browse</div>

                                </label>

                                <button
                                    className="btn btn-info btn-block my-4"
                                    type="submit">
                                     Upload
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
        );
    }

}


export default withCookies(Upload);
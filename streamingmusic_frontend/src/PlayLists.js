import React from 'react';
import AffichagePlaylist from "./AffichagePlaylist";
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class PlayLists extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            playlists: [],
            username: props.cookies.cookies.username,
            name: '',
            user: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let data = {
            name: this.state.name,
            user: this.state.user
        };
        console.log(data);

        axios.post('http://localhost:8000/playlist/create', data)
            .then(res => {
               window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/users/${this.state.username}`)
            .then(res => {
                this.setState({user: res.data.id});
                axios.get(`http://localhost:8000/playlist/${res.data.id}`)
                    .then(response => {
                        this.setState({ playlists: response.data });
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        let playlists = [];

        Object.values(this.state.playlists).map((pl) =>
            playlists.push(<div key={pl.id} className="col-md-3"><AffichagePlaylist pl={pl}/></div>)
        );


        return(
            <div className='container'>
                <div className="row" style={{ marginTop : '50px'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4 h1">Your playlists</div>
                </div>
                <div className="row" style={{ marginTop : '20px'}}>
                    {playlists}
                </div>
                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        <span to="" className="h3">Add a new playlist</span>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '10px'}}>
                    <div className="col-md-5"></div>
                    <form className="col-md-5" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            id="name"
                            className="form-control mb-4"
                            placeholder="Your new playlist name"
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default withCookies(PlayLists);
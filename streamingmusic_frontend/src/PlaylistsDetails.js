import React from 'react';
import qs from "query-string";
import axios from 'axios';
import MusicComponent from "./MusicComponent";

class PlaylistsDetails extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            plName: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).plName,
            plId: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).plId,
            musics: []
        };
    }

    componentDidMount() {
        axios.get(`http://mamadembele.fr:8000/music/${this.state.plId}`)
            .then(res => {
                this.setState({musics: res.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let musics = [];

        Object.values(this.state.musics).map((music) =>
            musics.push(
                <div key={music.id} className="col-md-4">
                    <MusicComponent music={music} />
                </div>
            )
        );
        return(
            <div className='container'>
                <div className="row" style={{ marginTop : '50px'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-4 h1">{this.state.plName}</div>
                </div>
                <div className="row" style={{ marginTop : '20px'}}>
                    {
                        musics.length === 0 ?
                            <div className="col-md-4 h2">Empty</div>:
                            musics
                    }
                </div>
            </div>
        );
    }

}

export default PlaylistsDetails;
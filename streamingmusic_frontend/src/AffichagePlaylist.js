import React from 'react';
import musicImg from './images/music.png';
import { Link } from "react-router-dom";

class AffichagePlaylist extends React.Component{

    constructor(props){
        super(props);
    }

    render() {

        return(
            <div className="card">
                <img className="card-img-top" src={ musicImg } alt="Music" />
                    <div className="card-body">
                        <h4 className="card-title"><a>{this.props.pl.name}</a></h4>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="row">
                            <Link to={`/playlist/details?plName=${this.props.pl.name}&plId=${this.props.pl.id}`} className="btn btn-info">Open</Link>
                            <Link to={`/playlist/upload?plName=${this.props.pl.name}&plId=${this.props.pl.id}`} className="btn btn-success">Add a music</Link>
                        </div>
                    </div>
            </div>
        );
    }

}
export default AffichagePlaylist;
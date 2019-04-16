import React from 'react';
import musicImg from './images/music.png';
import { Link } from "react-router-dom";
import axios from 'axios';

class AffichagePlaylist extends React.Component{

    constructor(props){
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete(id){

        if(window.confirm('Are you sure you want to delete your playlist ?'))
            axios.delete(`http://mamadembele.fr:8000/playlist/delete/${id}`)
                .then(res => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });

    }

    render() {

        return(
            <div className="card">
                <img className="card-img-top" src={ musicImg } alt="Music" />
                    <div className="card-body">
                        <h4 className="card-title"><a>{this.props.pl.name}</a></h4>
                        <p className="card-text">Open your playlist and enjoy!</p>
                        <div className="row">
                            <Link to={`/playlist/details?plName=${this.props.pl.name}&plId=${this.props.pl.id}`} className="btn btn-info">Open</Link>
                            <Link to={`/playlist/upload?plName=${this.props.pl.name}&plId=${this.props.pl.id}`} className="btn btn-success">Add a music</Link>
                            <button className="btn btn-danger" onClick={() => this.delete(this.props.pl.id)}>Delete</button>
                        </div>
                    </div>
            </div>
        );
    }

}
export default AffichagePlaylist;
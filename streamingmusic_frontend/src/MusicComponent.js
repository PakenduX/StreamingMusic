import React from 'react';
import './assets/css/style.scss';

class MusicComponent extends React.Component{

    constructor(props){
        super(props);

        this.onPlay = this.onPlay.bind(this);
        this.controlPanel = React.createRef();
        this.infoBar = React.createRef();
        this.audio = new Audio(props.music.file);

    }

    onPlay(e){
        e.preventDefault();
        let controlPanelObj = this.controlPanel.current,
            infoBarObj = this.infoBar.current;
        Array.from(controlPanelObj.classList).find((element) => {
            if(element !== "active"){
                let promise = this.audio.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                    }).catch(error => {
                        console.log(error);
                    });
                }
                controlPanelObj.classList.add('active')
            }else{
                this.audio.pause();
                controlPanelObj.classList.remove('active');
            }
        });

        Array.from(infoBarObj.classList).find(function(element){
            return element !== "active" ?
                infoBarObj.classList.add('active') :
                infoBarObj.classList.remove('active');
        });
    }

    render() {
        return(
            <div style={{marginTop : '20px'}}>
                <div className="player">
                    <div id="info" className="info" ref={this.infoBar}>
                        <span className="artist">Unknown</span>
                        <span className="name">{this.props.music.title}</span>
                        <div className="progress-bar">
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div id="control-panel" className="control-panel" ref={this.controlPanel}>
                        <div className="album-art"></div>
                        <div className="controls">
                            <div className="prev"></div>
                            <div id="play" className="play" onClick={this.onPlay}></div>
                            <div className="next"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MusicComponent;
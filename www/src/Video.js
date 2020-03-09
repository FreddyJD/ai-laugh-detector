import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'

export default class Video extends React.Component {
    state = {
        loaded: false
    }
    componentDidMount() {
        const { videoId } = this.props.match.params
        axios.post(`http://localhost:3001/video/${videoId}`)
            .then(res => {
                console.log('resolved ')
                this.setState({ loaded: videoId });
            })
    }

    render() {
        return (
            <ul>
                <center>

                    <div id="wrapper">
                        <h1 class="chrome">Laugh AI</h1>
                        <h3 class="dreams">Gun</h3>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />


                    {this.state.loaded ?
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${this.state.loaded}`}
                            playing
                            onProgress={function (res) {
                                let videoId = this.url.split('/watch?v=');
                                axios.get(`http://localhost:3001/video/${videoId[1]}/${res.playedSeconds}`)
                            }}

                        />
                        : <>
                            <iframe src="https://giphy.com/embed/l3q2tkUqM3SangJj2" width="480" height="238" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/fallontonight-jimmy-fallon-donald-trump-l3q2tkUqM3SangJj2"></a></p>
                            Loading video... here is a gif </>}

                </center>
            </ul>
        )
    }
}

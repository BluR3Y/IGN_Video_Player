import React from "react";

import { StyledQueueVideo, StyledVideoQueue } from "./styles/VideoQueue.styled";

class QueueVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedVideo: false,
        }
    }
    render() {
        return(<StyledQueueVideo>

        </StyledQueueVideo>);
    }
}

export default class VideoQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: this.props.videos,
            activeVideo: this.props.videos[0]
        }
    }

    componentDidMount() {
        console.log(this.state.videos)
    }

    render() {
        return(<StyledVideoQueue>
            <div className="videoList">
                <QueueVideo videoInfo={this.state.activeVideo}/>
            </div>
        </StyledVideoQueue>);
    }
}
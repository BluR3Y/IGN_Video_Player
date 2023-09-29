import React from "react";

import { StyledQueueVideo, StyledVideoQueue } from "./styles/VideoQueue.styled";
import PreviewPlayer from './PreviewPlayer';

class QueueVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedVideo: false,
        }
    }

    convertTimestamp = (timestamp) => {
        var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp);
        return(`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`);
    }

    render() {
        const { videoInfo } = this.props;
        const { convertTimestamp } = this;
        return(<StyledQueueVideo>
            <PreviewPlayer videoInfo={videoInfo} />
            <div className="videoInfo">
                <h1>{videoInfo['metadata'].title}</h1>
                <h2>Published: <span>{convertTimestamp(videoInfo['metadata'].publishDate)}</span></h2>
            </div>
        </StyledQueueVideo>);
    }
}

export default class VideoQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: this.props.videos,
            activeVideo: this.props.videos[props.activeVideoIndex]
        }
    }

    componentDidMount() {
        console.log(this.state.videos.length)
    }

    render() {
        return(<StyledVideoQueue>
            <div className="videoList">
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
                <QueueVideo videoInfo={this.state.activeVideo}/>
            </div>
        </StyledVideoQueue>);
    }
}
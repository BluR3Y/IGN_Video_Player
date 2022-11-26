import React from "react";

import { Controls, Header, NotificationBox, ShareVideoBtn, StyledVideoPlayer, Thumbnail } from "./styles/VideoPlayer.styled";

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoInfo: this.props.videoInfo,
            activeThumbnail: null,
            activeVideo: (props.videoInfo['assets'].length ? props.videoInfo['assets'][0] : null),
            autoPlay: false,
            idleTimer: null,
            isIdle: false,
            videoPlayer: React.createRef(),
            progressBar: React.createRef(),
            volumeSlider: React.createRef(),
            media: React.createRef()
        }
    }

    componentDidMount() {
        this.setActiveThumbnail();
        
        window.addEventListener('resize', this.setActiveThumbnail);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setActiveThumbnail);
    }

    setActiveThumbnail = () => {
        const { videoPlayer, videoInfo } = this.state;
        var pixelCount = videoPlayer.current.clientHeight * videoPlayer.current.clientWidth;
        var thumbnails = videoInfo['thumbnails'];
        var activeThumbnail = thumbnails[0];
        for(var i = 0; i < thumbnails.length; i++) {
            if(thumbnails[i].height + thumbnails[i].width > pixelCount)
                break;
            activeThumbnail = thumbnails[i];
        }
        this.setState({ activeThumbnail });
    }

    HH_MM_SS = seconds => {
        return (seconds < 3600 ? 
            new Date(seconds * 1000).toISOString().substring(14, 19) :
            new Date(seconds * 1000).toISOString().substring(11, 16)
        );
    }

    render() {
        const { videoInfo, activeThumbnail, activeVideo, autoPlay, idleTimer, isIdle, media, videoPlayer, volumeSlider } = this.state;

        return(<StyledVideoPlayer ref={videoPlayer}>
            <Header>
                <a>{videoInfo.metadata.title}</a>
                <ShareVideoBtn/>
                <NotificationBox/>
            </Header>
            <Thumbnail>

            </Thumbnail>
            <video ref={media} >
                <source
                    src={activeVideo.url}
                    type={`video/${activeVideo.url.split('.').pop()}`}
                />
            </video>
            <Controls>
                
            </Controls>
        </StyledVideoPlayer>);
    }
}
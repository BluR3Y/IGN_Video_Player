import React from "react";

import { AutoPlayBtn, Controls, Header, ShareVideoBtn, StyledVideoPlayer, Thumbnail } from "./styles/VideoPlayer.styled";

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoInfo: this.props.videoInfo,
            activeThumbnail: null,
            activeVideo: (props.videoInfo['assets'].length ? props.videoInfo['assets'][0] : null),
            isActive: false,
            isPlaying: false,
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

    startVideo = () => {
        this.setState({ isActive: true });
        this.playPauseMedia();
    }

    playPauseMedia = () => {
        const { media } = this.state;

        if(media.current.paused)
            media.current.play();
        else
            media.current.pause();
        
        this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
    }

    toggleVolume = () => {

    }

    updateVolume = () => {

    }

    updateElapsedTime = () => {

    }

    setVideoProgress = () => {

    }

    copyToClipBoard = () => {

    }

    handleIdle = () => {

    }

    HH_MM_SS = seconds => {
        return (seconds < 3600 ? 
            new Date(seconds * 1000).toISOString().substring(14, 19) :
            new Date(seconds * 1000).toISOString().substring(11, 16)
        );
    }

    render() {
        const { videoInfo, activeThumbnail, activeVideo, autoPlay, media, videoPlayer, volumeSlider, isActive, isPlaying } = this.state;
        const { startVideo, playPauseMedia, toggleVolume, updateVolume, updateElapsedTime, setVideoProgress, copyToClipBoard, handleIdle} = this;

        return(<StyledVideoPlayer ref={videoPlayer}>
            <Header isActive={isActive} >
                <a href={activeVideo.url}>{videoInfo.metadata.title}</a>
                <ShareVideoBtn onClick={copyToClipBoard} />
            </Header>
            <Thumbnail 
                thumbnail={activeThumbnail}
                duration={this.HH_MM_SS(videoInfo.metadata.duration)}
                onClick={startVideo}
                isActive={isActive}
            />
            <video ref={media} onClick={playPauseMedia}>
                <source
                    src={activeVideo.url}
                    type={`video/${activeVideo.url.split('.').pop()}`}
                />
            </video>
            <Controls isActive={isActive}>
                <AutoPlayBtn 
                    isPlaying={isPlaying} 
                    isActive={isActive} 
                    autoPlay={autoPlay} 
                    onClick={() => this.setState(prevState => ({ autoPlay: !prevState.autoPlay }))}
                />

            </Controls>
        </StyledVideoPlayer>);
    }
}
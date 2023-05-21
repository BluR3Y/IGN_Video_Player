import React from "react";

import { 
    AutoPlayBtn, 
    Controls, 
    Header, 
    MainControls, 
    MiniPlayerBtn, 
    RangeSlider, 
    ResolutionForm, 
    ResolutionInput, 
    ResolutionSelection, 
    ShareVideoBtn, 
    StyledLoadingVideoPlayer, 
    StyledVideoPlayer, 
    StyledVideoPlayerLoading, 
    TheaterModeBtn, 
    Thumbnail, 
    ToggleFullScreen, 
    TogglePlayPause, 
    ToggleVolume 
} from "./styles/VideoPlayer.styled";

import Standard_Definition from '../assets/icons/standard_definition';
import High_Definition from '../assets/icons/high_definition';

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoInfo: this.props.videoInfo,
            activeThumbnail: null,
            activeVideoIndex: 0,
            isActive: false,
            isPlaying: false,
            isMuted: true,
            autoPlay: false,
            idleTimer: null,
            isIdle: false,
            volume: 1,
            isLoaded: false,
            videoElapsedTime: 0,
            resolutionMenuOpen: false,
            miniPlayerMode: false,
            theaterMode: false,
            fullscreenMode: false,
            videoPlayer: React.createRef(),
            progressBar: React.createRef(),
            volumeSlider: React.createRef(),
            media: React.createRef()
        }
    }

    componentDidMount() {
        if(this.state.videoInfo === null)
            return;

        this.setActiveThumbnail();
        const { isActive, autoPlay } = this.state;
        if(!isActive && autoPlay)
            this.startVideo();

        window.addEventListener('resize', this.setActiveThumbnail);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setActiveThumbnail);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevState.activeVideoIndex !== this.state.activeVideoIndex)
            this.handleActiveVideoIndexChange(prevState.videoElapsedTime, prevState.isPlaying);
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
        const { media, videoPlayer } = this.state;
        var playMedia = media.current.play();
        if(playMedia !== undefined) {
            playMedia.then(_ => {
                videoPlayer.current.addEventListener('mousemove', this.handleIdle);
                this.setState({ isActive:true });
            })
            .catch(err => {
                console.error('Error While Starting Video: ', err);
            })
        }
    }

    playPauseMedia = () => {
        const { media } = this.state;

        if(media.current.paused) {
            var playMedia = media.current.play();
            if(playMedia !== undefined) {
                playMedia
                .catch(err => {
                    console.error('Error While Playing Video: ', err);
                })
            }
        }else{
            media.current.pause()
        }
    }

    toggleVolume = () => {
        this.setState(prevState => ({ isMuted: !prevState.isMuted }));
    }

    setVolume = (event) => {
        const { media } = this.state;
        media.current.volume = event.currentTarget.value;
    }

    handleVolumeChange = (event) => {
        const { volume, muted } = event.currentTarget;
        this.setState({ volume, isMuted: muted });
    }

    updateElapsedTime = (event) => {
        const videoElapsedTime = event.currentTarget.currentTime;
        this.setState({ videoElapsedTime });
    }

    setVideoProgress = (event) => {
        const { media } = this.state;
        media.current.currentTime = event.currentTarget.value;
    }

    setResolution = (event) => {
        var activeVideoIndex = event.target.value;
        this.setState({ activeVideoIndex, resolutionMenuOpen: false, isLoaded: false });
    }

    handleActiveVideoIndexChange = (prevElapsedTime, prevIsPlaying) => {
        const { media } = this.state;
        media.current.load();
        media.current.currentTime = prevElapsedTime;
        if(prevIsPlaying)
            media.current.play();
    }

    handleLoadedVideo = () => {
        const { videoElapsedTime } = this.state;

        this.setState({ isLoaded: true });
    }

    copyToClipBoard = () => {

    }

    toggleFullScreen = () => {
        const { videoPlayer } = this.state;
        if(document.fullscreenElement) {
            document.exitFullscreen()
            .then(() => this.setState({ fullscreenMode:false }))
            .catch((err) => console.error('Error While Exiting Full Screen: ',err));
        }else{
            videoPlayer.current.requestFullscreen()
            .then(() => this.setState({ fullscreenMode: true }))
            .catch((err) => console.error('Error While Entering Full Screen: ', err));
        }
    }

    handleIdle = () => {    // buggy
        // var { idleTimer, isIdle } = this.state;

        // clearTimeout(idleTimer);
        // isIdle = false;
        // idleTimer = setTimeout(() => {
        //     this.setState({ isIdle: true });
        // }, 5000);
        // this.setState({ idleTimer, isIdle });
    }

    HH_MM_SS = seconds => {
        return (seconds < 3600 ? 
            new Date(seconds * 1000).toISOString().substring(14, 19) :
            new Date(seconds * 1000).toISOString().substring(11, 16)
        );
    }

    render() {
        const { 
            videoInfo,
            activeThumbnail, 
            activeVideoIndex, 
            autoPlay, 
            media, 
            videoPlayer, 
            volumeSlider, 
            isActive, 
            theaterMode, 
            isPlaying, 
            miniPlayerMode, 
            videoElapsedTime, 
            isIdle, 
            volume, 
            isMuted, 
            resolutionMenuOpen, 
            isLoaded,
            fullscreenMode
        } = this.state;
        const { 
            startVideo, 
            playPauseMedia, 
            setVolume, 
            updateElapsedTime, 
            setVideoProgress, 
            copyToClipBoard, 
            toggleVolume, 
            handleLoadedVideo, 
            handleVolumeChange, 
            HH_MM_SS, 
            setResolution,
            toggleFullScreen
        } = this;

        if(videoInfo === null) {
            return <StyledLoadingVideoPlayer/>
        }

        return(<StyledVideoPlayer 
            ref={videoPlayer} 
            idle={isIdle}   
            isLoaded={isLoaded}
            miniPlayerMode={miniPlayerMode}
            aspectRatio={videoInfo['assets'][activeVideoIndex].width / videoInfo['assets'][activeVideoIndex].height}
        >
            <Header isActive={isActive} >
                <a href={videoInfo['assets'][activeVideoIndex].url}>{videoInfo.metadata.title}</a>
                <ShareVideoBtn onClick={copyToClipBoard} />
            </Header>
            <Thumbnail 
                thumbnail={activeThumbnail}
                duration={this.HH_MM_SS(videoInfo.metadata.duration)}
                onClick={startVideo}
                isActive={isActive}
            />
            {!isLoaded && <StyledVideoPlayerLoading/>}
            <video 
                ref={media} 
                onClick={playPauseMedia}
                onTimeUpdate={updateElapsedTime} 
                onVolumeChange={handleVolumeChange}
                muted={isMuted}
                onLoadedData={handleLoadedVideo}
                onPlay={() => this.setState({ isPlaying: true })}
                onPause={() => this.setState({ isPlaying: false })}
            >
                <source
                    src={videoInfo['assets'][activeVideoIndex].url}
                    type={`video/${videoInfo['assets'][activeVideoIndex].url.split('.').pop()}`}
                />
            </video>
            <Controls isActive={isActive}>
                <AutoPlayBtn 
                    isPlaying={isPlaying} 
                    isActive={isActive} 
                    autoPlay={autoPlay} 
                    onClick={() => this.setState(prevState => ({ autoPlay: !prevState.autoPlay }))}
                />
                <RangeSlider
                    min='0'
                    max={videoInfo.metadata.duration}
                    step={videoInfo.metadata.duration / 1000}
                    value={videoElapsedTime}
                    onInput={setVideoProgress}
                    onMouseDown={() => media.current.pause()}
                    onMouseUp={() => media.current.play()}
                    className='progressBar'
                />
                <MainControls>
                    <div className="leftControls">
                        <TogglePlayPause isPlaying={isPlaying} toggle={playPauseMedia}/>
                        <div className="volumeControl">
                            <ToggleVolume volume={isMuted ? '0' : volume} toggle={toggleVolume} />
                            <RangeSlider
                                min='0'
                                max='1'
                                step='0.01'
                                value={!isMuted ? volume : '0'}
                                onInput={setVolume}
                                ref={volumeSlider}
                            />
                        </div>
                        <h1>{`${HH_MM_SS(videoElapsedTime)} / ${HH_MM_SS(videoInfo.metadata.duration)}`}</h1>
                    </div>
                    <div className="rightControls">
                        <ResolutionSelection open={resolutionMenuOpen}>
                            <button
                                title={'Video Quality'}
                                onClick={() => this.setState(prevState => ({ resolutionMenuOpen: !prevState.resolutionMenuOpen }))}
                            >{videoInfo['assets'][activeVideoIndex].height > 540 ? <High_Definition/> : <Standard_Definition/>}</button>
                            <ResolutionForm onChange={setResolution}>
                                {videoInfo['assets'].map((item, index) => (<ResolutionInput 
                                    itemProps={item} key={index} value={index} checked={activeVideoIndex === index} 
                                />))}
                            </ResolutionForm>
                        </ResolutionSelection>
                        <MiniPlayerBtn onClick={() => this.setState(prevState => ({ miniPlayerMode : !prevState.miniPlayerMode }))} />
                        <TheaterModeBtn activeMode={theaterMode} onClick={() => this.setState(prevState => ({ theaterMode: !prevState.theaterMode}))}/>
                        <ToggleFullScreen activeMode={fullscreenMode} onClick={toggleFullScreen} />
                    </div>
                </MainControls>
            </Controls>
        </StyledVideoPlayer>);
    }
}
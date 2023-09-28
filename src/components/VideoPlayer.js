import React from "react";

import { 
    AutoPlayBtn,
    VideoChapters,
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
    ToggleVolume,
    ToggleVideoChapters,
    ChapterItem
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
            autoPlay: true,
            idleTimer: null,
            isIdle: false,
            volume: 1,
            isReadyToPlay: false,
            videoElapsedTime: 0,
            resolutionMenuOpen: false,
            chaptersOpen: true,
            miniPlayerMode: false,
            theaterMode: false,
            fullscreenMode: false,
            chapterEntries: [],
            videoPlayer: React.createRef(),
            progressBar: React.createRef(),
            volumeSlider: React.createRef(),
            chapterContainer: React.createRef(),
            media: React.createRef()
        }
    }

    componentDidMount() {
        if(this.state.videoInfo === null) {
            return;
        }
        this.setActiveThumbnail();

        window.addEventListener('resize', this.setActiveThumbnail);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setActiveThumbnail);
    }

    componentDidMount() {
        const {
            videoInfo
        } = this.state;

        if (videoInfo === null) {
            return;
        }
        this.setActiveThumbnail();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevState.activeVideoIndex !== this.state.activeVideoIndex) {
            this.handleActiveVideoIndexChange(prevState.videoElapsedTime, prevState.isPlaying);
        }
        if (prevState.isReadyToPlay !== this.state.isReadyToPlay && (!this.state.isActive && this.state.autoPlay)) {
            this.startVideo();
        }
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
        const { media, videoPlayer, isReadyToPlay } = this.state;
        if (!isReadyToPlay) {
            return;
        }

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
        this.setState({ activeVideoIndex, resolutionMenuOpen: false, isReadyToPlay: false });
    }

    handleActiveVideoIndexChange = (prevElapsedTime, prevIsPlaying) => {
        const { media } = this.state;
        media.current.load();
        media.current.currentTime = prevElapsedTime;
        if(prevIsPlaying)
            media.current.play();
    }

    handleLoadedVideo = () => {
        const { media, videoElapsedTime, videoInfo, isActive, autoPlay, chapterEntries } = this.state;

        if (videoInfo.chapters?.length > 0 && chapterEntries.length !== videoInfo.chapters.length) {
            media.current.addEventListener('seeked', this.captureChapterFrames);
            media.current.currentTime = videoInfo.chapters[0].time;
        } else {
            this.setState({ isReadyToPlay: true });
        }
    }

    copyToClipBoard = () => {

    }

    toggleFullScreen = () => {
        const { videoPlayer } = this.state;
        if(document.fullscreenElement) {
            document.exitFullscreen()
            .then(() => this.setState({ fullscreenMode:false }))
            .catch((err) => console.error('Error While Exiting Full Screen: ', err));
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

    captureChapterFrames = () => {
        // Take into account invalid times
        const { media, videoInfo, chapterEntries } = this.state;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        var currentCapture = chapterEntries.length;

        canvas.width = media.current.videoWidth;
        canvas.height = media.current.videoHeight;
        context.drawImage(media.current, 0, 0, canvas.width, canvas.height);

        this.setState({ chapterEntries: [...chapterEntries, <ChapterItem
            key={currentCapture}
            value={videoInfo.chapters[currentCapture].time}
            posterSrc={canvas.toDataURL()}
            chapterTitle={videoInfo.chapters[currentCapture].description}
            onClick={this.setVideoProgress}
        />] });
        console.log(chapterEntries)

        if (++currentCapture < videoInfo.chapters.length) {
            media.current.currentTime = videoInfo.chapters[currentCapture].time;
        } else {
            media.current.removeEventListener('seeked', this.captureChapterFrames);
            media.current.currentTime = 0;
            this.setState({ isReadyToPlay: true });
        }
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
            chapterContainer,
            isActive, 
            theaterMode, 
            isPlaying, 
            miniPlayerMode, 
            videoElapsedTime, 
            isIdle, 
            volume, 
            isMuted, 
            resolutionMenuOpen,
            chaptersOpen,
            isReadyToPlay,
            fullscreenMode,
            chapterEntries
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
            isReadyToPlay={isReadyToPlay}
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
            {!isReadyToPlay && <StyledVideoPlayerLoading/>}
            <video 
                ref={media} 
                onClick={playPauseMedia}
                onTimeUpdate={updateElapsedTime} 
                onVolumeChange={handleVolumeChange}
                muted={isMuted}
                onLoadedData={handleLoadedVideo}
                crossOrigin="anonymous"
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
                <VideoChapters
                    ref={chapterContainer}
                    isOpen={chaptersOpen}
                >{chapterEntries}</VideoChapters>
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
                        <ToggleVideoChapters open={chaptersOpen} onClick={() => this.setState(prevState => ({ chaptersOpen : !prevState.chaptersOpen }))}/>
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
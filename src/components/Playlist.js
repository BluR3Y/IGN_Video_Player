import React from "react";
import $ from "jquery";
import { faker } from '@faker-js/faker';

import VideoPlayer from "./VideoPlayer";
import VideoQueue from "./VideoQueue";
import ArticleList from './ArticleList';

import { CommentCount, StyledPlaylist, StyledTimeStamps, VideoTags } from './styles/Playlist.styled';

import Videos from '../data/videos.json';
import Articles from '../data/articles.json';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            videos: null,
            activeVideoIndex: null,
            activeVideoDescription: null,
            activeVideoTimeStamps: null,
            activeVideoComments: null,
            timeStampFrames: null,
            componentError: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.activeVideoIndex !== this.state.activeVideoIndex) {
            this.findTimeStamps();
            this.setVideoComments();
        }
        if(prevState.activeVideoTimeStamps !== this.state.activeVideoTimeStamps){}
            // this.captureFrames();
    }

    componentDidMount() {
        Promise.all([
            this.fetchVideos()
            .then(videos => this.setState({
                videos: videos.map(item => this.generateMissingVideoData(item)),
                activeVideoIndex: 0
            })),
            this.fetchArticles()
            .then(articles => this.setState({
                articles: articles.map(item => ({
                    ...item,
                    commentCount: Math.floor(Math.random() * 200)
                }))
            }))
        ])
        .catch(err => {
            console.error('Error occured while fetching content: ', err);
            this.setState({ componentError: err });
        });
    }

    fetchVideos = async (startIndex = 0, count = 5) => {
        return Videos;
    }

    fetchArticles = async (startIndex = 0, count = 10) => {
        return Articles;
    }

    // IGN deciding to remove their public api required that I use 'unique' methods to tretrieve their content
    generateMissingVideoData = (videoInfo) => ({
        ...videoInfo,
        commentCount: Math.floor(Math.random() * 200),
        metadata: {
            ...videoInfo.metadata,
            description: faker.lorem.paragraph(),
            publishDate: faker.date.anytime()
        },
        tags: (() => {
            const tags = [];
            for (var i = 0; i < 15; i++)
                tags.push(faker.lorem.word());
            return tags;
        })()
    });

    findTimeStamps = async () => {
        const { videos, activeVideoIndex } = this.state;
        const videoInfo = videos[activeVideoIndex];
        var activeVideoDescription = videoInfo['metadata'].description || '';
        var activeVideoTimeStamps = this.getTimeStamps(activeVideoDescription);

        if(activeVideoTimeStamps) {
            activeVideoDescription = activeVideoDescription.substring(0, activeVideoDescription.indexOf(activeVideoTimeStamps[0].timestamp)) + 
            activeVideoDescription.substring(activeVideoDescription.indexOf(activeVideoTimeStamps[activeVideoTimeStamps.length-1].title)+activeVideoTimeStamps[activeVideoTimeStamps.length-1].title.length);            
        }
        this.setState({ activeVideoDescription, activeVideoTimeStamps });
    }

    getTimeStamps = (str) => {
        var timeStamps = [];
        var lastTSIndex = null;
        var lastTimeStamp = null;
        for(var i =0; i < str.length-4; i++) {
            if(!isNaN(parseFloat(str[i]))) {
                var j = i+1;
                for(; j < str.length && ((/^\d+$/).test(str[j]) || str[j] === ':'); j++);
                var subStr = str.substring(i,j);
                if(this.isTimeStamp(subStr)) {
                    if(lastTSIndex) {
                        var prevTitle = str.substring(lastTSIndex, i);
                        if(prevTitle[0] === ' ')
                            prevTitle = prevTitle.substring(1);
                        if(prevTitle[prevTitle.length-1] === ' ')
                            prevTitle = prevTitle.substring(0, prevTitle.length-1);
                        timeStamps.push({ timestamp: lastTimeStamp, title: prevTitle });
                    }

                    lastTimeStamp = subStr;
                    lastTSIndex = j;
                }

                i = j;
            }
        }
        if(lastTSIndex) {
            var prevTitle = '';
            for(var i = lastTSIndex + 1; i < str.length; i++) {
                if(
                    prevTitle.length &&
                    str[i].match(/^[A-Z]*$/) &&
                    (prevTitle[prevTitle.length-1] !== ' ' && prevTitle[prevTitle.length-1] !== '.')
                ) {
                    break;
                }
                
                prevTitle += str[i];
            }
            timeStamps.push({ timestamp: lastTimeStamp, title: prevTitle });
        }

        return timeStamps.length ? timeStamps : null;
    }

    isTimeStamp = (str) => {
        var parts = str.split(':');
        if(parts.length < 2) 
            return false;
        for(const part of parts) {
            for(const char of part) {
                if(isNaN(char))
                    return false;
            }
        }
        return true;
    }

    convertTimestamp = (timestamp) => {
        var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp);
        return(`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`);
    }
 
    setVideoComments = () => {
        const activeVideoComments = [];
        for (var i = 0; i < 15; i++)
            activeVideoComments.push(faker.lorem.paragraph());
        return activeVideoComments;
    }

    render() {
        const { videos, articles, activeVideoIndex, activeVideoDescription, activeVideoComments, timeStampFrames, componentError } = this.state;
        const { convertTimestamp } = this;
        const activeVideo = activeVideoIndex !== null ? videos[activeVideoIndex] : null;
        return <StyledPlaylist>
            {activeVideo && (
                <div className="activeVideo">
                    <VideoPlayer videoInfo={activeVideo} />
                    <div className="videoInfo">
                        <h1>{videos[activeVideoIndex].metadata.title}</h1>
                        <h2>Published: <span>{convertTimestamp(videos[activeVideoIndex].metadata.publishDate)}</span></h2>
                        <CommentCount count={videos[activeVideoIndex].commentCount} />
                        {timeStampFrames && (
                            <StyledTimeStamps>
                                {timeStampFrames.map((image, index) => (<img src={image} key={index} />))}
                            </StyledTimeStamps>
                        )}
                        <p>{activeVideoDescription}</p>
                        { activeVideo.tags?.length && (
                            <VideoTags>
                                { activeVideo.tags.map((item, index) => (<li key={index}>{item}</li>)) }
                            </VideoTags>
                        ) }
                    </div>
                </div>
            )}
            {/* <VideoQueue videos={videos}/>
            <ArticleList/> */}
        </StyledPlaylist>
    }
}
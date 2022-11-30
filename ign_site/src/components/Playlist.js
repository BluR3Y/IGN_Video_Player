import React from "react";
import $ from "jquery";

import VideoPlayer from "./VideoPlayer";
import VideoQueue from "./VideoQueue";
import ArticleList from './ArticleList';

import { CommentCount, StyledPlaylist, StyledTimeStamps, VideoTags } from './styles/Playlist.styled';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            videos: null,
            comments: null,
            activeVideoIndex: null,
            activeVideoDescription: null,
            activeVideoTimeStamps: null,
            activeVideoComments: null,
            numVideos: 5,
            numArticles: 5,
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
        const { numVideos, numArticles } = this.state;
        this.fetchVideos(0, numVideos)
        .then(videos => {
            var videoIds = videos.map((video) => video.contentId);
            this.fetchComments(videoIds)
            .then((videoComments) => {
                var comments = (this.state.comments ? this.state.comments : {});
                comments['video'] = videoComments;
                this.setState({ videos, comments });
            })
            .finally(() => this.setState({ activeVideoIndex: 1 }));
        })
        .catch(err => {
            console.error('Error While fetching videos: ', err);
            this.setState({componentError : err});
        })
        this.fetchArticles(0, numArticles)
        .then(articles => {
            var articleIds = articles.map((article) => article.contentId);
            this.fetchComments(articleIds)
            .then((articleComments) => {
                var comments = (this.state.comments ? this.state.comments : {});
                comments['article'] = articleComments;
                this.setState({ articles, comments });
            })
        })
        .catch(err => {
            console.error('Error While fetching articles: ', err);
            this.setState({componentError : err});
        })
    }

    fetchVideos = async (startIndex = 0, count = 10) => {
        var apiURL = 'https://ign-apis.herokuapp.com/videos?';
        var requestParams = {
            startIndex: startIndex,
            count: count,
        }
        for(const property in requestParams) {
            apiURL += `${property}=${requestParams[property]}&`;
        }

        var ignVideos = await $.ajax({
            type: 'GET',
            url: apiURL,
            dataType: 'JSONP',
        }).then(res => res.data);
        return ignVideos;
    }

    fetchArticles = async (startIndex = 0, count = 10) => {
        var apiURL = 'https://ign-apis.herokuapp.com/articles?';
        var requestParams = {
            startIndex: startIndex,
            count: count,
        }
        for(const property in requestParams) {
            apiURL += `${property}=${requestParams[property]}&`;
        }

        var ignArticles = await $.ajax({
            type: 'GET',
            url: apiURL,
            dataType: 'JSONP',
        }).then(res => res.data);
        return ignArticles;
    }


    fetchComments = async (ids = []) => {
        var apiURL = 'https://ign-apis.herokuapp.com/comments';
        var ignComments = await $.ajax({
            type: 'POST',
            url: apiURL,
            dataType: 'JSONP',
            data: JSON.parse(`{"ids": "${ids}"}`),
        }).then(res => res.content);
        return ignComments;
    }

    findTimeStamps = async () => {
        const { videos, activeVideoIndex } = this.state;
        const videoInfo = videos[activeVideoIndex];
        var activeVideoDescription = videoInfo['metadata'].description;
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
        const { videos, activeVideoIndex, comments } = this.state;
        var activeVideoComments = comments['video'].find((item) => item.id === videos[activeVideoIndex].contentId);
        this.setState({ activeVideoComments: activeVideoComments.count });
    }

    render() {
        const { videos, articles, comments, activeVideoIndex, activeVideoDescription, activeVideoComments, timeStampFrames, componentError } = this.state;
        const { convertTimestamp } = this;
        
        return(<StyledPlaylist>
            <div className="activeVideo">
                <VideoPlayer videoInfo={videos ? videos[activeVideoIndex] : null} />
                {activeVideoIndex && (
                    <div className="videoInfo">
                        <h1>{videos[activeVideoIndex].metadata.title}</h1>
                        <h2>Published: <span>{convertTimestamp(videos[activeVideoIndex].metadata.publishDate)}</span></h2>
                        <CommentCount count={activeVideoComments} />
                        {timeStampFrames && (
                            <StyledTimeStamps>
                                {timeStampFrames.map((image, index) => (<img src={image} key={index} />))}
                            </StyledTimeStamps>
                        )}
                        <p>{activeVideoDescription}</p>
                        <VideoTags>
                            {videos[activeVideoIndex]['tags'].map((item, index) => (<li key={index}>{item}</li>))}
                        </VideoTags>
                    </div>
                )}
            </div>
            {/* <VideoQueue videos={videos}/>
            <ArticleList/> */}
        </StyledPlaylist>);
    }
}
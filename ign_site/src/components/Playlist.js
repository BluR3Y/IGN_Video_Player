import React from "react";
import $ from "jquery";

import VideoPlayer from "./VideoPlayer";
import VideoQueue from "./VideoQueue";
import ArticleList from './ArticleList';

import { CommentCount, StyledPlaylist, VideoTags } from './styles/Playlist.styled';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            videos: null,
            comments: null,
            activeVideoIndex: null,
            videoDescription: null,
            videoTimeStamps: null,
            activeVideoComments: null,
            numVideos: 5,
            numArticles: 5,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.activeVideoIndex !== this.state.activeVideoIndex) {
            this.findTimeStamps();
            this.setVideoComments();
        }
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
        var videoDescription = videoInfo['metadata'].description;
        var videoTimeStamps = this.getTimeStamps(videoDescription);

        if(videoTimeStamps.length) {
            videoDescription = videoDescription.substring(0, videoDescription.indexOf(videoTimeStamps[0].timestamp)) + 
            videoDescription.substring(videoDescription.indexOf(videoTimeStamps[videoTimeStamps.length-1].title)+videoTimeStamps[videoTimeStamps.length-1].title.length);            
        }
        this.setState({ videoDescription, videoTimeStamps });
    }

    getTimeStamps = (str) => {
        var timeStamps = [];
        var lastTSIndex = null;
        var lastTimeStamp = null;
        for(var i =0; i < str.length-4; i++) {
            if(!isNaN(parseFloat(str[i]))) {
                var j = i+1;
                for(; j < str.length && str[j] !== ' '; j++);
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

                i = i+(j-i+1);
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

        return timeStamps;
    }

    isTimeStamp = (str) => {
        if(str.length < 5 || str.length % 3 !== 2)
            return false;
        for(var i = 1; i <= str.length; i++) {
            if(i % 3 === 0) {
                if(str[i-1] !== ':')
                    return false;
            }else{
                if(isNaN(str[i-1]))
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
        const { videos, articles, comments, activeVideoIndex, videoDescription, activeVideoComments } = this.state;
        const { convertTimestamp } = this;
        if(!activeVideoIndex)
            return(<></>)
        return(<StyledPlaylist>
            <div className="activeVideo">
                <VideoPlayer videoInfo={videos[activeVideoIndex]} />
                <div className="videoInfo">
                    <h1>{videos[activeVideoIndex].metadata.title}</h1>
                    <h2>Published: <span>{convertTimestamp(videos[activeVideoIndex].metadata.publishDate)}</span></h2>
                    <CommentCount count={activeVideoComments} />
                    <p>{videoDescription}</p>
                    <VideoTags>
                        {videos[activeVideoIndex]['tags'].map((item, index) => (<li key={index}>{item}</li>))}
                    </VideoTags>
                </div>
            </div>
            <VideoQueue videos={videos}/>
            <ArticleList/>
        </StyledPlaylist>);
    }
}
import React from "react";
import $ from "jquery";

import VideoPlayer from "./VideoPlayer";
import VideoQueue from "./VideoQueue";
import ArticleList from './ArticleList';

import { StyledPlaylist } from './styles/Playlist.styled';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            videos: null,
            comments: null,
            activeVideo: null
        }
    }

    componentDidMount() {
        this.fetchVideos()
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
        console.log(ignVideos)
        this.setState({ videos: ignVideos, activeVideo: 1 });
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
        console.log(ignArticles)
    }

    fetchComments = async (ids = []) => {
        var apiURL = 'https://ign-apis.herokuapp.com/comments';
        var ignComments = await $.ajax({
            type: 'POST',
            url: apiURL,
            dataType: 'JSONP',
            data: JSON.parse(`{"ids": "${ids}"}`),
        }).then(res => res.content);
        console.log(ignComments)
    }

    // render() {
    //     const { videos, articles, comments, activeVideo } = this.state;
    //     if(!videos)
    //         return(<></>)
    //     return(<StyledPlaylist>
    //         <div className="activeVideo">
    //             <VideoPlayer videoInfo={videos[activeVideo]} />
    //             <h1>{videos[activeVideo].metadata.title}</h1>
    //             <p>{videos[activeVideo].metadata.description}</p>
    //         </div>
    //         <VideoQueue videos={videos} />
    //         <ArticleList/>
    //     </StyledPlaylist>);
    // }
    render() {
        const { videos, articles, comments, activeVideo } = this.state;
        if(!videos)
            return(<></>)
        return(<VideoPlayer videoInfo={videos[activeVideo]} />)
    }
}
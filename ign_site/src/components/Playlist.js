import React from "react";

import { StyledPlaylist } from './styles/Playlist.styled';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.fetchVideos()
    }

    fetchVideos = async () => {
        var URL = 'https://ign-apis.herokuapp.com/videos?startIndex=30\u0026count=5';
        var videos = await fetch(URL);
        videos = videos.json();
        console.log(videos)
    }

    render() {
        return(<StyledPlaylist>

        </StyledPlaylist>);
    }
}
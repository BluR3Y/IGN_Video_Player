import styled from "styled-components";

import Share from '../../assets/icons/share';

export const StyledVideoPlayer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: black;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    user-select: none;

    video {
        width: 100%;
        height: auto;
        display: block;
    }
`;

export const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    pointer-events: none;
`;

export const NotificationBox = styled.div`
    position: absolute;
    right: -100%;
    bottom: 0;
    border-radius: 6px;
    background-color: #202634;
    padding: 5px 10px;
    
    h1 {
        font-family: Lato;
        font-weight: 400;
        font-size: 18px;
        margin: 0;
        color: #fff;
    }
    @keyframes slideIn-Right {
    0% {
        right: -200px;
    }10% {
        right: 20px;
    }90% {
        right: 20px;
    }100% {
        right: -200px;
    }
}
`;


export const ShareVideoBtn = styled.button.attrs(() => ({
    children : (<Share/>),
}))`
    padding: 6px;
    border-radius: 50%;
    border: none;
    margin: 15px 15px 0 10px;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.10s linear;
    pointer-events: auto;

    svg {
        fill: #fff;
        width: 25px;
    }

    &:hover {
        background-color: rgb(71, 71, 71);
    }
    &:active ${NotificationBox} {
        animation: slideIn-Right 2s linear;
    }
`;













export const Thumbnail = styled.div`

`;

export const Controls = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 70px 0 10px 0;
    opacity: 0;
    transition: opacity 0.10s linear;
    background-image: linear-gradient(to top, black 0%, transparent 100%);


`;  
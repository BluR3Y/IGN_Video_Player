import styled, { css } from "styled-components";

import Share from '../../assets/icons/share';
import Play from '../../assets/icons/play';
import Play_Sharp from '../../assets/icons/play_sharp';

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

    a {
        font-family: Lato;
        font-weight: 400;
        font-size: 20px;
        color: white;
        text-decoration: none;
        margin: 20px 0 0 15px;
        pointer-events: auto;


        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    a:hover {
        text-decoration: underline;
    }
    ${props => props.isActive && css`
        background-image: linear-gradient(to bottom, black 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.10s linear;
        ${StyledVideoPlayer}:hover & {
            opacity: 1;
        }
    `}
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
        width: 25px;
        fill: #fff;
    }
    &:hover {
        background-color: rgb(71, 71, 71);
    }
`;

export const Thumbnail = styled.div.attrs((props) => ({
    children: (<>
            <div><Play/></div>
            <h1>{props.duration}</h1>
    </>)
}))`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.isActive ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 1;
    background: ${props => props.thumbnail ? `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), center / cover no-repeat url(${props.thumbnail.url})` : null};

    div {
        background-color: #bf1313;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;

        svg {
            width: 50%;
            margin-left:10%;
        }
    }

    h1 {
        position: absolute;
        left: 20px;
        bottom: 20px;
        background-color: #202634;
        padding: 5px 10px;
        border-radius: 2px;

        font-family: Lato;
        font-weight: 700;
        font-size: 18px;
        margin: 0;
        color: #fff;
    }
`;

export const Controls = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 70px 0 10px 0;
    visibility: hidden;
    transition: opacity 0.10s linear;
    background-image: linear-gradient(to top, black 0%, transparent 100%);

    ${props => props.isActive && css`
        ${StyledVideoPlayer}:hover & {
            visibility: visible;
        }
    `}
`;  

export const AutoPlayBtn = styled.button.attrs((props) => ({
    children: (<>
        <div className='autoPlay-btn'>
            <div className='autoPlay-thumb'>
                <Play_Sharp/>
            </div>
        </div>
        <h1>Autoplay setting: <span>{props.autoPlay ? 'On' : 'Off'}</span></h1>
    </>)
}))`
    position: absolute;
    z-index: 2;
    height: 40px;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 0 10px;
    cursor: pointer;
    font-size: 15px;

    .autoPlay-btn {
        width: 50px;
        height: 25px;
        border-radius: 20px;
        position: relative;

        border: 2px solid #fff;
    }
    .autoPlay-thumb {
        position: absolute;
        border: 2px solid #fff;
        border-radius: 50%;
        height: inherit;
        aspect-ratio: 1;
        transition: left 0.10s linear;
        display: flex;
        align-items:center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);

        svg {
            width: 55%;
            margin-left: 3px;
        }

        ${props => props.autoPlay ? css`
            left: calc(50% + 2px);
            background-color: #fff;
            svg {
                fill: red;
            }
        ` : css`
            left: -2px;
            svg {
                fill: #fff;
            }
        `}
    }

    h1 {
        font-size: 1em;
        font-family: Lato;
        font-weight: 400;
        color: rgb(202, 201, 201);

        span {
            font-weight: 700;
            color: #fff;
        }
    }
    visibility: visible;
    ${props => props.isActive ? css`    //controls
        flex-direction: row;
        top: 0;
        left: ${props => props.isPlaying ? '-240px' : '0'};
        transition: left 0.10s linear;
        background-color: #202634;
    ` : css`    // thumbnail
        right: 20px;
        bottom: 20px;
        flex-direction: row-reverse;
        background-color: transparent;
    `}
`;
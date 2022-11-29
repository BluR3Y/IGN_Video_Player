import styled, { css } from "styled-components";
import {deviceSizes} from './breakPoints';

import Share from '../../assets/icons/share';
import Play from '../../assets/icons/play';
import Pause from '../../assets/icons/pause';
import Play_Sharp from '../../assets/icons/play_sharp';
import Mute from '../../assets/icons/mute';
import Volume_High from '../../assets/icons/volume_high';
import Volume_Low from '../../assets/icons/volume_low';
import Right_Arrow from '../../assets/icons/right_arrow';
import Expand from '../../assets/icons/expand';
import Compress from '../../assets/icons/compress';

export const StyledVideoPlayer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: black;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    user-select: none;
    aspect-ratio: ${props => props.aspectRatio};
    display: flex;

    video {
        width: 100%;
        height: auto;
        display: block;
        visibility: ${props => props.isLoaded ? 'visible' : 'hidden'};
    }

    ${props => props.idle && css`
        *:not(video) {
            display: none;
        }
    `}

    ${props => props.miniPlayerMode && css`
        position: fixed;
        bottom: 0;
        right: 0;
        width: 50vw;
    `}
`;

export const StyledVideoPlayerLoading = styled.div.attrs(() => ({
    children: (<>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </>)
}))`
    & {
        --loader-height: calc(100px / 7);
        display: flex;
        width: fit-content;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    &::before {
        content: '';
        position: absolute;
    }
    &::before,
    & > span {
        display: block;
        width: var(--loader-height);
        height: var(--loader-height);
        border-radius: 50%;
        background: #5e5954;
        
        animation-name: to-right;
        animation-duration: 500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    & > span:nth-child(even) {
        visibility: hidden;
    }
    & > span:first-child {
        animation-name: scale-up;
    }
    & > span:last-child {
        animation-name: scale-up;
        animation-direction: reverse;
    }

    @keyframes to-right {
        to {
            transform: translateX(200%);
        }
    }
    @keyframes scale-up {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
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
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 20px;
    height: 150px;
    visibility: hidden;
    transition: opacity 0.10s linear;
    background-image: linear-gradient(to top, black 0%, transparent 100%);

    * {
        pointer-events: auto;
    }

    .progressBar {
        margin: 10px 0;
    }
    .progressBar:hover {
        height: 5px;
    }

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

    ${props => props.isActive ? css`    //controls
        flex-direction: row;
        top: 0;
        left: ${props => props.isPlaying ? '-240px' : '20px'};
        transition: left 0.10s linear;
        background-color: #202634;
    ` : css`    // thumbnail
        right: 20px;
        bottom: 20px;
        flex-direction: row-reverse;
        background-color: transparent;
        visibility: visible;
    `}
`;

export const RangeSlider = styled.input.attrs(() => ({
    type: 'range',
}))`
    -webkit-appearance: none;
    background-color: #ffffff;
    border-radius: 20px;
    height: 3px;
    width: 100%;
    margin: 0;
    display: block;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
        height: 10px;
    }
    &::-webkit-slider-thumb {
        width: 15px;
        -webkit-appearance: none;
        height: 15px;
        cursor: pointer;
        background-image: radial-gradient(#fe0303 30%, #ffffff 20%);
        border-radius: 50%;
        margin-top: -2px;
    }
`;

export const MainControls = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    margin: -3px 0 10px;

    .leftControls {
        height: inherit;
        width: 300px;
        display: flex;
        flex-direction: row;

        .volumeControl {
            height: inherit;
            width: 120px;
            display: flex;
            flex-direction: row;
            align-items:center;
        }

        h1 {
            font-family: Lato;
            font-weight: 500;
            font-size: 18px;
            color: #fff;
            margin-left: 20px;
            height: fit-content;
            align-self: center;
        }
    }

    .rightControls {
        height: inherit;
        width: 230px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`;

export const TogglePlayPause = styled.div.attrs((props) => ({
    children: (<>
        <button title={props.isPlaying ? 'Pause' : 'Play'} onClick={props.toggle}>{props.isPlaying ? <Pause/> : <Play/>}</button>
    </>),
}))`
    height: inherit;
    width: 40px;
    margin: 0;
    button {
        height: inherit;
        svg {
            height: 27px;
            fill: #fff;
         }
    }
`;
export const ToggleVolume = styled(TogglePlayPause).attrs((props) => ({
    children: (<>
        <button title={props.volume > 0 ? 'Mute' : 'Unmute'} onClick={props.toggle}>{props.volume > 0 ? (props.volume > 0.5 ? <Volume_High/> : <Volume_Low/>) : <Mute/>}</button>
    </>)
}))`
    margin-right: 5px;
    width: 50px;
`;

export const ResolutionInput = styled.label.attrs((props) => ({
    children: (<>
        {`${props.itemProps.height}p`}
        <input type='radio' name='resolutionOption' value={props.value} defaultChecked={props.checked}/>
    </>),
}))`
    width: inherit;
    height: 30px;
    cursor: pointer;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 13px;

    input[type="radio"] {
        -webkit-appearance: none;
        appearance: none;
        width: 1.1em;
        height: 1.1em;
        border-radius: 50%;
        background-color: #5e5954;
        margin-left: 5px;
        display: grid;
        place-content: center;
    }
    input[type="radio"]:hover {
        background-color: #fff;
    }
    input[type="radio"]::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        transform: scale(0);
        background-color: red;
    }
    input[type="radio"]:checked::before {
        transform: scale(1);
    }
    input[type="radio"]:checked {
        background-color: #fff;
    }
`;

export const ResolutionForm = styled.form`
    position:absolute;
    width: 100px;
    background-color: #161618;
    left: 50%;
    bottom: 115%;
    transform: translateX(-50%);
    display:flex;
    flex-direction: column;
`;

export const ResolutionSelection = styled.div`
    height: inherit;
    position:relative;
    cursor: pointer;
    overflow: ${props => props.open ? 'visible' : 'hidden'};
    
    button {
        height: inherit;
        svg {
            height: 27px;
            fill: #fff;
        }
    }
`;

export const MiniPlayerBtn = styled.button.attrs(() => ({
    children: (<>
        <div>
            <div/>
        </div>
    </>),
    title: 'Mini Player'
}))`
    height: fit-content;
    & > div {
        height: 27px;
        aspect-ratio: 1.5;
        border-radius: 5px;
        border: 2px solid #fff;
        position: relative;

        div {
            width: 16px;
            height: 10px;
            position: absolute;
            right: 2px;
            bottom: 2px;
            border-radius: 2px;
            background-color: ${props => props.theme.primary};
        }
    }
`;

export const TheaterModeBtn = styled.button.attrs((props) => ({
    children: (<div>
        <Right_Arrow/>
        <Right_Arrow/>    
    </div>),
    title: (props.activeMode ? 'Default View' : 'Theater Mode')
}))`

    div {
        width: 45px;
        height: 27px;
        border: 2px solid #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        svg {
            width: 16px;
            fill: #fff;
        }
        svg:nth-child(1) {
            transform: rotate(180deg);
            margin-right: -2px;
        }
        svg:nth-child(2) {
            margin-left: -2px;
        }
        ${props => props.activeMode && css`
            svg:nth-child(1) {
                transform: unset;
                margin-right: 1px;
            }
            svg:nth-child(2) {
                transform: rotate(180deg);
                margin-left: 1px;
            }
        `}
    }
`;

export const ToggleFullScreen = styled.button.attrs((props) => ({
    children: (props.activeMode ? <Compress/> : <Expand/>),
    title: (props.activeMode ? 'Exit Full Screen' : 'Full Screen')
}))`
    height: 27px;
    svg {
        height: inherit;
        fill: #fff;
    }
`;
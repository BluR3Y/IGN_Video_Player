import styled, { css } from "styled-components";

import {deviceSizes} from './breakPoints';
import { StyledVideoQueue } from "./VideoQueue.styled";
import {StyledArticleList} from './ArticleList.styled';
import { TheaterModeBtn, StyledVideoPlayer } from "./VideoPlayer.styled";
import Comment from '../../assets/icons/comment';

// export const VideoQueue = styled.div`
//     position: relative;
//     border: 1px solid green;

// `;

// export const ArticleList = styled.div`
//     background-color: blue;
//     height: fit-content;
// `;

// export const StyledPlaylist = styled.div`
//     width: inherit;
//     flex: 1 1 auto;
//     position: relative;
//     padding: 20px 15px;
//     display: grid;
//     grid-template-columns: auto;
//     grid-template-rows: repeat(3, auto);

//     h1,
//     p {
//         color: ${props => props.theme.textColor};
//     }

//     .activeVideo {
//         grid-column: 1;
//         grid-row: 1;
        
//         h1 {
//             font-size: 1.4em;
//             line-height: 1em;
//             margin: 30px 0 15px 0;
//         }
//         p {
//             font-size: 1em;
//             line-height: 1.4em;
//         }
//     }
//     ${VideoQueue} {
//         grid-column: 1;
//         grid-row: 2;
//     }
//     ${ArticleList} {
//         grid-column: 1;
//         grid-row: 3;
//     }

//     @media (min-width: 770px) {
//         padding: 20px 40px;
//     }

//     @media (min-width: ${deviceSizes.xlScreens}px) {
//         padding: 20px 120px;
//         grid-template-columns: 1fr 250px;
//         grid-template-rows: auto 1fr;
//         grid-gap: 25px;

//         .activeVideo {
//             grid-column: 1;
//             grid-row: 1;
//         }

//         ${VideoQueue} {
//             grid-column: 2;
//             grid-row: 1 / -1;
//         }

//         ${ArticleList} {
//             grid-column: 1;
//             grid-row: 2;
//         }
//     }
// `;

export const StyledPlaylist = styled.div`
    flex: 1 1 auto;
    position: relative;
    display: grid;
    padding: 20px;
    margin: auto;
    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr;
    grid-row-gap: 4px;
    grid-column-gap: 0px;

    h1,
    h2,
    p,
    li {
        color: ${props => props.theme.textColor};
    }
    
    ${StyledVideoPlayer} {
        grid-column: 1;
        grid-row: 1;
    }
    .videoInfo {
        font-size: 18px;
        grid-column: 1;
        grid-row: 2;
        padding: 20px 0;
        h1 {
            font-size: 1.6em;
            line-height: 1em;
            margin-bottom: 10px;
        }
        h2 {
            font-size: 1.2em;
            font-weight: 500;
            margin-bottom: 20px;
            display: inline-block;
        }
        p {
            font-size: 1em;
            line-height: 1.4em;
            margin-bottom: 15px;
        }
    }
    ${StyledVideoQueue} {
        grid-column: 1;
        grid-row: 3;
    }
    ${StyledArticleList} {
        grid-column: 1;
        grid-row: 4;
        border: 2px solid green;
    }

    @media (min-width: ${deviceSizes.minDesktop}px) {
        grid-template-columns: 660px 1fr;
        grid-column-gap: 25px;
        ${props => props.inTheaterMode ? css `
            padding: 0;

            ${StyledVideoPlayer} {
                max-height: 72vh;
                grid-column: 1 / -1;
                grid-row: 1;
                margin: 0;
                border-radius: 0;
            }

            .videoInfo {
                gird-column: 1;
                grid-row: 2;
                margin-left: 30px;
            }

            ${StyledVideoQueue} {
                grid-column: 2;
                grid-row: 2 / -1;
                margin-right: 30px;
            }
            
            ${StyledArticleList} {
                grid-column: 1;
                grid-row: 3;
                margin-left: 30px;
            }
        ` : css `
                ${StyledVideoQueue} {
                    grid-column: 2;
                    grid-row: 1 / -1;
                }

                ${StyledArticleList} {
                    grid-column: 1;
                    grid-row: 3;
                }
        `}
    }

    @media (min-width: ${deviceSizes.xlScreens}px) {
        grid-template-columns: 1fr 410px;
        ${props => !props.inTheaterMode && css `
            padding: 20px 100px;
        `}
    }

    @media (max-width: ${deviceSizes.minDesktop}px) {
        ${StyledVideoPlayer} {
            ${TheaterModeBtn} {
                display: none;
            }
        }
    }
`;

export const CommentCount = styled.div.attrs((props) => ({
    children: (<>
        <Comment/>
        <h1>{props.count}</h1>
    </>)
}))`
    height: 26px;
    display: flex;
    flex-direction: row;
    float: right;
    align-items: center;
    user-select: none;

    svg {
        height: inherit;
        fill: ${props => props.theme.textColor};
        margin-right: 7px;
    }
    h1 {
        font-size: 1.1em !important;
        font-weight: lighter !important;
        margin-top: 15px;
    }
`;

export const VideoTags = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    width: inherit;
    flex-wrap: wrap;
    justify-content: flex-start;
    user-select: none;

    li {
        background-color: ${props => props.theme.type === 'classic' ? props.theme.tertiary : props.theme.secondary};
        display: block;
        width: fit-content;
        border-radius: 14px;
        padding: 0 10px;
        text-transform: uppercase;
        font-size: 0.9em;
        margin: 5px 10px 5px 0;
    }
`;
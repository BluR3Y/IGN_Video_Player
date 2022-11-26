import styled from "styled-components";

import {deviceSizes} from './breakPoints';
import { StyledVideoQueue } from "./VideoQueue.styled";
import {StyledArticleList} from './ArticleList.styled';

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
    border: 1px solid red;
    flex: 1 1 auto;
    position: relative;
    display: grid;
    padding: 20px 10px;
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    grid-row-gap: 20px;
    
    h1,
    p {
        color: ${props => props.theme.textColor};
    }
    
    .activeVideo {
        grid-column: 1;
        grid-row: 1;
        border: 1px solid red;
        h1 {
            font-size: 1.4em;
            line-height: 1em;
            margin: 30px 0 15px 0;
        }
        p {
            font-size: 1em;
            line-height: 1.4em;
        }
    }
    ${StyledVideoQueue} {
        grid-column: 1;
        grid-row: 2;
    }
    ${StyledArticleList} {
        grid-column: 1;
        grid-row: 3;
    }

    @media (min-width: ${deviceSizes.xlScreens}px) {
        padding: 20px 120px;
        grid-template-columns: 1fr 250px;
        grid-template-rows: auto 1fr;
        grid-gap: 25px;

        .activeVideo {
            grid-column: 1;
            grid-row: 1;
        }

        ${StyledVideoQueue} {
            grid-column: 2;
            grid-row: 1 / -1;
        }

        ${StyledArticleList} {
            grid-column: 1;
            grid-row: 2;
        }
    }
`;


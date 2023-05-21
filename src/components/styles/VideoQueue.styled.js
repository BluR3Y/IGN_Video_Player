import styled from "styled-components";

// Individual Queue Items
export const StyledQueueVideo = styled.div`
    width: inherit;
    display: flex;
    flex-direction: column;

    .videoInfo {
        padding: 0 10px;
        font-size: 18px;

        h1 {
            font-size: 1em;
            line-height: 1.2em;
        }
        h2 {
            font-size: 0.9em;
            line-height: 1.2em;
            font-weight: 500;
            color: ${props => props.theme.quaternary};
        }
    }
    
/* 
    h1 {
        background-color: red;
        font-size: 1em;
        line-height: 1.2em;
    } */
`;

// Video Queue Wrapper
export const StyledVideoQueue = styled.div`
    border: 1px solid red;

    .videoList {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;


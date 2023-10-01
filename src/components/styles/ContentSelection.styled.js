import styled, { css } from "styled-components";
import { deviceSizes } from "./breakPoints";

export const StyledContentSelection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    font-size: 1em;
    justify-content: center;
    gap: 10px;
    grid-column: 1;
    grid-row: 3;

    @media (min-width: ${deviceSizes.minDesktop}px) {
        grid-column: 2;
        ${props => props.inTheaterMode ? css`
            grid-row: 2 / -1;
        ` : css`
            ${props.extendedContentList ? css`
                grid-row: 1 / -1;
            ` : css`
                grid-row: 1;
            `}
        `}

    }

    .typeSelection {
        height: 40px;
        width: 300px;
        align-self: flex-start;
        display: flex;
        flex-direction: row;
        border-radius: 25px;
        font-size: 0.85em;
        gap: 4px;
    }

    .contentWrapper {
        background-color: ${props => props.theme.secondary};
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .extendList {
        height: 30px;
        background-color: ${props => props.theme.primary};
        border-radius: 5px;
        color: ${props => props.theme.tertiary};
    }
`;

export const ContentSelectionBtn = styled.button`
    font-size: 1em;
    flex: 1 1 auto;
    text-transform: capitalize;
    color:  ${props => props.selected ? props.theme.secondary : props.theme.quaternary};
    background-color: ${props => props.selected ? props.theme.quaternary : props.theme.secondary};

    &:first-child {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }
    &:last-child {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    }
    &:hover {
        background-color: ${props => props.theme.tertiary};
    }
`;

export const StyledArticleContentItem = styled.a.attrs((props) => ({
    href: 'https://ign.com' + props.contentUrl
}))`
    height: 120px;
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.background};    
    padding: 10px 0;
    gap: 15px;
    font-size: 0.82em;
    text-decoration: none;
    
    .posterContainer {
        background-color: black;
        height: 100%;
        aspect-ratio: 1.8;
        border-radius: 6px;
        overflow: hidden;
        flex: 0 0 auto;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .contentInfo {
        flex: 1 1 auto;
        font-size: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        overflow: hidden;

        h1 {
            font-size: 1em;
        }
        h2 {
            font-weight: 400;
            font-size: 0.9em;
        }

        .additionalContentInfo {
            display: flex;
            flex-direction: row;
            font-size: 1em;
            height: 1.2em;
            gap: 25px;

            div {
                font-size: 0.8em;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 5px;
                overflow: hidden;

                svg {
                    fill: ${props => props.theme.tertiary};
                    height: 1.2em;
                }
                h1 {
                    font-size: 0.9em;
                    line-height: 2em;
                    color: ${props => props.theme.tertiary};
                }
            }
        }
    }
`;

export const StyledVideoContentItem = styled(StyledArticleContentItem)`
    
`;

// export const StyledContentItem = styled.div`
//     height: 110px;
//     display: flex;
//     flex-direction: row;
//     background-color: ${props => props.theme.background};    
//     border: 1px solid black;
// `;
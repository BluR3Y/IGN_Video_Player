import styled, { css } from "styled-components";
import { deviceSizes } from "./breakPoints";

export const StyledContentSelection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
    font-size: 1em;
    justify-content: center;
    gap: 20px;
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
        background-color: blue;
        flex: 1 1 auto;
    }

    .extendList {
        height: 30px;
        background-color: ${props => props.theme.primary};
        border-radius: 5px;
        color: ${props => props.theme.tertiary};
    }

    border: 1px solid red;
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
import styled, { css } from "styled-components";
import {breakPoints} from './breakPoints'

import Menu_Bars from '../../assets/icons/menu_bars';
import Sun from '../../assets/icons/sun';
import Moon from '../../assets/icons/moon';

import ProfileImg from '../../assets/images/profileImg.jpeg';

export const StyledSideNavigation = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    pointer-events: none;
    -webkit-tap-highlight-color: transparent;
    
    .navContent {
        height: inherit;
        width: 300px;
        position: absolute;
        z-index: 1;
        left: ${props => props.open ? '0' : '-300px'};
        pointer-events: all;
        transition: left 0.2s ease;
        background-color: ${props => props.theme.secondary};
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .collapseBtn {
        display: ${props => props.open ? 'block' : 'none'};
        width: inherit;
        height: inherit;
        backdrop-filter: blur(4px);
        background-color: rgba(0,0,0,0.5);
        pointer-events: all;
    }

    @media ${breakPoints.laptop} {
        display: none;
    }
`;

export const StyledHamburgerButton = styled.button.attrs(() => ({
    children: (<Menu_Bars/>)
}))`
    position: absolute;
    right: -46px;
    top: 5px;
    pointer-events: all;

    svg {
        width: 35px;
        fill: ${props => props.theme.quaternary};
    }
`;

export const StyledProfile = styled.div`
    width: 220px;
    height: 220px;
    border-radius: 18px;
    margin: 20px 0 10px 0;
    backdrop-filter: brightness(70%);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 25px;
        white-space: pre-wrap;
        line-height: 22px;
        text-align: center;
        color: ${props => props.theme.primary};
        margin: 0 10px;
    }
`;

export const StyledProfileImg = styled.a.attrs(() => ({
    children: (<>
        <img src={ProfileImg} />
        <span>12</span>
    </>),
    href: 'https://ign.com/register'
}))`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
        border-radius: inherit;
    }

    span {
        position: absolute;
        left: 5px;
        top: 5px;
        background-color: ${props => props.theme.primary};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Lato;
        font-size: 16px;
        padding-bottom: 4px;
    }
`;

export const ThemeToggle = styled.div`
    width: 220px;
    height: 42px;
    backdrop-filter: brightness(70%);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
        width: 46%;
        height: 90%;
        border-radius: 8px;
        position: absolute;
        left: ${props => props.theme.type === 'classic' ? '2px' : '117px'};
        top: 50%;
        transform: translate(0,-50%);
        background-color: ${props => props.theme.secondary};
        transition: left 0.3s ease;
    }

    button {
        height: 30px;
        margin: auto;
        z-index: 1;
        -webkit-tap-highlight-color: transparent;

        svg {
            height: inherit;
            fill: ${props=>props.theme.quaternary};
        }
    }

    ${props => props.theme.type === 'classic' && css`
        .classicBtn {
            pointer-events: none;
        }
    `}
    ${props => props.theme.type === 'dark' && css`
        .darkBtn {
            pointer-events: none;
        }
    `}
`;
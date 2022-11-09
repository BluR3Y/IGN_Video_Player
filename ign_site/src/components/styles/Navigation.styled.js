import styled from "styled-components";

import IGN_Logo from '../../assets/icons/ign_logo';

export const Nav_SubContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Nav_Container = styled(Nav_SubContainer)`
    flex-direction: column;
    padding: 0;

    & ${Nav_SubContainer}:nth-child(1) {
        padding: 20px 80px;
        background-color: gray;
        display: flex;
        justify-content: space-between;
    }
    & ${Nav_SubContainer}:nth-child(2) {
        padding: 10px 120px;
        background-color: black;
    }
`;

export const StyledLogo = styled(IGN_Logo)`
    width: 160px;
    height: auto;
`;

export const Date_Logo = styled(Nav_SubContainer)`
    padding: 0;
    height: 50px;
    align-items: center;
    user-select: none;
    background-color: red;

    & h1 {
        height: inherit;
        display: flex;
        flex-direction : column;
        font-size: 22px;
        line-height: 22px;
        justify-content: space-evenly;
        margin-left: 15px;
        white-space: nowrap;
    } 
`;

export const ContentSelection = styled(Nav_SubContainer)`


    border: 1px solid yellow;
`;


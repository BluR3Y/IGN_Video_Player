import React from "react";
import {
    StyledSideNavigation, 
    StyledHamburgerButton, 
    StyledProfile,
    StyledProfileImg,
    ThemeToggle
} from './styles/SideNavigation.styled';

import Sun from '../assets/icons/sun';
import Moon from '../assets/icons/moon';

export default class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSideNav: false,
        }
    }

    render() {
        return(<StyledSideNavigation
            open={this.state.openSideNav}
        >
            <div className="navContent">
                <StyledHamburgerButton onClick={() => this.setState(prevState => ({ openSideNav: !prevState.openSideNav }))} />
                <StyledProfile>
                    <StyledProfileImg/>
                    <h1>John Doberman</h1>
                </StyledProfile>
                <ThemeToggle>
                    <div/>
                    <button className="classicBtn" onClick={this.props.toggleTheme}><Sun/></button>
                    <button className="darkBtn" onClick={this.props.toggleTheme}><Moon/></button>
                </ThemeToggle>
            </div>
            <button className="collapseBtn" onClick={() => this.setState(prevState => ({ openSideNav: !prevState.openSideNav }))} />
        </StyledSideNavigation>);
    }
}
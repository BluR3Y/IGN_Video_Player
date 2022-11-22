import React, { Fragment } from "react";

import GlobalStyles from './styles/GlobalStyles';
import Navigation from "./Navigation";
import { ThemeProvider } from "styled-components";
import SideNavigation from "./SideNavigation";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteThemes: {
                classic: {
                    type: 'classic',
                    primary: '#bf1313',
                    secondary: '#ffffff',
                    tertiary: '#bbc4c4',
                    quaternary: '#41495a'
                },
                dark: {
                    type: 'dark',
                    primary: '#bf1313',
                    secondary: '#41495a',
                    tertiary: '#bbc4c4',
                    quaternary: '#ffffff'
                }
            },
            activeTheme: 'dark',
        }
    }

    toggleTheme = () => {
        this.setState({ activeTheme: (this.state.activeTheme == 'classic' ? 'dark' : 'classic') });
    }

    render() {
        return(
            <ThemeProvider theme={this.state.siteThemes[this.state.activeTheme]}>
                <GlobalStyles/>
                <Navigation activeTheme={this.state.activeTheme} toggleTheme={this.toggleTheme}/>
                <SideNavigation activeTheme={this.state.activeTheme} toggleTheme={this.toggleTheme} />
            </ThemeProvider>
        );
    }
}
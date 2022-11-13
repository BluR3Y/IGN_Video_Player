import React from "react";

import { 
    Nav_Container, 
    Nav_SubContainer, 
    Date_Logo, 
    StyledLogo, 
    ContentSelection, 
    SelectionList,
    SelectionList_More,
    SearchBox,
    Profile,
    ThemeSelection
} from "./styles/Navigation.styled";

import Caret_Down from '../assets/icons/caret_down';
import Magnifying_Glass from '../assets/icons/magnifying_glass';
import Sun from '../assets/icons/sun';
import Moon from '../assets/icons/moon';

import ProfileImg from '../assets/images/profileImg.jfif';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionItems: [
                { id: 1, title: 'News', link: 'https://www.ign.com/news' },
                { id: 2, title: 'Videos', link: 'https://www.ign.com/videos' },
                { id: 3, title: 'Reviews', link: 'https://www.ign.com/reviews' },
                { id: 4, title: 'Shows', link: 'https://www.ign.com/watch' },
                { id: 5, title: 'Wikis', link: 'https://www.ign.com/wikis' },
                { id: 6, title: 'IGN on social', link: 'https://www.ign.com/wikis/ign-community-central/How_to_Follow_IGN' },
                { id: 7, title: 'About Us', link: 'https://corp.ign.com/' },
                { id: 8, title: 'Accessibility', link: 'https://www.ziffdavis.com/accessibility' },
                { id: 9, title: 'Privacy Policy', link: 'https://corp.ign.com/privacy' },
                { id: 10, title: 'Terms of Use', link: 'https://corp.ign.com/user-agreement' },
                { id: 11, title: 'Editorial Standards', link: 'https://corp.ign.com/standards-and-practices' },
                { id: 12, title: 'Do Not Sell My Pesonal Information', link: 'https://corp.ign.com/ccpa' },
                { id: 13, title: 'Site Map', link: 'https://corp.ign.com/sitemap' },
                { id: 14, title: 'Boards', link: 'https://www.ignboards.com/' },
                { id: 15, title: 'Contact Support', link: 'https://corp.ign.com/support' }
            ],
            visibleItems: [],
            hiddenItems: [],
            additionalSelectionItems: [
                { id: 1, title: "Overwatch 2", link: 'https://www.ign.com/games/overwatch-2'},
                { id: 2, title: "Gotham Knights", link: 'https://www.ign.com/games/gotham-knights'},
                { id: 3, title: "Modern Warfare 2", link: 'https://www.ign.com/games/call-of-duty-modern-warfare-2'},
                { id: 4, title: "Kingdom Hearts III", link: 'https://www.ign.com/games/kingdom-hearts-iii'},
                { id: 5, title: "The Walking Dead", link: 'https://www.ign.com/games/the-walking-dead-the-game'},
                { id: 6, title: "God of War", link: 'https://www.ign.com/games/god-of-war'},
                { id: 7, title: "Marvel's The Avengers: Infinity War", link: 'https://www.ign.com/articles/2018/05/18/avengers-infinity-war-review'},
                { id: 8, title: "Super Troopers 2", link: 'https://www.ign.com/movies/super-troopers-2'},
                { id: 9, title: "Marvel's The Defenders", link: 'https://www.ign.com/articles/2017/08/18/marvels-the-defenders-season-1-review'},
            ],
            searchRef: React.createRef(),
            selectionListRef: React.createRef(),
            openSearchBar: false,
        }

    }

    componentDidMount() {
        window.addEventListener('load', this.resizeNav)

        var searchItem = this.state.searchRef.current;
        searchItem.addEventListener('submit', this.search);
        window.addEventListener('resize', this.resizeNav);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.resizeNav)

        var searchItem = this.state.searchRef.current;
        searchItem.removeEventListener('submit',this.search);
        window.removeEventListener('resize', this.resizeNav);
    }

    getDate = () => {
        var date = new Date();
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var currWeekday = weekDays[date.getDay()];
        var currDate = months[date.getMonth()] + ' ' + date.getDate();

        return(
            <h1>
                <span>{currWeekday+','}</span>
                <span>{currDate}</span>
            </h1>
        );
    }

    search = (el) => {
        el.preventDefault();
        var searchInput = el.target.querySelector('input');
        window.open(`https://www.google.com/search?q=${searchInput.value} site:ign.com`, '_blank');
        searchInput.value = '';
    }

    resizeNav = () => {
        var selectionEl = this.state.selectionListRef.current;
        var averageWidth = 85;
        var numVisibleItems = selectionEl.offsetWidth / averageWidth;
        var visibleItems = this.state.selectionItems.slice(0, numVisibleItems);
        var hiddenItems = this.state.selectionItems.slice(numVisibleItems);

        this.setState({ visibleItems, hiddenItems });
    }

    render() {
        return(
            <Nav_Container>
                <Nav_SubContainer>
                    <Date_Logo>
                        <StyledLogo/>
                        {this.getDate()}
                    </Date_Logo>
                    <ContentSelection>
                        <SelectionList ref={this.state.selectionListRef}>
                            {this.state.visibleItems.map((item) => (
                                <a href={item.link} key={item.id}>{item.title}</a>
                            ))}
                        </SelectionList>
                        <SelectionList_More>
                            <h1>More</h1>
                            <Caret_Down/>
                            <div>
                                {this.state.hiddenItems.map(item => (
                                    <a href={item.link} key={item.id}>{item.title}</a>
                                ))}
                            </div>
                        </SelectionList_More>
                        <SearchBox ref={this.state.searchRef} open={this.state.openSearchBar}>
                            <button type='button' onClick={() => this.setState({ openSearchBar: !this.state.openSearchBar })}><Magnifying_Glass/></button>
                            <input type='text' placeholder="The Last of Us 2 Review"/>
                        </SearchBox>
                        <ThemeSelection activeTheme={this.props.activeTheme} onClick={this.props.toggleTheme}>
                            <div>
                                {this.props.activeTheme == 'classic' ? <Sun/> : <Moon/>}
                            </div>
                        </ThemeSelection>
                        <Profile>
                            <img src={ProfileImg} />
                            <h1>12</h1>
                        </Profile>
                    </ContentSelection>
                </Nav_SubContainer>
                <Nav_SubContainer>
                    {/* Additiona Content Selection */}
                </Nav_SubContainer>
            </Nav_Container>
        );
    }
}
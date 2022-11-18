import React from "react";

import {
    StyledSearchBar,
    StyledAutoCompleteItem,
    StyledLoadingAutoCompleteItem
} from './styles/SearchBar.styled';

import Magnifying_Glass from "../assets/icons/magnifying_glass";

class AutoCompleteItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamePlatforms: null,
        }
    }

    componentDidMount() {
        this.getPlatforms(this.props.itemProps.parent_platforms);
        
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemProps !== this.props.itemProps) {
            this.getPlatforms(this.props.itemProps.parent_platforms);
        }
    }

    async getPlatforms(platforms = []) {
        var otherPlatforms = 0;
        var platformImports = await Promise.allSettled(platforms.map(async (platform) => {
            try {
                var platformImport = await import(`../assets/icons/platforms/${platform.platform.slug}`);
                var platformItem = await React.lazy( async () => platformImport);
                return platformItem;
            }catch(err) {
                return Promise.reject();
            }
        }))
        var filteredPlatforms = platformImports.filter(platform => {
            if(platform.status === 'rejected')
                otherPlatforms += 1;
            return platform.status === 'fulfilled';
        })
        var gamePlatforms = filteredPlatforms.map(platform => platform.value);
        if(otherPlatforms > 0)
            gamePlatforms.push(() => React.createElement('h1', null, `+ ${otherPlatforms}`));
        this.setState({ gamePlatforms });
    }

    render() {
        const { gamePlatforms } = this.state;
        if(gamePlatforms === null)
            return(<StyledLoadingAutoCompleteItem/>);
        return(<StyledAutoCompleteItem
            onClick={this.props.onClick}
        >
            <div className="AutoComplete-Img">
                {this.props.itemProps.background_image ? <img src={this.props.itemProps.background_image} /> : <Magnifying_Glass/>}
            </div>
            <div className="AutoComplete-Info">
                <div>
                    {this.state.gamePlatforms.map((Item, index) => (<Item key={index}/>))}
                </div>
                <h1>{this.props.itemProps.name}</h1>
            </div>
        </StyledAutoCompleteItem>);
    }
}

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarRef: React.createRef(),
            openSearchBar: false,
            searchInputFocused: false,
            autoCompleteItems: null,
        }
    }

    toggleSearchFocus = (event) => {
        if(event.type === 'blur') {
            const searchForm = this.state.searchBarRef.current;
            requestAnimationFrame(() => {
                const newTarget = document.activeElement;
                if(searchForm.contains(newTarget)) 
                    newTarget.click();
                this.setState(prevState => ({ searchInputFocused: !prevState.searchInputFocused }));
            })
        }else{
            if(this.state.autoCompleteItems === null)
                this.props.onInput(event);
            this.setState(prevState => ({ searchInputFocused: !prevState.searchInputFocused }));
        }
    }

    selectAutoComplete = (event) => {
        var searchStr = event.currentTarget.querySelector('h1').innerText;
        var searchBarRef = this.state.searchBarRef.current;
        var inputEl = searchBarRef.querySelector('input');
        inputEl.value = searchStr;
        searchBarRef.dispatchEvent(new Event('submit'));
    }

    render() {
        return(<StyledSearchBar
            ref={this.state.searchBarRef} 
            open={this.state.openSearchBar} 
            searchInputFocused={this.state.searchInputFocused}
            autoCompleteLen={this.state.autoCompleteItems ? this.state.autoCompleteItems.length : '0'}
            onSubmit={this.props.onSubmit}
        >
            <div className="searchForm">
                <button type='button' onClick={() => this.setState(prevState => ({ openSearchBar: !prevState.openSearchBar }))}>
                    <Magnifying_Glass/>
                </button>
                <input 
                    type='text' 
                    placeholder="The Last of Us 2 Review" 
                    tabIndex='-1' 
                    onInput={this.props.onInput}
                    onFocus={this.toggleSearchFocus}
                    onBlur={this.toggleSearchFocus}
                />
            </div>
            <div className="searchAutoComplete">
                {this.state.autoCompleteItems && this.state.autoCompleteItems.map(item => (
                    <AutoCompleteItem
                        key={item.id}
                        itemProps={item}
                        onClick={this.selectAutoComplete}
                    />
                ))}
            </div>
        </StyledSearchBar>);
    }
}

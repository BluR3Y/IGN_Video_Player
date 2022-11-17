import React from "react";

import {
    StyledSearchBar,
    AutoCompleteItem,
} from './styles/SearchBar.styled';

import Magnifying_Glass from "../assets/icons/magnifying_glass";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarRef: React.createRef(),
            openSearchBar: false,
            searchInputFocused: false,
            autoCompleteItems: [],
        }
    }

    componentDidMount() {
        var searchForm = this.state.searchBarRef.current;
        var searchInput = searchForm.querySelector('input');
        searchForm.addEventListener('submit', this.props.onSubmit);
        searchInput.addEventListener('input', this.props.onInput);
        searchInput.addEventListener('focus', this.toggleSearchFocus);
        searchInput.addEventListener('blur', this.toggleSearchFocus);
    }

    componentWillUnmount() {
        var searchForm = this.state.searchBarRef.current;
        var searchInput = searchForm.querySelector('input');
        searchForm.removeEventListener('submit', this.props.onSubmit);
        searchInput.removeEventListener('input', this.props.onInput);
        searchInput.removeEventListener('focus', this.toggleSearchFocus);
        searchInput.removeEventListener('blur', this.toggleSearchFocus);
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
            if(event.currentTarget.value === '')
                event.currentTarget.dispatchEvent(new Event('input'));
            this.setState(prevState => ({ searchInputFocused: !prevState.searchInputFocused }));
        }
    }

    selectAutoComplete = (event) => {
        var searchStr = event.currentTarget.querySelector('h1').innerHTML;
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
            autoCompleteLen={this.state.autoCompleteItems.length}
        >
            <div className="searchForm">
                <button type='button' onClick={() => this.setState(prevState => ({ openSearchBar: !prevState.openSearchBar }))}>
                    <Magnifying_Glass/>
                </button>
                <input 
                    type='text' 
                    placeholder="The Last of Us 2 Review" 
                    tabIndex='-1' 
                />
            </div>
            <div className="searchAutoComplete">
                {this.state.autoCompleteItems.map(item => (
                    <AutoCompleteItem 
                        key={item.id}
                        onClick={this.selectAutoComplete}
                        tabIndex='0'
                        itemProps={item}
                    >
                        <div>
                            {item.background_image ? <img src={item.background_image} /> : <Magnifying_Glass/>}
                        </div>
                        <h1>{item.name}</h1>
                    </AutoCompleteItem>
                ))}
            </div>
        </StyledSearchBar>);
    }
}

// SearchBar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.css';
import Profile from '../Profile/Profile';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch suggestions based on the search term
    if (searchTerm.trim() !== '') {
      axios.get(`http://localhost:8086/api/v1/users/all`)
        .then(response => {
          const filteredSuggestions = response.data.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    axios.get(`http://localhost:8086/api/v1/users/search/${searchTerm}`)
      .then(response => {
        const searchedUser = response.data; // Assuming response.data contains the user data
        onSearch(<Profile friendId={searchedUser.userid} />);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]); // Clear suggestions when suggestion clicked
    onSearch(
      <Profile friendId={suggestion.userid} />
    );
  };

  return (
    <div className='search-container'>
    
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <AiOutlineSearch className="search-icon" onClick={handleSubmit} />
      </div>
      {/* Only render suggestions if search term is not empty */}
      <div className='suggestion-conatiner'>
      {searchTerm.trim() !== '' && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <img src={suggestion.profile_picture} alt="Profile" className="profile-photo"/>
              <span>{suggestion.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default SearchBar;

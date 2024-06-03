import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState();
  const avatar = localStorage.getItem("avatar")

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
  
      try {
        console.log("Fetching data..."); // Debugging log

        const response = await axios.get(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData()
  }, [])

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ folders: [], courses: [], users: [] });

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`http://localhost:8000/other/search/${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults({ folders: [], courses: [], users: [] });
    }
  };

  return (
    <div className="pfnavigation">
      <div className="pfnavigation__logo" onClick={() => navigate("/")}>
        <img
          src="/img/cake-logo-small.png"
          alt=""
          className="pfnavigation__logo-img"
        />
        <div className="pfnavigation__brand">Cake</div>
      </div>
      <div className="pfnavigation__search-box">
        <svg className="mnavigation__search-box-icon">
          <use xlinkHref="/img/symbol-defs.svg#icon-search"></use>
        </svg>
        <input
          className="pfnavigation__search-box-bar"
          type="text"
          placeholder="Search for folders, courses"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <div className="search-popup">
            {searchResults.folders.length > 0 && (
              <div>
                <h3>Folders ({searchResults.folders.length})</h3>
                <ul>
                  {searchResults.folders.map((folder) => (
                    <li key={folder._id} onClick={() => navigate(`/folder/${folder._id}`)}>
                      {folder.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchResults.courses.length > 0 && (
              <div>
                <h3>Courses ({searchResults.courses.length})</h3>
                <ul>
                  {searchResults.courses.map((course) => (
                    <li key={course._id} onClick={() => navigate(`/course/${course._id}`)}>
                      {course.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchResults.users.length > 0 && (
              <div>
                <h3>Users ({searchResults.users.length})</h3>
                <ul>
                  {searchResults.users.map((user) => (
                    <li key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
                      {user.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchResults.folders.length === 0 && 
             searchResults.courses.length === 0 &&
             searchResults.users.length === 0 && (
              <div>No results found.</div>
            )}
          </div>
        )}
      </div>
      <ul className="pfnavigation__link">
        <div className="pfnavigation__dropdown">
          <button onClick={() => setDropdownVisible(!dropdownVisible)} className="pfnavigation__dropdown-button">
            <span>My Library</span>
            <svg width="28" className="mform__month--arrow-brown" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
            </svg>
          </button>
          {dropdownVisible && (
            <div ref={dropdownRef} className="pfnavigation__dropdown-content">
              <div className="pfnavigation__dropdown-column">
                <h3>Courses</h3>
                <ul>
                  {user?.courses.slice(0, 5).map(course => (
                    <li key={course._id}>
                      <a href={`/course/${course._id}`}>{course.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pfnavigation__dropdown-column">
                <h3>Folders</h3>
                <ul>
                  {user?.folders.slice(0, 5).map(folder => (
                    <li key={folder._id}>
                      <a href={`/folder/${folder._id}`}>{folder.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <li className="pfnavigation__link-btn">
          <a className="pfnavigation__link-btn-a" href="#">
            Help Center
          </a>
        </li>
        {avatar !== 'http://localhost:8000/other/image/null' ? (
          <img className="pfnavigation__avatar" src={avatar} alt="User Avatar" onClick={() => navigate(`/profile/${userId}`)} />
        ) : (
          <img className="pfnavigation__avatar" src="/img/avatar.jpeg" alt="Default Avatar" onClick={() => navigate(`/profile/${userId}`)} />
        )}
      </ul>
    </div>
  );
}

export default Header;

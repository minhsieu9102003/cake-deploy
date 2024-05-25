import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

function Header() {
  const navigate = useNavigate();
  useEffect(() => {
    gsap.to(".myElement", {
      scrollTrigger: {
        trigger: ".myElement",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
      x: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".myElement",
        start: "top center",
        toggleActions: "play none none none",
      },
    });
    tl.to(".myElement", { x: 100 });

    return () => {
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const navigationDropdown = useRef(null);
  const [status, setStatus] = useState(false);
  const tl = useRef(
    gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.6,
        ease: "power4.inOut",
      },
    })
  );

  useEffect(() => {
    // Set up the GSAP animation timeline
    tl.current.to(".navigation__dropdown-list", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });
  }, []);

  const toggleDropdown = () => {
    if (!status) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
    setStatus(!status);
  };

  const token = localStorage.getItem("token");
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
                  <h3>Folders</h3>
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
                  <h3>Courses</h3>
                  <ul>
                    {searchResults.courses.map((course) => (
                      <li key={course._id} onClick={() => navigate(`/course/${course._id}`)}>
                        {course.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {searchResults.folders.length === 0 && 
               searchResults.courses.length === 0 && (
                <div>No results found.</div>
              )}
            </div>
          )}
        </div>
        <ul className="pfnavigation__link">
          <div className="pfnavigation__dropdown">
            <button onClick={toggleDropdown} ref={navigationDropdown}>
              <span>Your library</span>
              <svg width="28" className="mform__month--arrow-brown" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
              </svg>
            </button>
            <ul className="pfnavigation__dropdown-list">
              <div className="pfnavigation__dropdown-button-container">
                <button className="pfnavigation__dropdown-button navigation__dropdown-button-1">
                  Flash-slices
                </button>
                <button className="pfnavigation__dropdown-button navigation__dropdown-button-2">
                  Quick-bites
                </button>
              </div>
              <div className="pfnavigation__dropdown-item-container">
                <a href="#" className="pfnavigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src="/img/avatar1.png" alt="" />
                </a>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="pfnavigation__dropdown-item">
                    <h6>Animals</h6>
                    <img src="/img/avatar1.png" alt="" />
                  </div>
                ))}
              </div>
              <a className="pfnavigation__dropdown-all" href="#">
                All
              </a>
            </ul>
          </div>
          <li className="pfnavigation__link-btn">
            <a className="pfnavigation__link-btn-a" href="#">
              Help Center
            </a>
          </li>
          <img className="pfnavigation__avatar" src="/img/avatar2.png" alt="" onClick={() => navigate('/profile')}/>
        </ul>
      </div>
  );
}

export default Header;

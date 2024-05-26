import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "./style.css"; // Assuming you'll also style it using Main.css

const Main = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ folders: [], courses: [], users: [] });

  useEffect(() => {
    if (token && userId) {
      // alert(`Welcome, User ID: ${userId}\nYour token: ${token}`);
    } else {
      alert("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [token, userId, navigate]);

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

  const mnavigationDropdown = useRef(null);
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
    tl.current.to(".mnavigation__dropdown-list", {
      transform: "scaleY(1)",
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("latest");
  const [isDropdownOpenBrown, setDropdownOpenBrown] = useState(false);
  const [selectedValueBrown, setSelectedValueBrown] = useState("latest");

  const toggleDropdown1 = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownBrown = () => {
    setDropdownOpenBrown(!isDropdownOpenBrown);
  };

  const selectOption = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false);
  };

  const selectOptionBrown = (value) => {
    setSelectedValueBrown(value);
    setDropdownOpenBrown(false);
  };

  const handleAvatarClick = () => {
    navigate(`/profile`, { state: { token, userId } });
  };

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
    <div className="mall">
      <Header />

      <section className="mmainn">
        <div className="myellow">

          <div className="mmain__top">
            <h1 className="myellow__header">My folders</h1>
            <div className="mform__month">
              <button className="mform__month--button" onClick={toggleDropdown1} role="combobox" aria-labelledby="select button"
                aria-haspopup="listbox" aria-expanded={isDropdownOpen} aria-controls="select-dropdown">
                <span className="mform__month--selected-value">latest</span>
                {/* SVG code for the button */}
                <svg width="28" className="mform__month--arrow" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="mform__month--dropdown" onClick={toggleDropdown1} role="listbox" id="select-dropdown">
                  <li role="option" onClick={() => selectOption("latest")}>
                    <input type="radio" id="jan" name="social-account" />
                    <label htmlFor="jan">latest</label>
                  </li>
                  <li role="option" onClick={() => selectOption("most used")}>
                    <input type="radio" id="feb" name="social-account" />
                    <label htmlFor="feb">most used</label>
                  </li>
                  <li role="option" onClick={() => selectOption("oldest")}>
                    <input type="radio" id="mar" name="social-account" />
                    <label htmlFor="mar">oldest</label>
                  </li>
                </ul>
              )}
            </div>
            <button className="myellow__add">
              {/* SVG for the add button */}
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17.25 35.5V36.5H19.25V35.5V19.25H35.5H36.5V17.25H35.5H19.25V1V0H17.25V1V17.25H1H0V19.25H1H17.25V35.5Z"
                  fill="#734A4A" />
              </svg>
            </button>
          </div>


          <div className="myellow__card-container">
            {/* Card containers with repeated card structures */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="mcard">
                <div className="mcard__side">
                  <div className="mcard__side mcard__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div className="mcard__side mcard__side--back mcard__side--back-1">
                    <h4>Animals</h4>
                    <h5>50 quizzes</h5>
                    <div>
                      <img src="img/avatar1.png" alt="" />
                      <h6>anhlenguyen</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mbrown">
          <div className="mbrown__top">

            <h1 className="mbrown__header">My courses</h1>
            <div className="mform__month-brown">
              <button className="mform__month--button-brown" onClick={toggleDropdownBrown} role="combobox" aria-labelledby="select button"
                aria-haspopup="listbox" aria-expanded={isDropdownOpenBrown} aria-controls="select-dropdown">
                <span className="mform__month--selected-value-brown">latest</span>
                {/* SVG code for the button */}
                <svg width="28" className="mform__month--arrow-brown" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
                </svg>
              </button>
              {isDropdownOpenBrown && (
                <ul className="mform__month--dropdown-brown" onClick={toggleDropdownBrown} role="listbox" id="select-dropdown">
                  <li role="option" onClick={() => selectOptionBrown("latest")}>
                    <input type="radio" id="jan" name="social-account" />
                    <label htmlFor="jan">latest</label>
                  </li>
                  <li role="option" onClick={() => selectOptionBrown("most used")}>
                    <input type="radio" id="feb" name="social-account" />
                    <label htmlFor="feb">most used</label>
                  </li>
                  <li role="option" onClick={() => selectOptionBrown("oldest")}>
                    <input type="radio" id="mar" name="social-account" />
                    <label htmlFor="mar">oldest</label>
                  </li>
                </ul>
              )}
            </div>
            <button className="mbrown__add">
              {/* SVG for the add button */}
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17.25 35.5V36.5H19.25V35.5V19.25H35.5H36.5V17.25H35.5H19.25V1V0H17.25V1V17.25H1H0V19.25H1H17.25V35.5Z"
                  fill="#734A4A" />
              </svg>
            </button>
          </div>

          <div className="mbrown__card-container">
            {/* Card containers with repeated card structures */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="mcard">
                <div className="mcard__side">
                  <div className="mcard__side mcard__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div className="mcard__side mcard__side--back mcard__side--back-1">
                    <h4>Animals</h4>
                    <h5>50 quizzes</h5>
                    <div>
                      <img src="img/avatar1.png" alt="" />
                      <h6>anhlenguyen</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Main;

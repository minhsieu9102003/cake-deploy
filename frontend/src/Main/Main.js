import React, { useEffect, useRef, useState } from "react";

import Login from "../Login/Login";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { Link } from 'react-router-dom';
import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Assuming you'll also style it using Main.css

const Main = (User) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && userId) {
      alert(`Welcome, User ID: ${userId}\nYour token: ${token}`);
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
    const lenis = new window.Lenis({
      lerp: 0.1,
      smooth: true,
      inertia: 0.75,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
    navigate(`/folder`, { state: { token, userId } });
  };
  return (
    <div className="all">
      <div className="navigation">
        <div className="navigation__logo">
          <img
            src="img/cake-logo-small.png"
            alt=""
            className="navigation__logo-img"
          />
          <div className="navigation__brand">Cake</div>
        </div>

        <div className="navigation__search-box">
          <svg className="navigation__search-box-icon">
            <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
          </svg>
          <input
            className="navigation__search-box-bar"
            type="text"
            placeholder="Search for folders, tutor,.."
          />
        </div>

        <ul className="navigation__link">
          <div className="navigation__dropdown">
            <button onClick={toggleDropdown} ref={navigationDropdown}>
              <span>Your library</span>
              <svg
                width="28"
                className="form__month--arrow-brown"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z"
                  fill="#734A4A"
                />
              </svg>
            </button>
            <ul className="navigation__dropdown-list">
              <div className="navigation__dropdown-button-container">
                <button className="navigation__dropdown-button navigation__dropdown-button-1">
                  Flash-slices
                </button>
                <button className="navigation__dropdown-button navigation__dropdown-button-2">
                  Quick-bites
                </button>
              </div>
              <div className="navigation__dropdown-item-container">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="navigation__dropdown-item">
                    <h6>Animals</h6>
                    <img src="img/avatar1.png" alt="" />
                  </div>
                ))}
              </div>
              <a className="navigation__dropdown-all" href="#">
                All
              </a>
            </ul>
          </div>

          <li className="navigation__link-btn">
            <a className="navigation__link-btn-a" href="#">
              Help Center
            </a>
          </li>
          <li className="navigation__link-btn">
            <a className="navigation__link-btn-a" href="#">
              Language: VN
            </a>
          </li>
          <img
            className="navigation__avatar"
            src="img/avatar2.png"
            alt="User Avatar"
            onClick={handleAvatarClick}
          />
        </ul>
      </div>
      <section className="main">
        <div className="yellow">
          <img src="img/bg1.PNG" alt="" className="yellow__bg" />
          <h1 className="yellow__header">Quick-bites</h1>
          <div className="form__month">
            <button
              className="form__month--button"
              onClick={toggleDropdown1}
              role="combobox"
              aria-labelledby="select button"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-controls="select-dropdown"
            >
              <span className="form__month--selected-value">latest</span>
              {/* SVG code for the button */}
              <svg
                width="28"
                class="form__month--arrow"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z"
                  fill="#734A4A"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul
                className="form__month--dropdown"
                onClick={toggleDropdown1}
                role="listbox"
                id="select-dropdown"
              >
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
          <button className="yellow__add">
            {/* SVG for the add button */}
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.25 35.5V36.5H19.25V35.5V19.25H35.5H36.5V17.25H35.5H19.25V1V0H17.25V1V17.25H1H0V19.25H1H17.25V35.5Z"
                fill="#734A4A"
              />
            </svg>
          </button>
          <div className="yellow__card-container">
            {/* Card containers with repeated card structures */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div class="card">
                <div class="card__side">
                  <div class="card__side card__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div class="card__side card__side--back card__side--back-1">
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
        <div className="brown">
          <img src="img/bg2.PNG" alt="" className="brown__bg" />
          <h1 className="brown__header">Flash-slices</h1>
          <div className="form__month-brown">
            <button
              className="form__month--button-brown"
              onClick={toggleDropdownBrown}
              role="combobox"
              aria-labelledby="select button"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpenBrown}
              aria-controls="select-dropdown"
            >
              <span className="form__month--selected-value-brown">latest</span>
              {/* SVG code for the button */}
              <svg
                width="28"
                class="form__month--arrow-brown"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z"
                  fill="#734A4A"
                />
              </svg>
            </button>
            {isDropdownOpenBrown && (
              <ul
                className="form__month--dropdown-brown"
                onClick={toggleDropdownBrown}
                role="listbox"
                id="select-dropdown"
              >
                <li role="option" onClick={() => selectOptionBrown("latest")}>
                  <input type="radio" id="jan" name="social-account" />
                  <label htmlFor="jan">latest</label>
                </li>
                <li
                  role="option"
                  onClick={() => selectOptionBrown("most used")}
                >
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
          <button className="brown__add">
            {/* SVG for the add button */}
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.25 35.5V36.5H19.25V35.5V19.25H35.5H36.5V17.25H35.5H19.25V1V0H17.25V1V17.25H1H0V19.25H1H17.25V35.5Z"
                fill="#734A4A"
              />
            </svg>
          </button>
          <div className="brown__card-container">
            {/* Card containers with repeated card structures */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div class="card">
                <div class="card__side">
                  <div class="card__side card__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div class="card__side card__side--back card__side--back-1">
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
      <footer className="footer">
        <div className="footer__img-container">
          <img
            src="img/cake-logo-big.png"
            alt="Large Cake Logo"
            className="footer__logo"
          />
          <h1 className="footer__brand">CAKE</h1>
        </div>
        <div className="footer__text-container">
          <h3 className="footer__h3-author">Author</h3>
          <h4 className="footer__h4-author-1">minh</h4>
          <h4 className="footer__h4-author-2">minh</h4>
          <h4 className="footer__h4-author-3">minh</h4>
          <h4 className="footer__h4-author-4">nam</h4>
          <h3 className="footer__h3-about">About CAKE</h3>
          <h4 className="footer__h4-about-1">How CAKE works</h4>
          <h4 className="footer__h4-about-2">Q&A</h4>
          <h3 className="footer__h3-term-of-use">Terms of Use</h3>
          <h4 className="footer__h4-term-of-use">Terms & Privacy</h4>
        </div>
        <div className="footer__text-container-1">
          <h3 className="footer__h3-acknowledge">University Acknowledgement</h3>
          <h4 className="footer__h4-acknowledge">
            A project for Hanoi University of Science and Technology's Web
            Subject Course
          </h4>
        </div>
      </footer>
    </div>
  );
};

export default Main;

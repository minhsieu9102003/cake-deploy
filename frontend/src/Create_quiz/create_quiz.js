import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { Link } from 'react-router-dom';
import Lenis from "@studio-freight/lenis";
import "./style.css";

const Create_quiz = () => {
  const navigate = useNavigate();
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [customSelectActive, setCustomSelectActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("latest");
  const [selectedValueBrown, setSelectedValueBrown] = useState("latest");
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
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: "power4.inOut",
      },
    });

    tl.to(".navigation__dropdown-list", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });

    tl.paused(true);

    if (dropdownStatus) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [dropdownStatus]);

  const handleDropdownClick = () => {
    setDropdownStatus(!dropdownStatus);
  };

  const handleSelectClick = () => {
    setCustomSelectActive(!customSelectActive);
  };

  const handleOptionClick = (event) => {
    setSelectedValue(event.currentTarget.querySelector("label").textContent);
    setCustomSelectActive(false);
  };

  const handleOptionClickBrown = (event) => {
    setSelectedValueBrown(
      event.currentTarget.querySelector("label").textContent
    );
    setCustomSelectActive(false);
  };

  const handlePopupClick = () => {
    setPopupStatus(true);
  };

  const handleClosePopup = () => {
    setPopupStatus(false);
  };

  return (
    <div>
      <div className="navigation">
        <div className="navigation__logo" onClick={() => navigate("/")}>
          <img
            src="img/cake-logo-small.png"
            alt=""
            className="navigation__logo-img"
          />
          <div className="navigation__brand">Cake</div>
        </div>

        <div className="navigation__search-box">
          <svg
            className="navigation__search-box-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z" />
          </svg>
          <input
            className="navigation__search-box-bar"
            type="text"
            placeholder="Search for folders, tutor,.."
          />
        </div>

        <ul className="navigation__link">
          <div className="navigation__dropdown">
            <button onClick={handleDropdownClick}>
              <span>Your library</span>
              <svg
                width="15"
                className="form__month--arrow-brown"
                height="15"
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
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="navigation__dropdown-item">
                    <h6>Animals</h6>
                    <img src="img/avatar2.png" alt="" />
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
          <img className="navigation__avatar" src="img/avatar2.png" alt="" />
        </ul>
      </div>

      <div className="first">
        <div className="first__heading">
          <div className="first__title">
            <h1>Quick-bites</h1>
            <svg
              className="first__paw"
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M189.02051,145.33984A31.35052,31.35052,0,0,1,174.0918,126.606a47.99847,47.99847,0,0,0-92.18262-.00635,31.35,31.35,0,0,1-14.92969,18.74023,44.00739,44.00739,0,0,0,38.11719,79.21094,60.16331,60.16331,0,0,1,45.80664,0,44.00678,44.00678,0,0,0,38.11719-79.21094ZM168,204a19.86485,19.86485,0,0,1-7.80078-1.57568c-.04395-.019-.08887-.0376-.13379-.05616a84.02637,84.02637,0,0,0-64.13086,0c-.04492.01856-.08984.03711-.13379.05616a20.00673,20.00673,0,0,1-17.31445-36.02246c.03515-.01954.07129-.03907.10644-.05909A55.21137,55.21137,0,0,0,104.957,133.29541a23.99908,23.99908,0,0,1,46.08887.00439,55.20367,55.20367,0,0,0,26.36133,33.043c.03515.02.07129.03955.10644.05909A20.00364,20.00364,0,0,1,168,204Zm64-100a24,24,0,1,1-24-24A23.99994,23.99994,0,0,1,232,104ZM48,128a24,24,0,1,1,24-24A23.99994,23.99994,0,0,1,48,128ZM72,56A24,24,0,1,1,96,80,23.99994,23.99994,0,0,1,72,56Zm64,0a24,24,0,1,1,24,24A23.99994,23.99994,0,0,1,136,56Z" />
            </svg>
          </div>

          <svg
            className="first__back"
            onClick={() => navigate(-1)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <style>
              {`
                              .st0 {
                                  display: none;
                              }
                              .st1 {
                                  display: inline;
                              }
                          `}
            </style>
            <g id="_x34__1_">
              <path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" />
            </g>
          </svg>
        </div>
        <div className="first__description">Create a new 'bites'</div>
        <form action="" className="first__form">
          <input
            type="text"
            placeholder="Enter your quizzes' title"
            className="first__title-input"
          />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="first__card-input">
              <div className="first__card-input-top">
                <div className="first__card-input-top-number">
                  <span>{i + 1}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                  <path
                    style={{ fill: "rgb(166, 166, 166)" }}
                    d="M6 1h13v1H6zM23 3H2v1h2v18.5A1.502 1.502 0 0 0 5.5 24h14a1.502 1.502 0 0 0 1.5-1.5V4h2zM9 20H8V7h1zm4 0h-1V7h1zm4 0h-1V7h1z"
                  />
                </svg>
              </div>
              <div className="first__card-input-bot">
                <div className="first__word-input">
                  <input type="text" id={`quizzTitle${i + 1}`} />
                  <label htmlFor={`quizzTitle${i + 1}`}>Word</label>
                </div>
                <div className="first__meaning-input">
                  <input type="text" id={`quizzMeaning${i + 1}`} />
                  <label htmlFor={`quizzMeaning${i + 1}`}>Meaning</label>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="first__plus"
            onClick={handlePopupClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
              <path
                style={{ fill: "rgb(193, 193, 193)" }}
                d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"
              />
            </svg>
          </button>
          <div className="first__submit-container">
            <button className="first__submit" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      <footer className="footer">
        <div className="footer__img-container">
          <img src="img/cake-logo-big.png" alt="" className="footer__logo" />
          <h1 className="footer__brand">CAKE</h1>
        </div>
        <div className="footer__text-container">
          <h3 className="footer__h3-author">Author</h3>
          {["minh", "minh", "minh", "nam"].map((author, i) => (
            <h4 key={i} className={`footer__h4-author-${i + 1}`}>
              {author}
            </h4>
          ))}
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

export default Create_quiz;

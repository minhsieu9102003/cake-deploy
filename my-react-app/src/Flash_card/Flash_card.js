import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./style.css"; // Adjust the path as necessary
import logo from "./img/cake-logo-small.png";
import avatar1 from "./img/avatar1.png";
import avatar2 from "./img/avatar2.png";
import orangeImage from './img/orange.png';

gsap.registerPlugin(ScrollTrigger);

function FlashCard(){
  useEffect(() => {
    gsap.to(".myElement", {
      scrollTrigger: {
        trigger: ".myElement",
        start: "top center",
        end: "bottom top",
        scrub: true
      },
      x: 100
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.myElement',
        start: 'top center',
        toggleActions: 'play none none none'
      }
    });
    tl.to('.myElement', { x: 100 });
    const lenis = new window.Lenis({
        lerp: 0.1,
        smooth: true,
        inertia: 0.75
    });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);


  return () => {
    lenis.destroy();
    gsap.killTweensOf('*');
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <div>
      <div className="navigation">
        <div className="navigation__logo">
          <img src={logo} alt="" className="navigation__logo-img" />
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
            <button>
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
                <Link to="#" className="navigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src={avatar1} alt="" />
                </Link>
                <div className="navigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src={avatar1} alt="" />
                </div>
                {/* Repeat as necessary */}
              </div>
              <Link className="navigation__dropdown-all" to="#">
                All
              </Link>
            </ul>
          </div>

          <li className="navigation__link-btn">
            <Link className="navigation__link-btn-a" to="#">
              Help Center
            </Link>
          </li>
          <li className="navigation__link-btn">
            <Link className="navigation__link-btn-a" to="#">
              Language: VN
            </Link>
          </li>
          <img className="navigation__avatar" src={avatar2} alt="" />
        </ul>
      </div>

      <section className="main">
        <div className="study__top">
          <h1 className="study__header">Animals</h1>
          <img src={orangeImage} alt="" className="study__cake" />
          <svg
            className="study__pen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20.7,5.537a1.024,1.024,0,0,1,0,1.448L8.527,19.158,3,21l1.842-5.527L17.015,3.3a1.024,1.024,0,0,1,1.448,0Z" />
          </svg>
          <svg
            className="study__arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" />
          </svg>
        </div>

        <div className="study__stats">
          <h6 className="study__stat">30 have enrolled</h6>
          <svg
            className="study__star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333z" />
          </svg>
          <h6 className="study__stat">5.0 (3rate)</h6>
        </div>

        <div className="quiz">
          <div className="quiz__title">
            <div className="quiz__card">
              <div className="card__side">
                <div className="card__side card__side--front">
                  <h1>Cow</h1>
                </div>
                <div className="card__side card__side--back card__side--back-1">
                  <h1>con bò</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="quiz__count">1/50</div>
        </div>

        <div className="author">
          <div className="author__avt">
            <img src={avatar1} alt="" />
            <div className="avt__name">anhlenguyen</div>
          </div>
          <div className="author__time">created in March 13rd 2024</div>
        </div>

        <h1 className="quizzes__header">Cards List</h1>
        <ul className="quizzes__list">
          {/* Map through an array for quizzes list items if available */}
          <li className="quizzes__item">
            <div className="quizzes__title">Cow</div>
            <div className="quizzes__answer">con bò</div>
          </li>
          {/* Repeat for other quizzes */}
        </ul>
      </section>
      <footer className="footer">
        <div className="footer__img-container">
          <img src="img/cake-logo-big.png" alt="Large Cake Logo" className="footer__logo" />
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
          <h4 className="footer__h4-acknowledge">A project for Hanoi University of Science and Technology's Web Subject Course</h4>
        </div>
      </footer>
    </div>
  );
  }

export default FlashCard;

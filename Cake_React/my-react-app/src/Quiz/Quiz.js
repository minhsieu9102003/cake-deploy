import React, { useEffect, useRef, useState } from 'react';

import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//import { Link } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import './style.css';

function Quiz() {
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
    const navigationDropdown = useRef(null);
    const [status, setStatus] = useState(false);
    const tl = useRef(gsap.timeline({
        paused: true,
        defaults: {
            duration: .6,
            ease: 'power4.inOut'
        }
    }));

    useEffect(() => {
        // Set up the GSAP animation timeline
        tl.current.to('.navigation__dropdown-list', {
            transform: 'scaleY(1)'
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

    return (
      <div>
         <div className="navigation">
        <div className="navigation__logo">
            <img src="img/cake-logo-small.png" alt="" className="navigation__logo-img" />
            <div className="navigation__brand">Cake</div>
        </div>

        <div className="navigation__search-box">
            <svg className="navigation__search-box-icon">
            <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
            </svg>
            <input className="navigation__search-box-bar" type="text" placeholder="Search for folders, tutor,.." />
        </div>

        <ul className="navigation__link">
            <div className="navigation__dropdown">
            <button onClick={toggleDropdown} ref={navigationDropdown}>
                <span>Your library</span>
                <svg width="28" className='form__month--arrow-brown' height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
                </svg>
            </button>
            <ul className="navigation__dropdown-list">
                <div className="navigation__dropdown-button-container">
                <button className="navigation__dropdown-button navigation__dropdown-button-1">Flash-slices</button>
                <button className="navigation__dropdown-button navigation__dropdown-button-2">Quick-bites</button>
                </div>
                <div className="navigation__dropdown-item-container">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="navigation__dropdown-item">
                    <h6>Animals</h6>
                    <img src="img/avatar1.png" alt="" />
                    </div>
                ))}
                </div>
                <a className="navigation__dropdown-all" href="#">All</a>
            </ul>
            </div>

            <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Help Center</a></li>
            <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Language: VN</a></li>
            <img className='navigation__avatar' src="img/avatar2.png" alt="" />
        </ul>
        </div>
        <section className="main">
        <div className="study__top">
            <h1 className="study__header">Animals</h1>
            <img src="./img/orange.png" alt="" className="study__cake" />
            <svg className="study__pen">
                <use xlinkHref="img/symbol-defs.svg#icon-edit-3"></use>
            </svg>
            <svg className="study__arrow">
                <use xlinkHref="img/symbol-defs.svg#icon-forward"></use>
            </svg>
        </div>

        <div className="study__stats">
            <svg className="study__group">
                <use xlinkHref="img/symbol-defs.svg#icon-users"></use>
            </svg>
            <h6 className="study__stat">30 have enrolled</h6>
            <svg className="study__star">
                <use xlinkHref="img/symbol-defs.svg#icon-star"></use>
            </svg>
            <h6 className="study__stat">5.0 (3rate)</h6>
        </div>

        <div className="quiz">
            <div className="quiz__title">
                <h1>Cow</h1>
                <svg>
                    <use xlinkHref="img/symbol-defs.svg#icon-lightbulb-o"></use>
                </svg>
            </div>
            <div className="quiz__answers">
                <div className="quiz__answer">con bò</div>
                <div className="quiz__answer">con chó</div>
                <div className="quiz__answer">con gà</div>
                <div className="quiz__answer">con cá</div>
            </div>
            <div className="quiz__count">1/50</div>
            <svg className="quiz__right">
                <use xlinkHref="/img/symbol-defs.svg#icon-angle-right"></use>
            </svg>
            <svg className="quiz__left">
                <use xlinkHref="/img/symbol-defs.svg#icon-angle-right"></use>
            </svg>
        </div>

        <div className="author">
            <div className="author__avt">
                <img src="img/avatar1.png" alt="" />
                <div className="avt__name">anhlenguyen</div>
            </div>
            <div className="author__time">created in March 13rd 2024</div>
        </div>

        <h1 className="quizzes__header">Quizzes List</h1>
        <ul className="quizzes__list">
            <li className="quizzes__item">
                <div className="quizzes__title">Cow</div>
                <div className="quizzes__answer">correct answer</div>
            </li>
            {/* Repeat for each quiz item */}
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
  
  export default Quiz;
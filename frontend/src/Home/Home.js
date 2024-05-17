import React, { useEffect } from "react";
import { useState } from "react";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { Link } from 'react-router-dom';
import Lenis from "@studio-freight/lenis";
import logo from "../img/cake-logo-small.png"; // Ensure images are in the public/img folder
import watermark from "../img/cake-water-mark.png";
import cake1 from "../img/cake1.png";
import cake2 from "../img/cake2.png";
import quickCat from "../img/quick-cat.png";
import flashChef from "../img/flash-chef.png";
import pawWatermark from "../img/paw-water-mark.png";
import hatWatermark from "../img/hat-water-mark.png";
import cakeLogoBig from "../img/cake-logo-big.png";
import "./style.css";
//import  './main.scss'
gsap.registerPlugin(ScrollTrigger);
function Home() {
  const [showLogin, setShowLogin] = useState(false);
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

    // Animate the header
    tl.fromTo(
      ".header",
      { opacity: 0, transform: "translateY(-100px) translateX(-100px)" },
      {
        opacity: 1,
        transform: "translateY(0) translateX(0)",
        ease: "bounce.out",
      }
    );

    // Animate images
    tl.fromTo(
      ".img-1",
      { transform: "translateY(-2000px)" }, // Start from this state
      {
        transform: "translateY(0) rotate(-30deg) scale(.7)", // Animate to this state
        ease: "elastic.out(1,0.3)",
        stagger: 0.2,
        borderRadius: "20px",
        duration: 1,
      }
    ).fromTo(
      ".img-2",
      { transform: "translateY(-2000px)" }, // Start from this state
      {
        transform: "translateY(0) rotate(-40deg) scale(.6)", // Animate to this state
        ease: "elastic.out(1,0.3)",
        stagger: 0.2,
        duration: 1,
      },
      "-=.75"
    );

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

  return (
    <div className="all">
      {/* Navigation */}
      <div className="navigation">
        <div className="navigation__logo">
          <img src={logo} alt="Cake Logo" className="navigation__logo-img" />
          <div className="navigation__brand">Cake</div>
        </div>
        <div className="navigation__search-box">
          <svg className="navigation__search-box-icon">
            <use href="../img/symbol-defs.svg#icon-search"></use>
          </svg>
          <input
            className="navigation__search-box-bar"
            type="text"
            placeholder="Search for folders, tutor,.."
          />
        </div>
        <ul className="navigation__link">
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
          <li className="navigation__link-btn">
            <Link to="/login" className="navigation__link-btn-a">
              Sign in
            </Link>
          </li>
          <li className="navigation__link-btn sign-up">
            <Link to="/signup" className="navigation__link-btn-a sign-up">
              Sign up
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="section">
        <div className="header">
          <h1 className="header__primary">English is just a piece of CAKE</h1>
          <h4 className="header__secondary">
            Dive into CAKE's personalized English learning with expert tutors.
            Enjoy quick progress in a supportive environment. Start your
            simplified journey to fluency today
          </h4>
          <a href="#" className="header__button button--brown button">
            Let's go
          </a>
          <img src={watermark} className="header__img" alt="Watermark" />
        </div>
        <div className="photo-container">
          <img className="img-1 img-ani" src={cake1} alt="Cake Image 1" />
          <img className="img-2 img-ani" src={cake2} alt="Cake Image 2" />
        </div>
      </div>

      {/* Learning Methods Section */}
      <div className="section-2">
        <h1 className="section-2__heading">2 effective learning methods</h1>
        <div className="section-2__main">
          <div className="quick">
            <h3 className="quick__heading">Quick-bites</h3>
            <img src={pawWatermark} className="quick__icon" alt="Paw Icon" />
            <img src={quickCat} className="quick__img" alt="Quick Cat" />
            <p className="quick__text">
              Explore 'Quick Bites' quizzes to boost your English. From grammar
              puzzles to vocabulary tests, these fun, bite-sized challenges fit
              any schedule, offering a flexible way to improve your skills quiz
              by quiz.
            </p>
          </div>
          <div className="flash">
            <h3 className="flash__heading">Flash-slices</h3>
            <img src={hatWatermark} className="flash__icon" alt="Hat Icon" />
            <img src={flashChef} className="flash__img" alt="Flash Chef" />
            <p class="flash__text">
              Introducing 'Flash Slices'—your shortcut to mastering English.
              With each card, tackle vocabulary and grammar quickly, ensuring
              lessons stick. Perfect for rapid learning and recall, 'Flash
              Slices' streamline your English journey
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__img-container">
          <img
            src={cakeLogoBig}
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
}

export default Home;

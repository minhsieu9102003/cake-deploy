import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./style.css";

function Header() {
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

  return (
    <footer className="footer">
      <div className="footer__img-container">
        <img src="/img/cake-logo-big.png" alt="" className="footer__logo" />
        <h1 className="footer__brand">CAKE</h1>
      </div>
      <div className="footer__text-container">
        <h3 className="footer__h3-author">Author</h3>
        <h4 className="footer__h4-author-1">Nguyen Thanh Minh</h4>
        <h4 className="footer__h4-author-2">Tran Binh Minh</h4>
        <h4 className="footer__h4-author-3">Tran Dang Quang Minh</h4>
        <h4 className="footer__h4-author-4">Duong Kim Nam</h4>
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
  );
}

export default Header;

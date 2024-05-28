import React, { useEffect } from "react";
import { useState } from "react";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { Link } from 'react-router-dom';
import Lenis from "@studio-freight/lenis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
gsap.registerPlugin(ScrollTrigger);
function UserDetail() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userId) {
      // alert(`Welcome, User ID: ${userId}\nYour token: ${token}`);
    } else {
      alert("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
      };
        const response = await axios.get("http://localhost:8000/user/${userId}"); 
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();

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

    return () => {
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [token, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
      const response = await axios.put("http://localhost:8000/user/${userId}", user); // Replace USER_ID with actual user ID
      console.log("User updated successfully", response.data);
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <>
      <div className="navigation">
        <div className="navigation__logo" onClick={() => navigate("/")}>
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

      <div className="user-detail">
        <h2>User Details</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleUpdateUser}>
            Update User
          </button>
        </form>
      </div>

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
    </>
  );
}

export default UserDetail;
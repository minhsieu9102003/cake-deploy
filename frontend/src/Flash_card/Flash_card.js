import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Adjust the path as necessary
import logo from "./img/cake-logo-small.png";
import avatar1 from "./img/avatar1.png";
import avatar2 from "./img/avatar2.png";
import orangeImage from './img/orange.png';

gsap.registerPlugin(ScrollTrigger);

function FlashCard() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState([]);
  const { courseId } = useParams(); // Get courseId from URL parameters
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

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


    return () => {

      gsap.killTweensOf('*');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!token || !userId) {
      alert("No token or userId found. Redirecting to login.");
      navigate("/login");
      return;
    }
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8000/cards/course/${courseId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "User-ID": userId,
          }
        });
        console.log('Response:', response);
        if (response.ok) {
          const data = await response.json();
          setCards(data);
          localStorage.setItem(`cards_${courseId}`, JSON.stringify(data));
        } else {
          console.error('Failed to fetch cards');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCards();
  }, [courseId, token]);

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCompletedCards([...completedCards, cards[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="fnavigation">
        <div className="fnavigation__logo">
          <img src={logo} alt="" className="fnavigation__logo-img" />
          <div className="fnavigation__brand">Cake</div>
        </div>

        <div className="fnavigation__search-box">
          <svg
            className="fnavigation__search-box-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z" />
          </svg>
          <input
            className="fnavigation__search-box-bar"
            type="text"
            placeholder="Search for folders, tutor,.."
          />
        </div>

        <ul className="fnavigation__link">
          <div className="fnavigation__dropdown">
            <button>
              <span>Your library</span>
              <svg
                width="15"
                className="fform__month--arrow-brown"
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
            <ul className="fnavigation__dropdown-list">
              <div className="fnavigation__dropdown-button-container">
                <button className="fnavigation__dropdown-button fnavigation__dropdown-button-1">
                  Flash-slices
                </button>
                <button className="fnavigation__dropdown-button fnavigation__dropdown-button-2">
                  Quick-bites
                </button>
              </div>
              <div className="fnavigation__dropdown-item-container">
                <Link to="#" className="fnavigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src={avatar1} alt="" />
                </Link>
                <div className="fnavigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src={avatar1} alt="" />
                </div>
                {/* Repeat as necessary */}
              </div>
              <Link className="fnavigation__dropdown-all" to="#">
                All
              </Link>
            </ul>
          </div>

          <li className="fnavigation__link-btn">
            <Link className="fnavigation__link-btn-a" to="#">
              Help Center
            </Link>
          </li>
          <li className="fnavigation__link-btn">
            <Link className="fnavigation__link-btn-a" to="#">
              Language: VN
            </Link>
          </li>
          <img className="fnavigation__avatar" src={avatar2} alt="" />
        </ul>
      </div>

      <section className="fmain">
        <div className="fstudy__top">
          <h1 className="fstudy__header">Animals</h1>
          <img src={orangeImage} alt="" className="fstudy__cake" />
          <svg
            className="fstudy__pen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20.7,5.537a1.024,1.024,0,0,1,0,1.448L8.527,19.158,3,21l1.842-5.527L17.015,3.3a1.024,1.024,0,0,1,1.448,0Z" />
          </svg>
          <svg
            className="fstudy__arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" />
          </svg>
        </div>

        <div className="fstudy__stats">
          <svg className='fstudy__group' width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z" fill="#fff" /> </g>

          </svg>
          <h6 className="fstudy__stat">30 have enrolled</h6>
          <svg
            className="fstudy__star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333z" />
          </svg>
          <h6 className="fstudy__stat">5.0 (3rate)</h6>
        </div>

        {cards.length > 0 && currentIndex < cards.length && (
          <div className="fquiz">
            <div className="fquiz__title">
              <div className="fquiz__card">
                <div className="fcard__side">
                  <div className="fcard__side fcard__side--front">
                    <h1>{cards[currentIndex].key}</h1>
                  </div>
                  <div className="fcard__side fcard__side--back fcard__side--back-1">
                    <h1>{cards[currentIndex].value}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="fquiz__count">{currentIndex + 1}/{cards.length}</div>
            <button className='fquiz__next' onClick={handleNextCard} disabled={currentIndex >= cards.length - 1}>
              Next Card
            </button>
          </div>
        )}



        <h1 className="fquizzes__header">Cards List</h1>
        <ul className="fquizzes__list">
          {completedCards.map((card, index) => (
            <li key={index} className="fquizzes__item">
              <div className="fquizzes__title">{card.key}</div>
              <div className="fquizzes__answer">{card.value}</div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="ffooter">
        <div className="ffooter__img-container">
          <img src="/img/cake-logo-big.png" alt="Large Cake Logo" className="ffooter__logo" />
          <h1 className="ffooter__brand">CAKE</h1>
        </div>
        <div className="ffooter__text-container">
          <h3 className="ffooter__h3-author">Author</h3>
          <h4 className="ffooter__h4-author-1">minh</h4>
          <h4 className="ffooter__h4-author-2">minh</h4>
          <h4 className="ffooter__h4-author-3">minh</h4>
          <h4 className="ffooter__h4-author-4">nam</h4>
          <h3 className="ffooter__h3-about">About CAKE</h3>
          <h4 className="ffooter__h4-about-1">How CAKE works</h4>
          <h4 className="ffooter__h4-about-2">Q&A</h4>
          <h3 className="ffooter__h3-term-of-use">Terms of Use</h3>
          <h4 className="ffooter__h4-term-of-use">Terms & Privacy</h4>
        </div>
        <div className="ffooter__text-container-1">
          <h3 className="ffooter__h3-acknowledge">University Acknowledgement</h3>
          <h4 className="ffooter__h4-acknowledge">A project for Hanoi University of Science and Technology's Web Subject Course</h4>
        </div>
      </footer>
    </div>
  );
}

export default FlashCard;

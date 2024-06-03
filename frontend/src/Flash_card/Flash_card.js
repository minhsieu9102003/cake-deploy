import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Adjust the path as necessary
import orangeImage from "./img/orange.png";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

function FlashCard() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
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

  useEffect(() => {
    if (!token || !userId) {
      alert("No token or userId found. Redirecting to login.");
      navigate("/login");
      return;
    }
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/courses/${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "User-ID": userId,
            },
          }
        );
        console.log("Response:", response);
        if (response.ok) {
          const data = await response.json();
          setCards(data.cards);
          setTitle(data.title)
          localStorage.setItem(`cards_${courseId}`, JSON.stringify(data.cards));
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCards();
  }, [courseId, token]);

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCompletedCards([...completedCards, cards[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate(`/course/${courseId}`); // Điều hướng tới trang chi tiết khóa học
    }
  };

  return (
    <div>
      <Header />

      <section className="fmain">
        <div className="fstudy__top">
          <h1 className="fstudy__header">{title}</h1>

          <Link to={`/course/${courseId}`} className='flash__back'>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>
          </Link>
        </div>

        <div className="fstudy__stats">
          <svg
            className="fstudy__group"
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z"
                fill="#fff"
              />{" "}
            </g>
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

            <div className="fquiz__count">
              {currentIndex + 1}/{cards.length}
            </div>
            <button
              className="fquiz__next"
              onClick={handleNextCard}
              disabled={currentIndex > cards.length - 1}
            >
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
      <Footer />
    </div>
  );
}

export default FlashCard;

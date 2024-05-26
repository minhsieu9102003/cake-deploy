import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

function CourseDetail() {
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



    return () => {

      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const [cards, setCards] = useState([]);
  const { courseId } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

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

  return (
    <>
      <Header />

      <div style={{backgroundColor: "#FFEA7C"}}>
        <div className='course-detail__top'>
          <h1 className='course-detail__name'>Course [gì gì đó]</h1>
          <div className="buttons-container">
            <button className="flash-button"><Link to={`/flash_card/${courseId}`}>Go to Flash Cards</Link></button>
            <button className="quiz-button"><Link to={`/quiz/${courseId}`}>Go to Quiz</Link></button>
          </div>
        </div>


        <h2 className="cards-title">Cards Data</h2>
        <div className="cards-container">
          {cards.map(card => (
            <div className="card" key={card._id}>
              <div className="card-key">{card.key}</div>
              <div className="card-value">{card.value}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CourseDetail;
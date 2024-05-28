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

  const [course, setCourse] = useState();
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
    const fetchCourse = async () => {
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
          setCourse(data);
          localStorage.setItem(`cards_${courseId}`, JSON.stringify(data));
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCourse();
  }, [courseId, token]);

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#FFEA7C" }}>
        <div className="course-detail__top">
          <div className='course-detail-top-container'>
            <h1 className="course-detail__name">Course: {course?.title}</h1>
            <Link to={`/update_course/${courseId}`}>
              <svg
                className="xstudy__pen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M20.7,5.537a1.024,1.024,0,0,1,0,1.448L8.527,19.158,3,21l1.842-5.527L17.015,3.3a1.024,1.024,0,0,1,1.448,0Z" />
              </svg>
            </Link>
            <Link to={`/profile`}>
              <svg
                className="xstudy__arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"

              >
                <path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" />
              </svg>
            </Link>
          </div>
          <div className="buttons-container">
            <button className="flash-button">
              <Link to={`/flash_card/${courseId}`}>Go to Flash Cards</Link>
            </button>
            <button className="quiz-button">
              <Link to={`/quiz/${courseId}`}>Go to Quiz</Link>
            </button>

          </div>
        </div>
        <h2 className='course-detail__desc'>{course?.description}</h2>
        <h2 className="cards-title">Cards Data</h2>
        <div className="cards-container">
          {course?.cards?.map((card) => (
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

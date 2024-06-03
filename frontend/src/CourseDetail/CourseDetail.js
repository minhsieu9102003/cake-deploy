import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [isUser, setIsUser] = useState(false);
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
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          setIsUser(userId === data.userId)
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
            {isUser && (
              <Link to={`/update_course/${courseId}`} className='pencil-container'>
                <svg
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
                      d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                      stroke="#7a4a4a"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />{" "}
                  </g>
                </svg>
              </Link>
            )}
            <svg className="xstudy__arrow" onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>

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

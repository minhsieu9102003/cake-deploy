import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Update_quiz = () => {
  const navigate = useNavigate();
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [count, setCount] = useState(4);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listCard, setListCard] = useState([]);

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
  const navigationDropdown = useRef(null);
  const [status, setStatus] = useState(false);
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
      clipPath: "polygon(0 0, 100% 0,100% 100%, 0 100% )",
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

  const handleDropdownClick = () => {
    setDropdownStatus(!dropdownStatus);
  };

  const handlePopupClick = () => {
    setCount(count + 1);
  };

  // const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { courseId } = useParams();

  useEffect(() => {
    if (token && userId) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/courses/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // setCourses(response.data);
          setTitle(response.data.title)
          setDescription(response.data.description)
          console.log(response.data);
          setCount(response.data.cards.length)
          setListCard(response.data.cards)
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    } else {
      alert("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [token, userId, navigate]);

  const handleDeleteClick = (index) => {
    if (count > 4) {
      console.log(index);
      const newCards = listCard.filter((_, i) => i !== index);
      setListCard(newCards);
      setCount(count - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(`http://localhost:8000/courses/${courseId}`, {
        title,
        description,
        listCards: listCard,
      }, config);

      if (response.status === 201 || response.status === 200) {
        navigate(`/course/${courseId}`);
      } else {
        alert('Failed to create. Please try again.');
      }
    } catch (error) {
      console.error('Error during Create:', error.response?.data || error.message);
      alert(`Create failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleWordChange = (index, value) => {
    const newCards = [...listCard];
    newCards[index] = { ...newCards[index], key: value };
    setListCard(newCards);
  };

  const handleMeaningChange = (index, value) => {
    const newCards = [...listCard];
    newCards[index] = { ...newCards[index], value: value };
    setListCard(newCards);
  };

  return (
    <div style={{ backdropFilter: '#yellow' }}>
      <Header />

      <div className="first">
        <div className="first__heading">
          <div className="first__title">
            <h1>Update Course</h1>
            <svg
              className="first__paw"
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M189.02051,145.33984A31.35052,31.35052,0,0,1,174.0918,126.606a47.99847,47.99847,0,0,0-92.18262-.00635,31.35,31.35,0,0,1-14.92969,18.74023,44.00739,44.00739,0,0,0,38.11719,79.21094,60.16331,60.16331,0,0,1,45.80664,0,44.00678,44.00678,0,0,0,38.11719-79.21094ZM168,204a19.86485,19.86485,0,0,1-7.80078-1.57568c-.04395-.019-.08887-.0376-.13379-.05616a84.02637,84.02637,0,0,0-64.13086,0c-.04492.01856-.08984.03711-.13379.05616a20.00673,20.00673,0,0,1-17.31445-36.02246c.03515-.01954.07129-.03907.10644-.05909A55.21137,55.21137,0,0,0,104.957,133.29541a23.99908,23.99908,0,0,1,46.08887.00439,55.20367,55.20367,0,0,0,26.36133,33.043c.03515.02.07129.03955.10644.05909A20.00364,20.00364,0,0,1,168,204Zm64-100a24,24,0,1,1-24-24A23.99994,23.99994,0,0,1,232,104ZM48,128a24,24,0,1,1,24-24A23.99994,23.99994,0,0,1,48,128ZM72,56A24,24,0,1,1,96,80,23.99994,23.99994,0,0,1,72,56Zm64,0a24,24,0,1,1,24,24A23.99994,23.99994,0,0,1,136,56Z" />
            </svg>
          </div>

          <button
            type="button"
          // onClick={() => handleDeleteClick(i)}
          >
            <svg
              className="first__back"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
            >
              <style>
                {`
                                .st0 {
                                    display: none;
                                }
                                .st1 {
                                    display: inline;
                                }
                            `}
              </style>
              <g id="_x34__1_">
                <path d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z" />
              </g>
            </svg>
          </button>
        </div>
        <form action="" className="first__form">
          <input
            type="text"
            placeholder="Enter your course' title"
            className="first__title-input"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="first__title-input"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="first__card-input">
              <div className="first__card-input-top">
                <div className="first__card-input-top-number">
                  <span>{i + 1}</span>
                </div>
                {count > 4 && (
                  <button
                    type="button"
                    className="first__card-button"
                    onClick={() => handleDeleteClick(i)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                      <path
                        style={{ fill: "rgb(166, 166, 166)" }}
                        d="M6 1h13v1H6zM23 3H2v1h2v18.5A1.502 1.502 0 0 0 5.5 24h14a1.502 1.502 0 0 0 1.5-1.5V4h2zM9 20H8V7h1zm4 0h-1V7h1zm4 0h-1V7h1z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="first__card-input-bot">
                <div className="first__word-input">
                  <input
                    type="text"
                    id={`quizzTitle${i + 1}`}
                    value={listCard[i]?.key || ""}
                    onChange={(e) => handleWordChange(i, e.target.value)}
                    required
                  />
                  <label htmlFor={`quizzTitle${i + 1}`}>Word</label>
                </div>
                <div className="first__meaning-input">
                  <input
                    type="text"
                    id={`quizzMeaning${i + 1}`}
                    value={listCard[i]?.value || ""}
                    onChange={(e) => handleMeaningChange(i, e.target.value)}
                    required
                  />
                  <label htmlFor={`quizzMeaning${i + 1}`}>Meaning</label>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="first__plus"
            onClick={handlePopupClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
              <path
                style={{ fill: "rgb(193, 193, 193)" }}
                d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"
              />
            </svg>
          </button>
          <div className="first__submit-container">
            <button className="first__submit" type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Update_quiz;

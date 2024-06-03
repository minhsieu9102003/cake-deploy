import React, { useEffect, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./style.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { showMessage } from "../components/show_message/ShowMessage";

const Create_quiz = () => {
  const navigate = useNavigate();
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [count, setCount] = useState(4);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listCard, setListCard] = useState([]);
  const folderId = useParams();

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
    const tl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: "power4.inOut",
      },
    });

    tl.to(".unavigation__dropdown-list", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });

    tl.paused(true);

    if (dropdownStatus) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [dropdownStatus]);

  const handleDropdownClick = () => {
    setDropdownStatus(!dropdownStatus);
  };

  const handlePopupClick = () => {
    setCount(count + 1);
  };

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
      if (title?.trim() === "" || description?.trim() === "" || listCard.length !== count || listCard.some(card => card.key?.trim() === "") || listCard.some(card => card.value?.trim() === "")) {
        showMessage("Error", "Created Fail", "danger")
        return;
      } else {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.post('http://localhost:8000/courses/', {
          title,
          description,
          listCards: listCard,
          folderId: folderId.folderId,
        }, config);

        if (response.status === 201 || response.status === 200) {
          showMessage("Success", "Create Course Successfully", "success")
          navigate(`/course/${response.data._id}`);
        } else {
          showMessage("Error", "Created Fail", "danger")
        }
      }
    } catch (error) {
      console.log(error);
      showMessage("Error", "Created Fail", "danger")
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
    <div style={{ backdropFilter: "#yellow" }}>
      <Header />

      <div className="ufirst">
        <div className="ufirst__heading">
          <div className="ufirst__title">
            <h1>Create Course</h1>

          </div>
          <svg className='ufirst__back' onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>


        </div>
        <div className="ufirst__description">Create a new course</div>
        <form action="" className="ufirst__form">
          <input
            type="text"
            placeholder="Enter your course' title"
            className="ufirst__title-input"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="ufirst__title-input"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="ufirst__card-input">
              <div className="ufirst__card-input-top">
                <div className="ufirst__card-input-top-number">
                  <span>{i + 1}</span>
                </div>
                {count > 4 && (
                  <button
                    type="button"
                    className="ufirst__card-button"
                    onClick={() => handleDeleteClick(i)}
                  >
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
                          d="M10 11V17"
                          stroke="#7a4a4a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                        <path
                          d="M14 11V17"
                          stroke="#7a4a4a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                        <path
                          d="M4 7H20"
                          stroke="#7a4a4a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                        <path
                          d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                          stroke="#7a4a4a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                        <path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#7a4a4a"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                )}
              </div>
              <div className="ufirst__card-input-bot">
                <div className="ufirst__word-input">
                  <input
                    type="text"
                    id={`quizzTitle${i + 1}`}
                    value={listCard[i]?.key || ""}
                    onChange={(e) => handleWordChange(i, e.target.value)}
                    required
                  />
                  <label htmlFor={`quizzTitle${i + 1}`}>Word</label>
                </div>
                <div className="ufirst__meaning-input">
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
          <button type="button" className="ufirst__plus" onClick={handlePopupClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
              <path
                style={{ fill: "rgb(193, 193, 193)" }}
                d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"
              />
            </svg>
          </button>
          <div className="ufirst__submit-container">
            <button className="ufirst__submit" type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Create_quiz;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.css";

function Folder(User) {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [customSelectActive, setCustomSelectActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("latest");
  const [selectedValueBrown, setSelectedValueBrown] = useState("latest");
  const [folders, setFolders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [popupStatus, setPopupStatus] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [activeButton, setActiveButton] = useState("folders");
  const handleSwapFolders = () => {
    setActiveButton("folders");
  };

  const handleSwapCourses = async () => {
    setActiveButton("courses");
    if (token && userId) {
      try {
        const response = await axios.get(`http://localhost:8000/courses/my/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedCourses = Array.isArray(response.data) ? response.data : [];
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  };

  const handleUpdateCourse = async (courseId) => {
    try {
      await axios.put(
        `http://localhost:8000/courses/${courseId}`,
        { title: updatedTitle, description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCourses = courses.map(course =>
        course._id === courseId ? { ...course, title: updatedTitle, description: updatedDescription } : course
      );
      setCourses(updatedCourses);
      setSelectedCourse(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };


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
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
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

  const handleSelectClick = () => {
    setCustomSelectActive(!customSelectActive);
  };

  const handleOptionClick = (event) => {
    setSelectedValue(event.currentTarget.querySelector("label").textContent);
    setCustomSelectActive(false);
  };

  const handlePopupClick = () => {
    setPopupStatus(true);
  };

  const handleClosePopup = () => {
    setPopupStatus(false);
  };

  useEffect(() => {
    if (token && userId) {
      const fetchFolders = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/folders/my/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFolders(response.data);
        } catch (error) {
          console.error("Error fetching folders:", error);
        }
      };

      fetchFolders();
    } else {
      alert("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [token, userId, navigate]);

  const handleInputChange = (event) => {
    setNewFolderTitle(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/folders",
        { title: newFolderTitle, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFolders([...folders, response.data]);
      setPopupStatus(false);
      setNewFolderTitle("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  const handleDelete1 = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleDelete = async (folderId) => {
    try {
      await axios.delete(`http://localhost:8000/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFolders(folders.filter(folder => folder._id !== folderId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleUpdate = async (folderId) => {
    try {
      await axios.put(
        `http://localhost:8000/folders/${folderId}`,
        { title: updatedTitle, description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedFolders = folders.map(folder =>
        folder._id === folderId ? { ...folder, title: updatedTitle, description: updatedDescription } : folder
      );
      setFolders(updatedFolders);
      setSelectedFolder(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  

  return (
    <div>
      <form
        className="main__popup"
        style={{ display: popupStatus ? "flex" : "none" }}
        onSubmit={handleFormSubmit}
      >
        <div className="main__popup-inner">
          <button
            className="main__cross"
            type="button"
            onClick={handleClosePopup}
          >
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="m4.12 6.137 1.521-1.52 7 7-1.52 1.52z" />
              <path d="m4.12 11.61 7.001-7 1.52 1.52-7 7z" />
            </svg>
          </button>
          <h1>Creating new folder</h1>
          <input
            type="text"
            placeholder="Folder title"
            value={newFolderTitle}
            onChange={handleInputChange}
            required
          />
          <div className="main__popup-submit-container">
            <button className="main__popup-submit" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>

      <div className="navigation">
        <div className="navigation__logo">
          <img
            src="img/cake-logo-small.png"
            alt=""
            className="navigation__logo-img"
          />
          <div className="navigation__brand">Cake</div>
        </div>
        <div className="navigation__search-box">
          <svg
            className="navigation__search-box-icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 32 32"
          >
            <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z" />
          </svg>
          <input
            className="navigation__search-box-bar"
            type="text"
            placeholder="Search for folders, tutor,.."
          />
        </div>
        <ul className="navigation__link">
          <div className="navigation__dropdown">
            <button onClick={toggleDropdown} ref={navigationDropdown}>
              <span>Your library</span>
              <svg
                width="15"
                className="form__month--arrow-brown"
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
            <ul className="navigation__dropdown-list">
              <div className="navigation__dropdown-button-container">
                <button className="navigation__dropdown-button navigation__dropdown-button-1">
                  Flash-slices
                </button>
                <button className="navigation__dropdown-button navigation__dropdown-button-2">
                  Quick-bites
                </button>
              </div>
              <div className="navigation__dropdown-item-container">
                <a href="#" className="navigation__dropdown-item">
                  <h6>Animals</h6>
                  <img src="img/avatar1.png" alt="" />
                </a>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="navigation__dropdown-item">
                    <h6>Animals</h6>
                    <img src="img/avatar1.png" alt="" />
                  </div>
                ))}
              </div>
              <a className="navigation__dropdown-all" href="#">
                All
              </a>
            </ul>
          </div>
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
          <img className="navigation__avatar" src="img/avatar2.png" alt="" />
        </ul>
      </div>

      <div className="kfirst">
        <div className="kfirst__heading">
          <svg
            className="kfirst__back"
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
              <path
                d="M64.1 0C28.8 0 .2 28.7.2 64s28.6 64 63.9 64S128 99.3 128 64c-.1-35.3-28.7-64-63.9-64zm0 122.7C31.7 122.7 5.5 96.4 5.5 64c0-32.4 26.2-58.7 58.6-58.7 32.3 0 58.6 26.3 58.6 58.7-.1 32.4-26.3 58.7-58.6 58.7zm-.3-93.9L33.1 59.5l3.8 3.8 24.5-24.5V104h5.3V39.4l24 24 3.8-3.8-30.7-30.8z"
                id="icon_35_"
              />
            </g>
          </svg>
          <div className="kfirst__title">
            <h1>My Profile</h1>
            <svg className="kfirst__paw" width="64px" height="64px" viewBox="0 0 20 20" version="1.1" fill="#000000">

              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

              <g id="SVGRepo_iconCarrier"> <title>profile_round [#1342]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]"> </path> </g> </g> </g> </g>

            </svg>
          </div>


        </div>
        <div className="lprofile">
          <div className="lprofile__first">
            <img className="lprofile__img" src='/img/avatar2.png' />
            <h1 className='lprofile__username'>Chi Pu</h1>
          </div>

        </div>
        <div className="lprofile__swap">
        <button onClick={() => setActiveButton("folders")} className={`lprofile__swap-folder ${activeButton === "folders" ? "active" : ""}`}>Folder</button>
        <button onClick={handleSwapCourses} className={`lprofile__swap-course ${activeButton === "courses" ? "active" : ""}`}>Course</button>
      </div>
        <div className={`my__folders ${activeButton === "folders" ? "" : "hidden"}`}>
          <h1>My folders</h1>
          <svg
            className="kfirst__plus1"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            onClick={handlePopupClick}
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>plus-circle</title>
            <desc>Created with Sketch Beta.</desc>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Icon-Set"
                transform="translate(-464.000000, -1087.000000)"
                fill="#7a4a4a"
              >
                <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" />
              </g>
            </g>
          </svg>
        </div>
        <div className={`kfirst__filter1 ${activeButton === "folders" ? "" : "hidden"}`}>
          <div className="form__month1">
            <button
              className="form__month--button1"
              role="combobox"
              aria-labelledby="select button"
              aria-haspopup="listbox"
              aria-expanded={customSelectActive ? "true" : "false"}
              aria-controls="select-dropdown"
              onClick={handleSelectClick}
            >
              <span className="form__month--selected-value1">
                {selectedValue}
              </span>
              <svg
                width="28"
                className="form__month--arrow1"
                height="25"
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
            <ul
              className={`form__month--dropdown1 ${customSelectActive ? "active" : ""
                }`}
              role="listbox"
              id="select-dropdown"
            >
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="jan" name="social-account" />
                <label htmlFor="jan">latest</label>
              </li>
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="feb" name="social-account" />
                <label htmlFor="feb">most used</label>
              </li>
              <li role="option" onClick={handleOptionClick}>
                <input type="radio" id="mar" name="social-account" />
                <label htmlFor="mar">oldest</label>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <section className={`main1 ${activeButton === "folders" ? "" : "hidden"}`}>
        {folders.map((folder, i) => (
          <div className="main__folder1" key={i}>
            <Link to={`/folder/${folder._id}`}>
              <svg className='main__folder-svg1' width='10rem' height='10rem' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFA000" /><path d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFCA28" /></svg>
              <span className="main__folder-title1">{folder.title}</span>

            </Link>
            <div className='main__folder1-button-container'>
              <button className='main__folder1-button-delete' onClick={() => handleDelete(folder._id)}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                  <g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M14 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4 7H20" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                </svg>
              </button>
              <button className='main__folder1-button-edit' onClick={() => {
                setSelectedFolder(folder._id);
                setUpdatedTitle(folder.title);
                setUpdatedDescription(folder.description || "");
              }}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                  <g id="SVGRepo_iconCarrier"> <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                </svg>
              </button>
            </div>

          </div>
        ))}
      </section>
      <div className={`my__courses ${activeButton === "courses" ? "" : "hidden"}`}>
        <h1>My courses</h1>
        <svg
          className="kfirst__plus"
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          onClick={handlePopupClick}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>plus-circle</title>
          <desc>Created with Sketch Beta.</desc>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Icon-Set"
              transform="translate(-464.000000, -1087.000000)"
              fill="#7a4a4a"
            >
              <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" />
            </g>
          </g>
        </svg>
      </div>
      <div className={`form__month ${activeButton === "courses" ? "" : "hidden"}`}>
        <button
          className="form__month--button"
          role="combobox"
          aria-labelledby="select button"
          aria-haspopup="listbox"
          aria-expanded={customSelectActive ? "true" : "false"}
          aria-controls="select-dropdown"
          onClick={handleSelectClick}
        >
          <span className="form__month--selected-value">
            {selectedValue}
          </span>
          <svg
            width="28"
            className="form__month--arrow"
            height="25"
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

        <ul
          className={`form__month--dropdown ${customSelectActive ? "active" : ""
            }`}
          role="listbox"
          id="select-dropdown"
        >
          <li role="option" onClick={handleOptionClick}>
            <input type="radio" id="jan" name="social-account" />
            <label htmlFor="jan">latest</label>
          </li>
          <li role="option" onClick={handleOptionClick}>
            <input type="radio" id="feb" name="social-account" />
            <label htmlFor="feb">most used</label>
          </li>
          <li role="option" onClick={handleOptionClick}>
            <input type="radio" id="mar" name="social-account" />
            <label htmlFor="mar">oldest</label>
          </li>
        </ul>
      </div>

      <section className={`main1 ${activeButton === "courses" ? "" : "hidden"}`}>
        {courses.map((course, i) => (
          <div className="main__folder1" key={i}>
            <Link to={`/course/${course._id}`}>
              <svg className='main__folder-svg1' width='10rem' height='10rem' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFA000" /><path d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFCA28" /></svg>
              <span className="main__folder-title1">{course.title}</span>
            </Link>
            <div className='main__folder1-button-container'>
              <button className='main__folder1-button-delete' onClick={() => handleDelete1(course._id)}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M14 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4 7H20" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                </svg>
              </button>
              <button className='main__folder1-button-edit' onClick={() => {
                setSelectedCourse(course._id);
                setUpdatedTitle(course.title);
                setUpdatedDescription(course.description || "");
              }}>
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier"> <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </section>

      {selectedFolder && (
        <div className="update-form">
          <h2>Update Folder</h2>
          <input
            type="text"
            placeholder="New Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button onClick={() => handleUpdate(selectedFolder)}>Update</button>
          <button onClick={() => setSelectedFolder(null)}>Cancel</button>
        </div>
      )}

      <footer className="footer">
        <div className="footer__img-container">
          <img src="img/cake-logo-big.png" alt="" className="footer__logo" />
          <h1 className="footer__brand">CAKE</h1>
        </div>
        <div className="footer__text-container">
          <h3 className="footer__h3-author">Author</h3>
          {[...Array(3)].map((_, i) => (
            <h4 key={i} className={`footer__h4-author-${i + 1}`}>
              minh
            </h4>
          ))}
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

export default Folder;

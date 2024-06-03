import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { showMessage } from "../components/show_message/ShowMessage";
import "./style.css"; // Assuming you'll also style it using Main.css

const Main = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    folders: [],
    courses: [],
    users: [],
  });
  const [folders, setFolders] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!token || !userId) {
      alert("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/folders/list/${userId}?limit=8`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/courses/list/${userId}?limit=8`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchFolders();
    fetchCourses();
  }, [token, userId, navigate]);

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

  const mnavigationDropdown = useRef(null);
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
    tl.current.to(".mnavigation__dropdown-list", {
      transform: "scaleY(1)",
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("latest");
  const [isDropdownOpenBrown, setDropdownOpenBrown] = useState(false);
  const [selectedValueBrown, setSelectedValueBrown] = useState("latest");
  const [popupStatus, setPopupStatus] = useState(false);
  const [newFolderTitle, setNewFolderTitle] = useState("");

  const toggleDropdown1 = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownBrown = () => {
    setDropdownOpenBrown(!isDropdownOpenBrown);
  };

  const selectOption = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false);
    if (value === "latest") {
      fetchLatestFolders();
    } else if (value === "oldest") {
      fetchOldestFolders();
    }
  };

  const selectOptionBrown = (value) => {
    setSelectedValueBrown(value);
    setDropdownOpenBrown(false);
    if (value === "latest") {
      fetchLatestCourses();
    } else if (value === "oldest") {
      fetchOldestCourses();
    }
  };

  const fetchLatestFolders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/folders/latest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching latest folders:", error);
    }
  };

  const fetchOldestFolders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/folders/oldest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching oldest folders:", error);
    }
  };

  const fetchLatestCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/courses/latest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching latest courses:", error);
    }
  };

  const fetchOldestCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/courses/oldest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching oldest courses:", error);
    }
  };

  const handleAvatarClick = () => {
    navigate(`/profile`, { state: { token, userId } });
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(
          `http://localhost:8000/other/search/${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults({ folders: [], courses: [], users: [] });
    }
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
      if (response.status === 200 || response.status === 201) {
        setFolders([...folders, response.data]);
        showMessage("Success", "Created Successfully", "success");
        setPopupStatus(false);
        setNewFolderTitle("");
      } else {
        showMessage("Error", "Created Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Created Fail", "danger");
    }
  };

  const handleInputChange = (event) => {
    setNewFolderTitle(event.target.value);
  };

  return (
    <div className="mall">
      <form
        className="main__popup"
        style={{ display: popupStatus ? "flex" : "none" }}
        onSubmit={handleFormSubmit}
      >
        <div className="main__popup-inner">
          <button
            className="main__cross"
            type="button"
            onClick={() => setPopupStatus(false)}
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

      <Header />

      <section className="mmainn">
        <div className="myellow">
          <div className="mmain__top">
            <h1 className="myellow__header">Folders</h1>
            <button
              className="myellow__add"
              onClick={() => setPopupStatus(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" /></svg>
            </button>
          </div>

          <div className="myellow__card-container">
            {folders.map((folder) => (
              <div key={folder._id} className="mcard">
                <div className="mcard__side" onClick={() => navigate(`/folder/${folder._id}`)}>
                  <div className="mcard__side mcard__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div className="mcard__side mcard__side--back mcard__side--back-1">
                    <h4>{folder.title}</h4>
                    <h5>{folder.courses.length} courses</h5>
                    <h6>{folder.description}</h6>
                    <div>
                      {folder.userId?.avatar ? (
                        <img src={`http://localhost:8000/other/image/${folder.userId?.avatar}`} alt="" />
                      ) : (
                        <img src="img/avatar.jpeg" alt="" />
                      )}
                      <h6>{folder.userId?.username}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mbrown">
          <div className="mbrown__top">
            <h1 className="mbrown__header">Courses</h1>
            <button
              className="mbrown__add"
              onClick={() => navigate(`/create_course`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" /></svg>
            </button>
          </div>

          <div className="mbrown__card-container">
            {courses.map((course) => (
              <div key={course._id} className="mcard">
                <div className="mcard__side" onClick={() => navigate(`/course/${course._id}`)}>
                  <div className="mcard__side mcard__side--front">
                    <img src="img/card1.png" alt="" />
                  </div>
                  <div className="mcard__side mcard__side--back mcard__side--back-1">
                    <h4>{course.title}</h4>
                    <h5>{course.cards.length} cards</h5>
                    <h6>{course.description}</h6>
                    <div>
                      {course.userId?.avatar ? (
                        <img src={`http://localhost:8000/other/image/${course.userId?.avatar}`} alt="" />
                      ) : (
                        <img src="img/avatar.jpeg" alt="" />
                      )}
                      <h6>{course.userId?.username}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Main;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useParams } from 'react-router-dom';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { showMessage } from "../components/show_message/ShowMessage";

function Folder() {

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
    tl.current.to(".cnavigation__dropdown-list", {
      clipPath: "polygon(0 0, 100% 0,100% 100%, 0 100% )",
    });
  }, []);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const { folderId } = useParams();
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [description, setDescription] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupAddCourse, setPopupAddCourse] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("No token or userId found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/folders/${folderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-ID": userId,
          },
        });
        setCourses(response.data.courses);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setIsUser(userId === response.data.userId)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [folderId, refetch]);

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        showMessage("Success", "Delete Folder Successfully", "success")
        setRefetch(!refetch);
      }
    } catch (error) {
      showMessage("Error", "Deleted Failed", "danger");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/folders/${folderId}`,
        { title: newFolderTitle, description: newFolderDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        showMessage("Error", "Updated Failed", "danger");
      } else {
        setNewFolderTitle("");
        setNewFolderDescription("");
        showMessage("Success", "Updated Folder Successfully", "success")
        setRefetch(!refetch);
      }
      setPopupEdit(false)
    } catch (error) {
      showMessage("Error", "Updated Failed", "danger");
    }
  };

  const fetchUserCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/my/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableCourses(response.data);
      setPopupAddCourse(true);
    } catch (error) {
      showMessage("Error", "Failed to fetch courses", "danger");
    }
  };

  const handleCourseSelection = (courseId) => {
    setSelectedCourses(prevSelected =>
      prevSelected.includes(courseId)
        ? prevSelected.filter(id => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const handleAddCoursesToFolder = async () => {
    try {
      for (const courseId of selectedCourses) {
        await handleAddCourse(courseId);
      }
      setPopupAddCourse(false);
      setSelectedCourses([]);
    } catch (error) {
      showMessage("Error", "Failed to add courses", "danger");
    }
  };

  const handleAddCourse = async (courseId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/folders/add-course/${folderId}/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-ID": userId,
          },
        }
      );
      if (response.status !== 200) {
        showMessage("Error", "Adding Course Failed", "danger");
      } else {
        showMessage("Success", "Course Added Successfully", "success");
        setRefetch(!refetch);
      }
    } catch (error) {
      showMessage("Error", "Adding Course Failed", "danger");
    }
  };

  return (
    <div>
      {/* Popup for adding courses */}
      <div className="main__popup" style={{ display: popupAddCourse ? "flex" : "none" }}>
        <div className="main__popup-inner">
          <button className="main__cross" type="button" onClick={() => setPopupAddCourse(false)}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="m4.12 6.137 1.521-1.52 7 7-1.52 1.52z" />
              <path d="m4.12 11.61 7.001-7 1.52 1.52-7 7z" />
            </svg>
          </button>
          <h1>Select Courses to Add</h1>
          <div className="course-selection">
            {availableCourses.map(course => (
              <div key={course._id}>
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course._id)}
                  onChange={() => handleCourseSelection(course._id)}
                />
                {course.title}
              </div>
            ))}
          </div>
          <button className="main__popup-submit" onClick={handleAddCoursesToFolder}>
            Add Selected Courses
          </button>
        </div>
      </div>

      {/* Popup for editing folder */}
      <div
        className="main__popup"
        style={{ display: popupEdit ? "flex" : "none" }}
      >
        <div className="main__popup-inner">
          <button
            className="main__cross"
            type="button"
            onClick={() => setPopupEdit(false)}
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
          <h1>Update Folder</h1>
          <input
            type="text"
            placeholder="Folder title"
            value={newFolderTitle}
            onChange={(event) => {
              setNewFolderTitle(event.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Folder Description"
            value={newFolderDescription}
            onChange={(event) => {
              setNewFolderDescription(event.target.value);
            }}
            required
          />
          <div className="main__popup-submit-container">
            <button className="main__popup-submit" onClick={handleEdit}>
              Save
            </button>
          </div>
        </div>
      </div>

      <Header />

      <div className="cfirst">
        <div className="cfirst__heading">
          <div className="cfirst__title">
            <h1>Folder: {title}</h1>
            {isUser && (
              <>
                <svg
                  className="cfirst__paw"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                >
                  <path
                    fill="#FBCF26"
                    d="M66.335 28.138v7.4h7.4l-7.4-7.4zM92.232 35.456a1.92 1.92 0 0 1 .039 2.668l-2.709-2.707c.37-.349.83-.523 1.309-.525a1.92 1.92 0 0 1 1.361.564zM74.078 93.039H36.09a9.746 9.746 0 0 1-7.67-3.75h53.328a9.746 9.746 0 0 1-7.67 3.75zM41.002 33.539h16.499c.827 0 1.501-.671 1.501-1.499 0-.829-.674-1.5-1.501-1.5H41.002a1.5 1.5 0 1 0 0 2.999zm16.499 2.001H41.002a1.5 1.5 0 1 0 0 3h16.499c.827 0 1.501-.672 1.501-1.501 0-.827-.674-1.499-1.501-1.499zm0 5h-4.032a1.5 1.5 0 0 0 0 3.001h4.032a1.501 1.501 0 0 0 0-3.001z"
                  />
                  <path
                    fill="#1A2559"
                    d="M95.792 36.816a4.919 4.919 0 0 0-4.92-4.921 4.89 4.89 0 0 0-3.482 1.444l-8.555 8.555v-5.501L65.479 23.04H31.833v18.216c-4.948 1.755-8.498 6.462-8.5 12.013l.002 30.015c0 7.045 5.71 12.755 12.755 12.757h37.988c7.045-.002 12.755-5.712 12.758-12.757V61.376a10.538 10.538 0 0 0-4.756-8.808l12.272-12.273a4.917 4.917 0 0 0 1.44-3.479zm-3.56-1.36a1.92 1.92 0 0 1 .039 2.668l-2.709-2.707c.37-.349.83-.523 1.309-.525a1.92 1.92 0 0 1 1.361.564zm-25.897-7.318 7.4 7.4h-7.4v-7.4zm-31.5-2.1h28.499v12.5h12.498l.002 6.355-5.937 5.937h-17.22a302.26 302.26 0 0 1-2.826-5.13c-.708-1.299-1.373-2.633-2.725-3.672-1.36-1.037-3.195-1.521-5.759-1.517H36.09c-.424 0-.842.024-1.255.063V26.038zm39.243 67.001H36.09a9.746 9.746 0 0 1-7.67-3.75h53.328a9.746 9.746 0 0 1-7.67 3.75zm9.755-31.663v21.907a9.802 9.802 0 0 1-.481 3.008H26.834l-.018.002a9.72 9.72 0 0 1-.482-3.01V53.269c.01-5.387 4.369-9.748 9.756-9.756h5.277c2.242.004 3.279.401 3.942.904.676.498 1.187 1.361 1.896 2.703a342.837 342.837 0 0 0 3.29 5.948l.429.763h25.364a7.553 7.553 0 0 1 7.545 7.545zM76.289 50.83h-2.146l13.295-13.297 2.717 2.718-10.989 10.988a10.542 10.542 0 0 0-2.877-.409z"
                  />
                </svg>
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    setPopupEdit(true);
                    setNewFolderTitle(title);
                    setNewFolderDescription(description);
                  }}
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
                <button
                  className="cfirst__add-course-button"
                  onClick={fetchUserCourses}
                >
                  Add Courses
                </button>
              </>
            )}
          </div>
          <svg
            className="cfirst__back"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate(-1)}
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
        </div>
        <div className="cfirst__filter">
          <h2>{description}</h2>
        </div>
      </div>

      <section className="cmain">
        {courses.map((course, i) => (
          <div className="cmain__folder" key={i}>
            <Link to={`/course/${course._id}/`}>
              <svg className='cmain__folder-svg' xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 36 36"><path fill="#E1E8ED" d="m30.415 9.586l-9-9a2.001 2.001 0 0 0-2.829 2.829l-3.859 3.859l9 9l3.859-3.859a2 2 0 0 0 2.829-2.829" /><path fill="#CCD6DD" d="M20 0H5a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V11h-9c-1 0-2-1-2-2z" /><path fill="#99AAB5" d="M20 0h-2v9a4 4 0 0 0 4 4h9v-2h-9c-1 0-2-1-2-2zm-5 8a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m12 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1" /><path fill="#66757F" d="M31 19s-5.906-.002-5.935 0c-.291 0-.91.174-1.255.606l-2.328 2.929c-.644.809-.644 2.119 0 2.93l2.328 2.929c.345.432.964.606 1.255.606c.019.002 3.547 0 5.935 0z" /><path fill="#744EAA" d="M33 19s-8.056-.002-8.084 0c-.291 0-.91.139-1.255.485l-2.328 2.342a1.665 1.665 0 0 0 0 2.344l2.328 2.342c.345.346.964.487 1.255.487c.028.002 8.084 0 8.084 0c1.104 0 2-.897 2-2.001V21a2 2 0 0 0-2-2" /></svg>
              <span className="cmain__folder-title">{course.title}</span>
            </Link>
            {isUser && (
              <svg className='cmain__folder-delete' onClick={() => handleDelete(course._id)} width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M14 11V17" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4 7H20" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#7a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

              </svg>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Folder;

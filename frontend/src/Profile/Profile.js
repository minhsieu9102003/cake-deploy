import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { showMessage } from "../components/show_message/ShowMessage";
import axios from "axios";

import "./style.css";

function Profile() {
  const [folders, setFolders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState();
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupUpdate, setPopupUpdate] = useState(false);
  const token = localStorage.getItem("token");
  const userIdmain = localStorage.getItem("userId");
  const avatar = localStorage.getItem("avatar");
  const { userId } = useParams();
  const isUser = userIdmain === userId
  const navigate = useNavigate();
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const [activeButton, setActiveButton] = useState("folders");
  const handleSwapFolders = () => {
    setActiveButton("folders");
  };

  const handleSwapCourses = async () => {
    setActiveButton("courses");
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

  const handlePopupClick = () => {
    setPopupStatus(true);
  };

  const handleClosePopup = () => {
    setPopupStatus(false);
  };

  const handleClosePopupUpdate = () => {
    setPopupUpdate(false);
  };

  useEffect(() => {
    if (token && userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFolders(response.data.folders);
          setCourses(response.data.courses);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    } else {
      alert("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [token, userId, refetch]);

  const handleInputChange = (event) => {
    setNewFolderTitle(event.target.value);
  };

  const handleInputChangeDescription = (event) => {
    setNewFolderDescription(event.target.value);
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
        showMessage("Success", "Created Successfully", "success");
        setPopupStatus(false);
        setNewFolderTitle("");
        setRefetch(!refetch)
      } else {
        showMessage("Error", "Created Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Created Fail", "danger");
    }
  };
  const handleDelete1 = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        showMessage("Success", "Delete Successfully", "success");
        setRefetch(!refetch)
      } else {
        showMessage("Error", "Deleted Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Deleted Fail", "danger");
    }
  };

  const handleDelete = async (folderId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        showMessage("Success", "Delete Successfully", "success");
        setRefetch(!refetch)
      } else {
        showMessage("Error", "Deleted Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Deleted Fail", "danger");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        showMessage("Success", "Logout Successfully", "success");
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
      } else {
        showMessage("Error", "Logout Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Logout Fail", "danger");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/folders/${selectedFolder}`,
        { title: newFolderTitle, description: newFolderDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        showMessage("Success", "Update Successfully", "success");
        setSelectedFolder(null);
        setNewFolderTitle("");
        setNewFolderDescription("");
        setRefetch(!refetch)
        setPopupUpdate(false);
      } else {
        showMessage("Error", "Updated Fail", "danger");
      }
    } catch (error) {
      showMessage("Error", "Updated Fail", "danger");
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

      <div
        className="main__popup"
        style={{ display: popupUpdate ? "flex" : "none" }}
      >
        <div className="main__popup-inner">
          <button
            className="main__cross"
            type="button"
            onClick={handleClosePopupUpdate}
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
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Folder Description"
            value={newFolderDescription}
            onChange={handleInputChangeDescription}
            required
          />
          <div className="main__popup-submit-container">
            <button className="main__popup-submit" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      </div>

      <Header />

      <div className="kfirst">
        <div className="kfirst__heading">
          <Link to="/" className='kfirst__back-container'>
            <svg className='kfirst__back' onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>

          </Link>
        </div>
        <div className="lprofile">
          <div className="lprofile__first">
            {avatar !== 'http://localhost:8000/other/image/null' ? (
              <img className="lprofile__img" src={avatar} />
            ) : (
              <img className="lprofile__img" src="/img/avatar.jpeg" />
            )}
            <h1 className="lprofile__username">{user?.username}</h1>
            {isUser && (
              <button className="lprofile__logout" onClick={handleLogout}>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7a4a4a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  transform="rotate(180)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />{" "}
                    <polyline points="16 17 21 12 16 7" />{" "}
                    <line x1="21" y1="12" x2="9" y2="12" />{" "}
                  </g>
                </svg>
                <span> Log out</span>
              </button>
            )}
          </div>
        </div>
        <div className="lprofile__swap">
          <button
            onClick={handleSwapFolders}
            className={`lprofile__swap-folder ${activeButton === "folders" ? "active" : ""
              }`}
          >
            Folder
          </button>
          <button
            onClick={handleSwapCourses}
            className={`lprofile__swap-course ${activeButton === "courses" ? "active" : ""
              }`}
          >
            Course
          </button>
        </div>
        <div
          className={`my__folders ${activeButton === "folders" ? "" : "hidden"
            }`}
        >
          <h1>My folders</h1>
          {isUser && (
            // <svg
            //   className="kfirst__plus1"
            //   width="800px"
            //   height="800px"
            //   viewBox="0 0 32 32"
            //   onClick={handlePopupClick}
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <title>plus-circle</title>
            //   <desc>Created with Sketch Beta.</desc>
            //   <g
            //     id="Page-1"
            //     stroke="none"
            //     strokeWidth="1"
            //     fill="none"
            //     fillRule="evenodd"
            //   >
            //     <g
            //       id="Icon-Set"
            //       transform="translate(-464.000000, -1087.000000)"
            //       fill="#7a4a4a"
            //     >
            //       <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" />
            //     </g>
            //   </g>
            // </svg>
            <button onClick={handlePopupClick} className="profile__plus-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" /></svg>
            </button>
          )}
        </div>
        <div
          className={`kfirst__filter1 ${activeButton === "folders" ? "" : "hidden"
            }`}
        ></div>
      </div>

      <section
        className={`main1 ${activeButton === "folders" ? "" : "hidden"}`}
      >
        {folders.map((folder, i) => (
          <div className="main__folder1" key={i}>
            <Link to={`/folder/${folder._id}`}>
              <svg
                className="main__folder-svg1"
                width="10rem"
                height="10rem"
                viewBox="0 0 1024 1024"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                  fill="#FFA000"
                />
                <path
                  d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                  fill="#FFCA28"
                />
              </svg>
              <span className="main__folder-title1">{folder.title}</span>
            </Link>
            {isUser && (
              <div className="main__folder1-button-container">
                <button
                  className="main__folder1-button-delete"
                  onClick={() => handleDelete(folder._id)}
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
                <button
                  className="main__folder1-button-edit"
                  onClick={() => {
                    setSelectedFolder(folder._id);
                    setPopupUpdate(true);
                    setNewFolderTitle(folder?.title);
                    setNewFolderDescription(folder?.description);
                  }}
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
                        d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                        stroke="#7a4a4a"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </g>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      <div
        className={`my__courses ${activeButton === "courses" ? "" : "hidden"}`}
      >
        <h1>My courses</h1>
        {isUser && (
          <svg className="kfirst__plus" onClick={() => navigate("/create_course")} xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" /></svg>

        )}
      </div>

      <section
        className={`main1 ${activeButton === "courses" ? "" : "hidden"}`}
      >
        {courses.map((course, i) => (
          <div className="main__folder1" key={i}>
            <Link to={`/course/${course._id}`}>
              <svg className='main__folder-svg1 course-svg' xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 36 36"><path fill="#E1E8ED" d="m30.415 9.586l-9-9a2.001 2.001 0 0 0-2.829 2.829l-3.859 3.859l9 9l3.859-3.859a2 2 0 0 0 2.829-2.829" /><path fill="#CCD6DD" d="M20 0H5a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V11h-9c-1 0-2-1-2-2z" /><path fill="#99AAB5" d="M20 0h-2v9a4 4 0 0 0 4 4h9v-2h-9c-1 0-2-1-2-2zm-5 8a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m12 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1" /><path fill="#66757F" d="M31 19s-5.906-.002-5.935 0c-.291 0-.91.174-1.255.606l-2.328 2.929c-.644.809-.644 2.119 0 2.93l2.328 2.929c.345.432.964.606 1.255.606c.019.002 3.547 0 5.935 0z" /><path fill="#744EAA" d="M33 19s-8.056-.002-8.084 0c-.291 0-.91.139-1.255.485l-2.328 2.342a1.665 1.665 0 0 0 0 2.344l2.328 2.342c.345.346.964.487 1.255.487c.028.002 8.084 0 8.084 0c1.104 0 2-.897 2-2.001V21a2 2 0 0 0-2-2" /></svg>
              <span className="main__folder-title1">{course.title}</span>
            </Link>
            {isUser && (
              <div className="main__folder1-button-container">
                <button
                  className="main__folder1-button-delete"
                  onClick={() => handleDelete1(course._id)}
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
              </div>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Profile;

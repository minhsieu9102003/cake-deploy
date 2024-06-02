import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../components/show_message/ShowMessage";
import ConfirmModal from "../components/confirm/ConfirmModal";
import "./style.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [folders, setFolders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const avatar = localStorage.getItem("avatar");

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmAction = () => {
    const { action, id, title } = modalContent;
    action(id, title);
    closeModal();
  };

  const handleDeleteUser = async (userId, username) => {
    openModal({
      message: `Are you sure you want to delete user ${username}?`,
      action: deleteUser,
      id: userId,
      title: username,
    });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchUsers();
        showMessage("Success", "Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed", "danger");
    }
  };

  const handleDeleteFolder = async (folderId, title) => {
    openModal({
      message: `Are you sure you want to delete folder ${title}?`,
      action: deleteFolder,
      id: folderId,
      title,
    });
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchFolders();
        showMessage("Success", "Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed", "danger");
    }
  };

  const handleDeleteCourse = async (courseId, title) => {
    openModal({
      message: `Are you sure you want to delete course ${title}?`,
      action: deleteCourse,
      id: courseId,
      title,
    });
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchCourses();
        showMessage("Success", "Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed", "danger");
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

  useEffect(() => {
    if (!token || !userId) {
      showMessage("Error", "No token or userId found. Redirecting to login.", "danger");
      navigate("/login");
      return;
    } else {
      if (role !== "admin") {
        showMessage("Warning", "You do not have permission to access the admin page, please log in with your admin account", "warning");
        navigate("/");
      }
    }
  });

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch { }
  };

  const fetchFolders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/folders/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setFolders(response.data);
      }
    } catch { }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/courses/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch { }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  useEffect(() => {
    fetchFolders();
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [token]);

  return (
    <div className="admin">
      <div className="pfnavigation">
        <div className="pfnavigation__logo" >
          <img
            src="/img/cake-logo-small.png"
            alt=""
            className="pfnavigation__logo-img"
          />
          <div className="pfnavigation__brand">Cake</div>
        </div>
        <ul className="pfnavigation__link">
          <li className="pfnavigation__link-btn">
            <a className="pfnavigation__link-btn-a" href="#">
              Help Center
            </a>
          </li>
          <div className="avatar-dropdown">
            {avatar !== 'http://localhost:8000/other/image/null' ? (
              <img className="pfnavigation__avatar" src={avatar} alt="" />
            ) : (
              <img className="pfnavigation__avatar" src={"/img/avatar.jpeg"} alt="" />
            )}
            <div className="avatar-dropdown-content">
              <button onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </ul>
      </div>

      <div className="admin__container">
        <div className="tabs">
          <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            User Management
          </button>
          <button className={activeTab === "folders" ? "active" : ""} onClick={() => setActiveTab("folders")}>
            Folder Management
          </button>
          <button className={activeTab === "courses" ? "active" : ""} onClick={() => setActiveTab("courses")}>
            Courses Management
          </button>
        </div>

        {activeTab === "users" && (
          <div className="tab-content">
            <h1>User Management</h1>
            <table className="admin__table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id, user.username)} className="delete-btn">
                        <span >Delete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-width="1.5"><path stroke-linecap="round" d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5" /><path d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6" /></g></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "folders" && (
          <div className="tab-content">
            <h1>Folder Management</h1>
            <table className="admin__table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {folders.map((folder, index) => (
                  <tr key={folder.id}>
                    <td>{index + 1}</td>
                    <td>{folder?.title}</td>
                    <td>{folder?.userId?.username}</td>
                    <td>{folder?.courses?.length}</td>
                    <td>
                      <button onClick={() => handleDeleteFolder(folder?._id, folder?.title)} className="delete-btn">
                        <span>Delete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-width="1.5"><path stroke-linecap="round" d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5" /><path d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6" /></g></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="tab-content">
            <h1>Courses Management</h1>
            <table className="admin__table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Folder</th>
                  <th>Cards</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course?.title}</td>
                    <td>{course?.userId?.username}</td>
                    <td>
                      {course?.folders.map((folder) => (
                        <div key={folder._id}>- {folder.title}</div>
                      ))}
                    </td>
                    <td>
                      {course?.cards.map((card) => (
                        <div key={card._id}>- {card.key}: {card.value}</div>
                      ))}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteCourse(course._id, course?.title)} className="delete-btn">
                        <span>Delete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-width="1.5"><path stroke-linecap="round" d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5" /><path d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6" /></g></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
      <ConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmAction}
        message={modalContent.message}
      />
    </div>
  );
};

export default Admin;
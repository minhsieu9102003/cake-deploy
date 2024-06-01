import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import {showMessage} from "../components/show_message/ShowMessage";
import "./style.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [folders, setFolders] = useState([]);
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

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

  const fetchUsers = () => {
    axios.get("http://localhost:8000/users/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setUsers(response.data);
    });
  };

  const fetchFolders = () => {
    axios.get("http://localhost:8000/folders/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setFolders(response.data);
    });
  };

  const fetchCourses = () => {
    axios.get("http://localhost:8000/courses/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setCourses(response.data);
    });
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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchUsers();
        showMessage("Success","Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed","danger")
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchFolders();
        showMessage("Success","Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed","danger")
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status !== 200) {
        showMessage("Error", "Deleted Failed", "danger");
      } else {
        fetchCourses();
        showMessage("Success","Deleted Successfully", "success");
      }
    } catch {
      showMessage("Error", "Deleted Failed","danger")
    }
  };

  return (
    <div className="admin">
      <div className="pfnavigation">
        <div className="pfnavigation__logo" onClick={() => navigate("/")}>
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
          <img className="pfnavigation__avatar" src="/img/avatar2.png" alt=""/>
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
                      <button onClick={() => handleDeleteUser(user._id)} className="delete-btn">
                        Delete
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
                      <button onClick={() => handleDeleteFolder(folder?._id)} className="delete-btn">
                        Delete
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
                      <button onClick={() => handleDeleteCourse(course._id)} className="delete-btn">
                        Delete
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
    </div>
  );
};

export default Admin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/fetch-projects`)
      .then((response) => {
        setProjectsCount(response.data.length);
        const comPros = response.data.filter(
          (pro) => pro.status === "Completed"
        );
        setCompletedProsCount(comPros.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApplications = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/fetch-applications`)
      .then((response) => {
        setApplicationsCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}
/fetch-users`
      )
      .then((response) => {
        setUsersCount(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-page bg-[#101214]  text-white min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "All Projects", count: projectsCount },
          { title: "Completed Projects", count: completedProsCount },
          { title: "Applications", count: applicationsCount },
          { title: "Users", count: usersCount },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#2e3439] p-6 rounded-2xl shadow-lg text-center"
          >
            <h4 className="text-lg font-semibold text-[#8cbaeb]">
              {item.title}
            </h4>
            <p className="text-2xl font-bold my-2 text-white">{item.count}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#ced4da] text-black rounded-lg hover:bg-blue-600"
              onClick={() =>
                navigate(
                  item.title === "Users"
                    ? "/all-users"
                    : item.title === "Applications"
                    ? "/admin-applications"
                    : "/admin-projects"
                )
              }
            >
              View {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

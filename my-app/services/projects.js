import axios from "axios";

const API_URL = process.env.API_URL;

const getProjects = async (token) => {
  const projects = await axios.get(`${API_URL}/api/v1/project/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return projects;
};

const CreateProject = async (projectName, pricePerHour, token) => {
  const projectCreated = await axios.post(
    `${API_URL}/api/v1/project/create`,
    {
      project_name: projectName,
      price_per_hour: pricePerHour,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return projectCreated;
};

export default {
  getProjects,
  CreateProject,
};

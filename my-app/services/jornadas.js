import axios from "axios";

const API_URL = process.env.API_URL;

const getJornadas = async (idProject, token) => {
  const jornadas = await axios.get(
    `${API_URL}/api/v1/jornada/${idProject}/jornadas`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return jornadas;
};

const createJornada = async (
  selectedDate,
  selectedEndDate,
  hoursWorked,
  price,
  idProject,
  token
) => {
  const jornadaCreated = await axios.post(
    `${API_URL}/api/v1/jornada/create`,
    {
      fechaInicio: selectedDate,
      fechaCierre: selectedEndDate,
      hoursWorked: hoursWorked,
      price: price,
      idProject: idProject,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return jornadaCreated;
};

export default {
  getJornadas,
  createJornada,
};

import axios from "axios";
import { API_URL } from "@env";

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
const deleteJornada = async (idJornada, token, idProject) => {
  const jornada = await axios.delete(
    `${API_URL}/api/v1/jornada/${idProject}/jornadas/${idJornada}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(jornada);
  return jornada;
};
export default {
  getJornadas,
  createJornada,
  deleteJornada,
};

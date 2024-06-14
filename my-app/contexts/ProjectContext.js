import React, { createContext, useReducer } from "react";

const initialState = {
  project: {
    name: null,
    pricePerHour: null,
    idProject: null,
  },
};

const projectReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case "SET_PROJECT":
      return {
        ...state,
        project: payload.project,
      };
    case "GET_PROJECT":
      return state.project;

    default:
      return state;
  }
};

const ProjectContext = createContext(initialState);

const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
export { ProjectContext, ProjectContextProvider };

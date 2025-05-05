import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import React, { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [createProject, setCreateProject] = useState(true);
  const [formActive, setFormActive] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const handleProjectSubmit = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
    setFormActive(false);
  };

  const handleCreateProject = () => {
    setCreateProject(true);
    setFormActive(false);
  };

  const handleSelectedProject = (value) => {
    setCreateProject(false);
    setSelectedProjectIndex(value);
  };

  const handleProjectDelete = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(index, 1);
      return updatedProjects;
    })
    setCreateProject(true);
    setSelectedProjectIndex(null);
    setFormActive(false);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projects}
        className="bg-black w-1/3"
        handleClick={handleCreateProject}
        handleSelect={handleSelectedProject}
      />
      {createProject ? (
        <NewProject
          handleProjectSubmit={(project) => handleProjectSubmit(project)}
          projects={projects}
          className="w-2/3"
          formActive={formActive}
          setFormActive={setFormActive}
        />
      ) : (
        <SelectedProject
          className="w-2/3 mt-16 mx-20 flex flex-col"
          index={selectedProjectIndex}
          setProjects={setProjects}
          projects={projects}
          handleProjectDelete={() => handleProjectDelete(selectedProjectIndex)}
        />
      )}
    </main>
  );
}

export default App;

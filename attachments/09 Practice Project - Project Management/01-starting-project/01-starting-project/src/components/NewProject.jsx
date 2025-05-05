import Button from "./Button";
import Input from "./Input";
import React, { useState } from "react";
import projectImage from "../assets/no-projects.png";

const inputClasses = "px-2 py-2 rounded-md bg-stone-200 text-stone-700"

const NewProject = ({ projects, handleProjectSubmit, formActive, setFormActive, ...props }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    dueDate: "",
    tasks: [],
  });

  const handleCreateProject = () => {
    setFormActive(true);
  };

  if (!formActive) {
    return (
        <div {...props}>
            <div className="mt-16 mx-20 flex flex-col justify-center items-center">
                <img src={projectImage} alt="notebook" className="w-16 h-16 object-contain mx-auto"/>
                <h2 className="my-5 font-bold md:text-xl text-stone-500">
                No Project Selected
                </h2>
                <p className="mb-10">Select a project or get started with a new one.</p>
                <Button
                title="Create new project"
                className="mx-20 px-2 py-2 text-xs md:text-base text-left w-fit rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
                handleClick={handleCreateProject}
                />
            </div>
        </div>
    )
  }

  const handleChange = (key, e) => {
    setProject((prevProject) => ({
      ...prevProject,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name && project.description && project.dueDate) {
        handleProjectSubmit(project);
    }
    if (!formActive) {
        setFormActive(false);
    }
    setProject({
      name: "",
      description: "",
      dueDate: "",
      tasks: [],
    });
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setFormActive(false);
    setProject({
      name: "",
      description: "",
      dueDate: "",
      tasks: [],
    });
  }


  return (
    <div {...props}>
      <div className="w-[35rem] mt-16 mx-20 flex flex-col">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-500">
          Create New Project
        </h2>
        <form className="flex flex-col gap-4">
          <Input
          type="text"
            label="Project Name"
            className={inputClasses}
            handleChange={(e) => handleChange("name", e)}
            required={true}
            value={project.name}
          />
          <Input
            type="textarea"
            label="Project Description"                             
            className={inputClasses}
            handleChange={(e) => handleChange("description", e)}
            required={true}
            value={project.description}
          />
          <Input
            type="date"
            label="Due Date"
            className={inputClasses}
            handleChange={(e) => handleChange("dueDate", e)}
            required={true}
            value={project.dueDate}
          />
          <div className='flex flex-row gap-2'>
            <Button
                title="Cancel"
                className="w-40 px-2 py-2 text-xs md:text-base rounded-md text-stone-700 hover:bg-stone-300 hover:text-stone-900"
                handleClick={handleCancel}
            />
            <Button
                title="Submit"
                className="w-40 px-2 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-300 hover:bg-stone-600 hover:text-stone-100"
                handleClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;

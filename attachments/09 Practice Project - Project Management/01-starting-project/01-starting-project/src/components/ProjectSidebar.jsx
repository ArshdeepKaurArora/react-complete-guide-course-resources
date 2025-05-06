import React from "react";
import Button from "./Button";

const ProjectSidebar = ({ projects, handleClick, handleSelect, ...props }) => {
  return (
    <menu {...props}>
      <div className="mt-16 flex flex-col">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 mx-20">
          Your Projects
        </h2>
        <Button
          title="+Add Project"
          className="mx-20 px-2 py-2 text-xs md:text-base text-left w-fit rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          handleClick={handleClick}
        />
        {projects.length > 0 && (
          <ul className="flex flex-col gap-4 mt-8">
            {projects.map((project, index) => (
              <li key={index} className="ml-20 mr-5">
                <Button
                  title={project.name}
                  handleClick={() => handleSelect(index)}
                  className="w-full text-left px-2 py-2 text-xs md:text-base text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </menu>
  );
};

export default ProjectSidebar;

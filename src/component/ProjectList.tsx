"use client";

import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import { searchQuery } from "@/redux/features/tasks/taskSlice";
import { useDispatch } from "react-redux";

const ProjectList = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const handleChange = (value, checked) => {
    if (checked === false) {
      dispatch(searchQuery(value));
    } else {
      dispatch(searchQuery(""));
    }
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Cannot get projects!</p>;
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <p>No project found</p>;
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <div
        key={project.id}
        className="checkbox-container"
        onClick={(e) => handleChange(project.projectName, e.target.checked)}
      >
        <input
          type="checkbox"
          id={`project-${project.id}`}
          className={`${project.colorClass}`}
          defaultChecked
        />
        <label htmlFor={`project-${project.id}`} className="label">
          {project.projectName}
        </label>
      </div>
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectList;

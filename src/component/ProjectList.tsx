"use client";

import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import {
  addCheckedProject,
  removeCheckedProject,
} from "@/redux/features/tasks/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProjectList = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const { projectQuery } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const projectQueries = projects.map((project) => project.id);
    console.log("projectQueries:", projectQueries);
  }, [dispatch, projects]);

  const handleChange = (projectId, isChecked) => {
    if (isChecked) {
      dispatch(addCheckedProject(projectId));
    } else {
      dispatch(removeCheckedProject(projectId));
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
        onChange={(e) => handleChange(project.id, e.target.checked)}
        key={project.id}
        className="checkbox-container"
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

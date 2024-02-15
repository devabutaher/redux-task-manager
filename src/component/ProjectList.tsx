"use client";

import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";

const ProjectList = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Cannot get projects!</p>;
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <p>No project found</p>;
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <div key={project.id} className="checkbox-container">
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

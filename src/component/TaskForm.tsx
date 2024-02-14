"use client";

import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import { useCreateTaskMutation } from "@/redux/features/tasks/taskApi";
import { useGetTeamsQuery } from "@/redux/features/team/teamApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TaskForm = ({ initialData }) => {
  const { data: projects } = useGetProjectsQuery();
  const { data: teams } = useGetTeamsQuery();
  const [createTask, { isLoading, isSuccess, isError }] =
    useCreateTaskMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    taskName: "",
    teamMember: { name: "", avatar: "", id: "" },
    project: { projectName: "", colorClass: "", id: "" },
    deadline: "",
    status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/", { scroll: false });
    }
  }, [isSuccess, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "teamMember" || name === "project") {
      const parsedValue = JSON.parse(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(formData);

    // Reset the form after submission
    setFormData({
      taskName: "",
      teamMember: {},
      project: {},
      deadline: "",
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={formData.taskName}
          onChange={handleChange}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        <select
          name="teamMember"
          id="lws-teamMember"
          required
          value={JSON.stringify(formData.teamMember)}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Job
          </option>
          {teams?.map((team) => (
            <option key={team.id} value={JSON.stringify(team)}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select
          id="lws-projectName"
          name="project"
          required
          value={JSON.stringify(formData.project)}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Project
          </option>
          {projects?.map((project) => (
            <option key={project.id} value={JSON.stringify(project)}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          id="lws-deadline"
          required
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      <div className="text-right">
        <button type="submit" disabled={isLoading} className="lws-submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

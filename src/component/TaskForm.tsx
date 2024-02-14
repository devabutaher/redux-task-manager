"use client";

import { useState } from "react";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    teamMember: "",
    projectName: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any action with formData, such as sending it to an API
    console.log(formData);

    // Reset the form after submission
    setFormData({
      taskName: "",
      teamMember: "",
      projectName: "",
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
          value={formData.teamMember}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Job
          </option>
          <option>Sumit Saha</option>
          <option>Sadh Hasan</option>
          <option>Akash Ahmed</option>
          <option>Md Salahuddin</option>
          <option>Riyadh Hassan</option>
          <option>Ferdous Hassan</option>
          <option>Arif Almas</option>
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select
          id="lws-projectName"
          name="projectName"
          required
          value={formData.projectName}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Project
          </option>
          <option>Scoreboard</option>
          <option>Flight Booking</option>
          <option>Product Cart</option>
          <option>Book Store</option>
          <option>Blog Application</option>
          <option>Job Finder</option>
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
        <button type="submit" className="lws-submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

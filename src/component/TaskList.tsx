"use client";

import { useGetTasksQuery } from "@/redux/features/tasks/taskApi";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const { data: tasks = [], isError, isLoading } = useGetTasksQuery();
  const { searchQuery } = useSelector((state) => state.tasks);

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.teamMember.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, tasks]
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Cannot get tasks!</p>;
  } else if (!isLoading && !isError && filteredTasks?.length === 0) {
    content = <p>No task found</p>;
  } else if (!isLoading && !isError && filteredTasks?.length > 0) {
    content = filteredTasks.map((task) => <Task key={task.id} data={task} />);
  }

  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
          <Link href="/add-new" className="lws-addnew group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span className="group-hover:text-indigo-500">Add New</span>
          </Link>
        </div>

        <div className="lws-task-list">{content}</div>
      </main>
    </div>
  );
};

export default TaskList;

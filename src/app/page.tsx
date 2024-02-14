import Sidebar from "@/component/Sidebar";
import TaskList from "@/component/TaskList";

export default function Home() {
  return (
    <div className="container relative">
      <Sidebar />
      <TaskList />
    </div>
  );
}

"use client";

import { searchQuery } from "@/redux/features/tasks/taskSlice";
import { useGetTeamsQuery } from "@/redux/features/team/teamApi";
import Image from "next/image";
import { useDispatch } from "react-redux";

const TeamMembers = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(searchQuery(value));
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <p>Cannot get teams!</p>;
  } else if (!isLoading && !isError && teams?.length === 0) {
    content = <p>No team found</p>;
  } else if (!isLoading && !isError && teams?.length > 0) {
    content = teams.map((team) => (
      <div
        onClick={() => handleChange(team.name)}
        key={team.id}
        className="checkbox-container"
      >
        <Image
          src={team.avatar}
          alt="avatar"
          className="team-avater"
          width={200}
          height={200}
        />
        <p className="label">{team.name}</p>
      </div>
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default TeamMembers;

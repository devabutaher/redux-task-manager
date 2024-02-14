import Image from "next/image";

const TeamMembers = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        <div className="checkbox-container">
          <Image
            src={"/images/avatars/sumit.png"}
            alt="avatar"
            className="team-avater"
            width={200}
            height={200}
          />
          <p className="label">Sumit Saha</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;

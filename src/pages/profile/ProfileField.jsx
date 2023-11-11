import React from "react";

const ProfileField = ({ field, value }) => {
  return (
    <div className="flex items-center gap-2 py-1">
      <p className="font-semibold text-zinc-700">{field} :</p>
      <span>{value}</span>
    </div>
  );
};

export default ProfileField;

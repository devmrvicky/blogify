import { useState } from "react";
import { FaPen, FaEnvelope, FaCircleCheck } from "react-icons/fa6";

const UserDataField = ({ type, label, field, register }) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold my-2">{field}</h3>
      <div className="input-field flex items-center gap-2 border px-2 my-2">
        <label htmlFor={label}>
          <FaEnvelope />
        </label>
        <input
          type={type}
          name={label}
          id={label}
          placeholder="example@gmail.com"
          className="px-2 py-1 flex-1 outline-none"
          {...register(label, {
            required: true,
          })}
          readOnly={!editable}
        />
        <button type="button" onClick={() => setEditable((prev) => !prev)}>
          {!editable ? <FaPen /> : <FaCircleCheck />}
        </button>
      </div>
    </div>
  );
};

export default UserDataField;

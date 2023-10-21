import { forwardRef } from "react";

const Input = (
  {
    type = "text",
    label,
    className = "px-3 py-2",
    labelStyle = "text-xl font-semibold",
    ...props
  },
  ref
) => {
  return (
    <div className="input-field flex flex-col gap-2 relative w-full">
      {label && (
        <label htmlFor={label} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={label}
        id={label}
        title={label}
        className={`outline-none border w-full flex-1 ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(Input);

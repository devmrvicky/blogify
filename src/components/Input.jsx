import { forwardRef } from "react";

const Input = (
  {
    type = "text",
    name,
    label,
    className = "px-3 py-2",
    labelStyle = "text-xl font-semibold",
    dis = false,
    // value,
    // setValue,
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
        name={name || label}
        id={label}
        title={label}
        className={`outline-none border w-full flex-1 ${className}`}
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        {...props}
        ref={ref}
      />
      {dis && <p className="text-xs text-zinc-500">{dis}</p>}
    </div>
  );
};

export default forwardRef(Input);

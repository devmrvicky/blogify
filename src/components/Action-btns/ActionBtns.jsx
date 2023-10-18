import { ClapsBtn, RespondBtn } from "..";

const ActionBtns = () => {
  return (
    <div className="flex items-center gap-3 border-b border-t py-4 px-2">
      <ClapsBtn />
      <RespondBtn />
    </div>
  );
};

export default ActionBtns;

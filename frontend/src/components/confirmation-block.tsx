type ConfirmationBlockPropType = {
  option: string;
  handleDeleteOnClick: () => void;
  handleKeepOnClick: () => void;
};
const confirmDicisionButtonClass =
  "w-1/4 h-1/6 m-4 p-4 bg-slate-700 rounded-md text-center cursor-pointer text-white";

const ConfirmationBlock = (props: ConfirmationBlockPropType) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full w-full overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-filter backdrop-contrast-120 outline-none">
      <div className="transition-opacity ease-in-out duration-300 opacity-100">
        <div className="m-4 flex flex-col rounded-md shadow-2xl bg-white">
          <div className="p-2 text-[#e3413b] text-2xl m-4">
            Are you sure you want to delete this {props.option}?
          </div>
          <div className="flex flex-row justify-center mb-4">
            <div
              className={confirmDicisionButtonClass}
              onClick={props.handleDeleteOnClick}
            >
              delete {props.option}
            </div>
            <div
              className={confirmDicisionButtonClass}
              onClick={props.handleKeepOnClick}
            >
              Keep {props.option}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBlock;

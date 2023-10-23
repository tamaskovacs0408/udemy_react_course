import Input from "./Input";

const NewProject = () => {
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <Input label={"Title"} placeholder={"Project title"} />
        <Input label={"Description"} textarea />
        <Input label={"Due Date"} />
      </div>
    </div>
  );
};

export default NewProject;

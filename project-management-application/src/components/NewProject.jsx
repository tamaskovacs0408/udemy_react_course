const NewProject = () => {
  return (
    <div>
      <menu>
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <p>
          <label>Title</label>
          <textarea />
        </p>
        <p>
          <label>Description</label>
          <input />
        </p>
        <p>
          <label>
            Due <Date></Date>
          </label>
          <input />
        </p>
      </div>
    </div>
  );
};

export default NewProject;

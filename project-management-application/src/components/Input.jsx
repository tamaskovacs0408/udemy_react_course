const Input = (props) => {
  const { label, textarea } = props;
  return (
    <p>
      <label>{label}</label>
      {textarea ? <textarea {...props} /> : <input className="px-2"{...props}/>}
    </p>
  );
};

export default Input;

const CustomInput = ({ type, id, placeholder, setData, data, label }) => {
  return (
    <div className="custom-input">
      <label htmlFor={id}> {label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={data}
        onChange={(event) => {
          setData(event.target.value);
        }}
      />
    </div>
  );
};

export default CustomInput;

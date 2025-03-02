import "../components/styles/inputField.css"; // Import independent styles

const InputField = ({ label, type, value, onChange, name }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
  );
};

export default InputField;

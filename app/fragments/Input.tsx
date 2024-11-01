export const Input = ({ name, label, type, required, ...props }) => {
  <div>
    <div>
      {label || name} <span>{required && "*"}</span>
    </div>
  </div>;
};

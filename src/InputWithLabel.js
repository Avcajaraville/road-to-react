export const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type = "text",
  children,
}) => {
  return (
    <>
      <label htmlFor={id} className="label">
        {children}
      </label>
      <input
        className="input"
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

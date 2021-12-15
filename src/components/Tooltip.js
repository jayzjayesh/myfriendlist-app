const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      <p className="tooltip-text">{text}</p>
      {children}
    </div>
  );
};

export default Tooltip;

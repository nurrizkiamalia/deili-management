interface buttonProps {
  children?: JSX.Element | React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
}

const Buttons: React.FC<buttonProps> = ({ children, className, onClick,disabled, type = "button", }) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-1 bg-dspOrange text-white rounded-xl px-5 py-2 w-fit border-2 hover:shadow-md shadow-sm transition-all duration-300 hover:bg-white hover:text-dspOrange hover:border-dspOrange ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Buttons;

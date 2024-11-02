interface buttonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Buttons: React.FC<buttonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex items-center gap-1 bg-dspOrange text-white rounded-xl px-5 py-2 w-fit border-2 hover:shadow-md shadow-sm transition-all duration-300 hover:bg-white hover:text-dspOrange hover:border-dspOrange ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Buttons;

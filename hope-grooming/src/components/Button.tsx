export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-400 text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
};

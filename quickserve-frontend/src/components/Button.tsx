interface ButtonProps {
  text: string;
  type?: "submit" | "button";
}

const Button = ({ text, type = "submit" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
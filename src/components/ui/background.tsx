const Background = ({ imageUrl }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat blur-md opacity-15 -z-10"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default Background;

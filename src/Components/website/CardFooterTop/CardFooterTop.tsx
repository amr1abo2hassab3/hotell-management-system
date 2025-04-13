interface CardFooterTopProps {
  item: {
    img: string;
    title: string;
  };
}

const CardFooterTop = ({ item }: CardFooterTopProps) => {
  return (
    <div
      className={`rounded-[18px] overflow-hidden relative h-full ${
        item.title === "Paris" ? "h-[318px]" : "h-[152px]"
      }`}
    >
      <img
        className="w-full object-fit-cover h-full"
        src={item.img}
        alt={item.title}
      />

      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[35px] font-bold">
        {item.title}
      </h2>
    </div>
  );
};

export default CardFooterTop;

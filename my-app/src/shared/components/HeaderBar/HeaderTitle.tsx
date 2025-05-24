const HeaderTitle = ({ Icon, className, title }: any) => {
  return (
    <div className="font-Roboto font-extralight text-3xl justify-center items-center">
      <Icon className={className} />
      <span className="px-5" />
      {title}
    </div>
  );
};

export default HeaderTitle;

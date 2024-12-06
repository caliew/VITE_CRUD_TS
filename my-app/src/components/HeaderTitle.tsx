const HeaderTitle = ( {Icon,className,title}:any) => {
    return (
      <div className='font-Roboto font-extralight text-4xl justify-center items-center mt-10 mb-0'>
        <Icon className={className}/><span className="px-5"/>{title}
      </div>
    )
}

export default HeaderTitle;
type PropsElements = {
    title: string
}

function ListName({ title }: PropsElements) {
  return (
    <div className="border-3 divBorderHover rounded-sm p-3 text-xl text-center cursor-pointer">
      <p className="break-words p-2">
        {title}
      </p>
    </div>
  );
}

export default ListName;
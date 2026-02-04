type PropsElements = {
    title: string
}

function ListName({ title }: PropsElements) {
  return (
    <div className="border-2 border-stone-700 divBorderHover border-stone-50 bg-stone-900 rounded-sm p-3 text-xl text-center cursor-pointer">
      <p className="break-words p-2">
        {title}
      </p>
    </div>
  );
}

export default ListName;
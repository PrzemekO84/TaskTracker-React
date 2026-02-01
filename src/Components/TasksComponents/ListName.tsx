type PropsElements = {
    title: string
}

function ListName({ title }: PropsElements) {
  return (
    <div className="border-2 border-stone-500 w-full rounded-sm p-3 text-xl text-center cursor-pointer">
      <p className="break-words">
        {title}
      </p>
    </div>
  );
}

export default ListName;
type PropsElements = {
    title: string
}

function ListName({ title } : PropsElements){
    return (
        <div className="flex flex-wrap justify-center border-2 border-stone-500 w-full rounded-sm p-3 text-xl text-center cursor-pointer">
            <p>{title}</p>
        </div>
    )
}

export default ListName;
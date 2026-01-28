
function Name() {

    //Tutaj pojawi sie tenary operator z zapytaniem czy taski sa jesli nie wyswietlamy info ze nie ma taskow
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-6xl">Hello Przemek</h1>
      <h2 className="text-4xl">You have:</h2>
      <div className="flex gap-5">
        <div className="nameTaskInfo buttonHighLight">
            <p>2 Lists</p>
        </div>
        <div className="nameTaskInfo buttonHighLight">
            <p>40 Tasks</p>
        </div>
        <div className="nameTaskInfo buttonHighLight">
            <p>3 Critical Tasks</p>
        </div>
        <div className="nameTaskInfo buttonHighLight">
            <p>5 High Tasks</p>
        </div>
      </div>
    </div>
  );
}

export default Name;
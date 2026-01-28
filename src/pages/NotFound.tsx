import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';

function NotFound(){
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col gap-6 justify-center items-center border-2 border-stone-800 p-10 mx-8 rounded-xl bg-stone-900">
                <div className='flex gap-4 text-6xl'>
                    <h2 className='text-center'>Error 404 Page Not Found</h2>
                </div>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <h2 className='text-2xl'>Come back to the main page</h2>
                    <Link to="/"> <Button className='text-xl bg-stone-950 py-6 px-6 hover:bg-stone-700'>Main Page</Button> </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
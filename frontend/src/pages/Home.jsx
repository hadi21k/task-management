import Navbar from '../components/home/Navbar'
import { useNavigate } from 'react-router-dom'
import Workspaces from '../components/home/Workspaces'
import { useAuth } from '../context/provider'

const Home = () => {
    const { user: currentUser } = useAuth()
    return (
        <main className='bg-[#111] text-white min-h-[calc(100vh)]'>
            <div className="container mx-auto">
                <Navbar />
                {currentUser !== null ? (
                    <>
                        <Workspaces user={currentUser} />
                    </>
                ) : (
                    <h1>
                        Not logged in
                    </h1>
                )}
            </div>
        </main>
    )
}

export default Home
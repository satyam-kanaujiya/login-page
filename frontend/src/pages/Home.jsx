import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
    <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold">My Website</a>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Add other navigation links if needed */}
                </div>
                <div className="flex items-center space-x-4">
                    <Link to={"/login"}>
                         <button className="text-gray-300 hover:text-white">Login</button>
                    </Link>
                    <Link to={"/register"}>
                         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">Register</button>
                    </Link>     
                </div>
            </div>
        </nav>
    <div className="flex justify-center items-center flex-1 container mx-auto ">
        {/* Your content here */}
        <h1 className="font-serif text-4xl text-center">Welcome to my web page</h1>
    </div>
    </div>

  )
}

export default Home
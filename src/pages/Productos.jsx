import { Link } from "react-router-dom";
import ListProducts from "./products/list";
export default function Productos(){
    return (
        <div className="max-w-7xl mx-auto mt-12 ">
            <h1>Gestion de productos</h1>
            <Link to="/productos/add">
            <button 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"            
            >create</button>
            </Link>
            <ListProducts></ListProducts>

        </div>
    );
}
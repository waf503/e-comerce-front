import axios from "../../api/axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
export default function ListProducts () {

    const [viewProduct, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('api/productos').then(res=>{
            if(res.data.status === 200){
                setProductos(res.data.productos);
                setLoading(false);
            }
        })
    }, []);

    // async function deleteProduct(id) {
    //     console.log("hola", id)
    // }
    
    const deleteProduct = async (id)=>{
        //e.preventDefault();
        //console.log(id);
        const res = await axios.delete(`api/productos/delete/${id}`);
        if(res.data.status === 200){
            swal("Success", res.data.message,"success");
            setLoading(true);
            axios.get('api/productos').then(res=>{
                if(res.data.status === 200){
                    setProductos(res.data.productos);
                    setLoading(false);
                }
            })
        }
        else if(res.data.status === 404){
            swal("Error en la eliminacion");
        }
    }

    var display_product = "";
    if(loading){
        return <h4>Cargando...</h4>
    }
    else{
        display_product = viewProduct.map((item)=>{
            return (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{(item.categoria.parent) ?(item.categoria.parent.name)+" | "+(item.categoria.name) : (item.categoria.name)}</td>
                    <td className="px-6 py-4">{"$"+(item.price)}</td>
                    <td className="px-6 py-4">
                            <Link to={`/productos/update/${item.id}`}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            <span> | </span>
                            <Link onClick={()=>deleteProduct(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                        </td>
                </tr>
            );
        })
    }

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre del producto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoría
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {display_product}                  
                </tbody>
            </table>
        </div>

    );
}
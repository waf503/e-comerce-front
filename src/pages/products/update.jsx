import { useEffect, useState } from "react";
import axios from "../../api/axios"
import swal from 'sweetalert';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Update() {

    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);
    const { id } = useParams();
    const product_id = id; 
    const navigate = useNavigate();
    const [productInput, setProduct] = useState({
        categoria_id: '',
        subCategoria_id: '',
        name: '',
        price: 1.0,
        description: ""
    })

    const handleInput = (e) => {
        e.persist();
        //console.log(e.target.value);
        setProduct({...productInput, [e.target.name]:e.target.value})
        //console.log(productInput)
    }

    useEffect(()=>{

        axios.get('api/categorias').then(res=>{
            if(res.data.status === 200){
                setCategorias(res.data.categorias);
            }
        })

        

        axios.get(`api/productos/edit/${product_id}`).then(res=>{
            if(res.data.status === 200){
                console.log(res.data.product);
                const data = {
                                categoria_id : (res.data.product.categoria.parent) ? res.data.product.categoria.parent.id : res.data.product.category_id,
                                subCategoria_id: res.data.product.category_id,
                                name: res.data.product.name,
                                price: res.data.product.price,
                                description: res.data.product.description
                             }
                axios.get(`api/subcategorias/${data.categoria_id}`).then(res=>{
                    if(res.data.status === 200){
                        setSubCategorias(res.data.subcategorias);
                        setLoading(false);
                    }                    
                })                
                setProduct(data);
            }
        })

        
        
    }, []);

    if(loading){
        return <h4>Cargando...</h4>
    }

    const handleCategory = async (e) => {
        e.persist();
        let id = e.target.value;
        setProduct({...productInput, [e.target.name]:e.target.value, subCategoria_id: ''})
        const res = await axios.get('api/subcategorias/'+id);
        if(res.data.status === 200){
            setSubCategorias(res.data.subcategorias);
            setError([]);
           // console.log(res.data.subcategorias);
        }
        //console.log(productInput)

        
        // axios.get('api/subcategorias/'+id).then(res => {
        //     if(res.data.status === 200){
        //         setSubCategorias(res.data.subcategorias);
        //     }
        // })
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',productInput.name)
        formData.append('category_id',productInput.categoria_id)
        formData.append('subCategoria_id',productInput.subCategoria_id)
        formData.append('price',productInput.price)
        formData.append('description',productInput.description)

        const res = await axios.post(`api/productos/update/${product_id}`, formData)

        if(res.data.status === 200){
            swal("Success", res.data.message,"success");
            setProduct({...productInput,
                categoria_id: '',
                subCategoria_id: '',
                name: '',
                price: 1.0,
                description: ""
            });
            setError([]);
            navigate('/productos');

        }
        else if(res.data.status === 422){
            swal("All fields are mandetory","","error");
            setError(res.data.errors);
        }
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 ">
            <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Actualizar producto</h2>
                <form  onSubmit={updateProduct} encType="multipart/form-data">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            onChange={handleInput}
                            value={productInput.name}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese el nombre del producto" 
                            required
                            />
                            <small className="text-red-500">{errorlist.name}</small>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                            <select 
                            id="categoria_id" 
                            name="categoria_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={productInput.categoria_id} 
                            onChange={handleCategory}
                            >
                                <option>Seleccione la categoría</option>                                
                                {
                                    categorias.map((item) => {
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })
                                }                               
                            </select>
                            <small className="text-red-500">{errorlist.category_id}</small>
                        </div>
                        <div>
                            <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SubCategoría</label>
                            <select  
                            id="subCategoria_id"
                            name="subCategoria_id" 
                            onChange={handleInput}
                            value={productInput.subCategoria_id}                          
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option>Seleccione una SubCategoría</option>   
                                {
                                    subcategorias.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }                    
                            </select>
                            <small className="text-red-500">{errorlist.subCategoria_id}</small>
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio unitario</label>
                            <input 
                            type="number" 
                            name="price" 
                            id="price" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="$10" 
                            onChange={handleInput}
                            value={productInput.price}
                            required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                            <textarea 
                            id="description" 
                            name="description"
                            rows="8" 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="Ingrese la descripción del producto..."
                            onChange={handleInput}
                            value={productInput.description}
                            ></textarea>
                            <small className="text-red-500">{errorlist.description}</small>
                        </div>
                        
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Actualizar
                    </button>
                </form>
            </div>
            </section>
        </div>
    );
}
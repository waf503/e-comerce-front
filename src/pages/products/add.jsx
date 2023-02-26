import axios from "../../api/axios"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export default function Productos(){

    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);
    const [errorlist, setError] = useState([]);
    const navigate = useNavigate();

    const [productInput, setProduct] = useState({
        categoria_id: '',
        subCategoria_id: '',
        name: '',
        price: 1.0,
        description: ""
    })

    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        //console.log(e.target.value);
        setProduct({...productInput, [e.target.name]:e.target.value})
        //console.log(productInput)
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({ image: e.target.files[0] })
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

    useEffect(()=>{
        axios.get('api/categorias').then(res=>{
            if(res.data.status === 200){
                setCategorias(res.data.categorias);
            }
        })
    }, []);

    const submintProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image_path',picture.image)
        formData.append('name',productInput.name)
        formData.append('category_id',productInput.categoria_id)
        formData.append('subCategoria_id',productInput.subCategoria_id)
        formData.append('price',productInput.price)
        formData.append('description',productInput.description)

        const res = await axios.post('api/store-product', formData)

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
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agregar un producto</h2>
                <form onSubmit={submintProduct} encType="multipart/form-data">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese el nombre del producto" 
                            required
                            onChange={handleInput}
                            value={productInput.name}
                            />
                            <small className="text-red-500">{errorlist.name}</small>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                            <select 
                            id="categoria_id" 
                            name="categoria_id"
                            onChange={handleCategory} 
                            value={productInput.categoria_id} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            
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
                            disabled={subcategorias.length ? false : true}
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
                            required 
                            onChange={handleInput}
                            value={productInput.price}
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
                        <div>
                            <label htmlFor="image_path" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una imagen</label>
                            <input 
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            id="image_path" 
                            name="image_path"
                            onChange={handleImage}
                            type="file"/>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Agregar
                    </button>
                </form>
            </div>
            </section>
        </div>
    );
}
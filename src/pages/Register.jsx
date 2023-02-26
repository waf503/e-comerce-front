import { useState } from "react";
import { Link,  } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setpassword_confirmation] = useState("");
    const { register, errors } = useAuthContext();

    const handleRegister = async (event) => {
        event.preventDefault();  
        register({name, email, password, password_confirmation});    
    }

    return (        
        <section className="bg-gray-50 dark:bg-gray-900 max-w-4xl mx-auto ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Register    
                </h1>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Registra tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@company.com" 
                                required
                                value={name}
                                onChange={(e)=>setName(e.target.value)} />
                                {errors.name && 
                                <div className="flex">                            
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.name[0]}</span>
                                </div>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                                <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@company.com" 
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)} 
                                />
                                {errors.email && 
                                <div className="flex">                            
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
                                </div>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                                {errors.password && 
                                <div className="flex">                            
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
                                </div>}
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
                                <input 
                                type="password" 
                                name="password_confirmation" 
                                id="password_confirmation" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                                value={password_confirmation}
                                onChange={(e)=>setpassword_confirmation(e.target.value)}
                                />
                                {errors.password_confirmation && 
                                <div className="flex">                            
                                    <span className="text-red-400 text-sm m-2 p-2">{errors.password_confirmation[0]}</span>
                                </div>}
                            </div>
                            
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrarme</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Ingresa</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
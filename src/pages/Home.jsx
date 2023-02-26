import useAuthContext from "../context/AuthContext";

export default function Home() {
    const { user } = useAuthContext();

    
    return (        
        <div className="max-w-7xl mx-auto mt-12 ">
           <h2>Welcome | { user?.name } </h2>
        </div>
    );
}
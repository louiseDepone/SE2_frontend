
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function useAuth() {
    const [isTokenValid, setIsTokenValid] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
            localStorage.clear()
            return navigate("/login", { replace: true });
        }
        const decryptUser = async () => {
            try {
                const res = localStorage.getItem("userId")
                const response = await axios.get(`http://localhost:3000/user/${res}`, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setIsTokenValid(response?.data?.result[0])
            } catch (error) {
                
                localStorage.clear()
                return navigate("/login", { replace: true });
           
            }
        };

        decryptUser()
        
    },[]);

    return  isTokenValid;
}

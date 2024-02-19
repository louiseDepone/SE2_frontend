
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function useAuth() {
    const [isTokenValid, setIsTokenValid] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const decryptUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/decrypt', {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setIsTokenValid(response.data.user)             
            } catch (error) {
                
                localStorage.clear()
                return navigate("/login", { replace: true });
           
            }
        };

        decryptUser()
        
    },[]);

    return isTokenValid;
}

import useAuth from '@/hooks/useAuth';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import React, { useState, useEffect , useRef} from 'react';
import profile from '../../assets/profile.png';
import lock from '../../assets/lock.png';
import openeyes from '../../assets/openeyes.png';
import closeeyes from '../../assets/closeeyes.png';
import loginbg from '../../assets/loginbg.png';

export default function Login() {
  const authenticationOfUser = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(authenticationOfUser){
      navigate("../authenticated", {replace:true})
    }
  },[authenticationOfUser])
  
  const [error, setError] = useState(false)
  const password = useRef()
  const eyes = useRef()
  const [date, setDate] = useState(new Date());
  const month = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
  useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    const showHide = () => {
      console.log(password.current.type)
      if (password.current.type === "password"){
          password.current.type = "text"
          eyes.current.src = closeeyes
      }else{
          password.current.type = "password"
          eyes.current.src = openeyes
      }
    }

  const submit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
   
    const cred = {
      id_number: formData.get('id_number'),
      password: formData.get('password')
    }

    const login = await axios.post("http://localhost:3000/user/login", cred).then(response => {
      localStorage.setItem('token',response?.data?.token)
      navigate("../authenticated", {replace:true})
    }).catch(err => {
      setError(err.response.data.error)
    })
  }  
 return (

  <div className=" bg-[#F6F6F9] h-screen flex items-center">
  <div className="w-6/12 flex flex-col  items-center">
  <img src={loginbg} alt="" className='w-6/12 ' />
  <div className='text-center text-2xl'>
      <h1 className='text-7xl font-light'>{date.getHours() < 10 && 0}{date.getHours()}:{date.getMinutes() < 10 && 0}{date.getMinutes()}:{date.getSeconds() < 10 && 0}{date.getSeconds()}</h1>
      <h1>{month[date.getUTCMonth()]} {date.getDate() < 10 && 0}{date.getDate()}, {date.getUTCFullYear() < 10 && 0}{date.getUTCFullYear()}</h1>
     
  </div>
  </div>
  <div className="w-6/12 ">
      <div className="flex flex-col items-center pb-5 ">
          <div className="text-center w-9/12 pb-7" > 
              <p className='text-5xl font-bold'>Sign In</p>
              <p className='text-gray-400 pt-2 text-sm'>time to log in and take control of your schedule.</p>
          </div>
          <form onSubmit={submit} className="w-9/12" method='POST'>
              <p htmlFor="idNumber" className='mb-1'> Enter ID Number </p>
              <div className=" flex p-3 pl-6 pr-6 border-solid rounded-md border-2 border-gray-300 ">
                  <img src={profile} alt="" className='w-8'/>
                  <input placeholder="ID Number" required name="id_number"  className=" w-full ml-3 bg-transparent outline-none"type="text" /> 
              </div>
              <p className="mt-2 mb-1 " htmlFor="password"> Enter Password </p>
              <div className="flex p-3 pl-6 pr-6 border-solid rounded-md border-2 border-gray-300 ">
                  
                  <img src={lock} alt="" className='w-8'/>
                  <input required className="ml-3 w-full bg-transparent outline-none" placeholder="Password" type="password" ref={password} name="password"/> 
                  <button type='button' name='password' onClick={showHide}><img src={openeyes} alt="" ref={eyes} className='w-10'/> </button>
              </div>
              {error && <div className='text-red-500 w-full flex justify-center pt-3'>{error}</div>}

              <button  type="submit" className="w-full mt-5 p-3  rounded-md bg-[#009BFF] text-lg font-semibold text-white">Sign In</button>
          </form>
      </div>
  </div>
</div>
  )
}

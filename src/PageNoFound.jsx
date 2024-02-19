import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export default function PageNoFound() {
    const navigate = useNavigate()
  return (
    <div className="w-screen h-screen bg-red-600 flex items-center justify-center flex-col font-bold">
            PageNoFound
    <br/>
    <button className="border-black p-2 px-4 border" onClick={() => {
        navigate("../Login",{ replace: true})
    }}> grgr </button>
    </div>
  )
}

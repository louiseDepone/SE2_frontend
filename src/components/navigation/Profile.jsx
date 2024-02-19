import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"

export const Profile = ({user_name, user_role}) => {
    const navigation = useNavigate()

    return(
        <>
        <NavigationMenu>
            <NavigationMenuList >
                <NavigationMenuItem >
                            <NavigationMenuTrigger className="p-6  hover:bg-transparent ">
                <div className="flex h-5/6 items-center justify-end" >
                    <div className="h-10 w-10 flex bg-[#E9F7FF] text-[#009BFF] justify-center items-center mr-2 rounded-full">
                        <p className="font-extrabold text-sm">{user_name.slice(" ")[0][0].toLocaleUpperCase()}{user_name.slice(" ")[1][0].toLocaleUpperCase()}</p>
                    </div> 
                    <div className="ml-1 text-xs flex flex-col jsutify-start items-start ">
                        <div className="flex  w-max   ">
                            <p className="mr-4 text-gray-500">{user_name}</p> 

                        </div>
                        <p className="font-bold">{user_role}</p>
                    </div>
                </div>
                            </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white px-12 w-full py-1 hover:bg-gray-500 hover:text-white text-sm" 
                     
                    >
                        <NavigationMenuLink  onClick={() => {
                            localStorage.clear()
                            navigation('../login' , { replace: true })
                        }}>
                                <button >Logout</button>
                        
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </>
        )
}
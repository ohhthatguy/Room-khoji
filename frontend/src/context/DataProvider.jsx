
import { createContext, useState } from "react";

export const DataContext = createContext(null)

const DataProvider = ({children})=>{
    
    const initial = {
        category: '',
        name: '',
        email: '',
        profile: '',
        _id: ''
    }
    const[account, setAccount] = useState(initial)
    const[isUpdatedPost, setIsUpdatedPost] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [openPortal, setOpenPortal] = useState(false)

    // console.log(account)

    return (
        <DataContext.Provider value={{setAccount, account,setOpenPortal, openPortal,setIsUpdatedPost,isUpdatedPost,setDarkMode, darkMode }}>
            {children}
        </DataContext.Provider>
    )


}

export default DataProvider
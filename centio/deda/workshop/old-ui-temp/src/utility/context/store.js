import React, { createContext, useState } from 'react'
export const Store = createContext()
const StoreContext = ({ children }) => {
    const [arr, setArr] = useState([])
 
    const states = {
        data:[arr, setArr]
    }
    return <Store.Provider value={states}>{children}</Store.Provider>
}
export default StoreContext
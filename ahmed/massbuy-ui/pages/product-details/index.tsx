import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import ProductDetail from './components/ProductDetail'
import OtherProduct from '../../components/OtherProduct/index'
import { getProductsById } from '../../services'
import toast from 'react-hot-toast'

export default function Index() { 

    const [data, setData] = React.useState({} as any)  
    const [product_id, setProductId] = React.useState(""); 
    const [loading, setLoading] = React.useState(true); 

    React.useEffect(() => {
        setProductId(localStorage.getItem("product")+"");
    }, []);  

    React.useEffect(() => { 
      (async () => {
          try { 
          const response = await getProductsById(product_id); 
            setData(response);  
            setLoading(false)
          } catch (err) {
            toast.error("Error occured");
          } 
      })(); 
    }, [product_id]); 

    return ( 
        <>
            {loading && (
                <div className=' w-full pt-32 text-2xl flex justify-center font-Inter-ExtraBold ' >
                    Loading ....
                </div>
            )}
            {!loading && ( 
                <MenuLayout menu={false} category={true} >
                    <div className=' w-full bg-[#F5F5F5] lg:pl-[32px] lg:pr-[32px] ' > 
                        <div className=' w-full  text-black   pt-6 pb-4  ' >
                            <p className=' font-semibold text-[#979494] lg:flex items-center hidden ' >Home <span className=' mx-2 font-bold ' >{" > "} </span> Special items <span className=' mx-2 font-bold ' >{" > "} </span>  <span className=' text-black ' >{data?.itemName}</span></p> 
                            <p className=' font-semibold text-[#000] lg:hidden lg:ml-0 text-xl ml-6' >{data?.itemName}</p> 
                        </div>
                        <div className=' w-full flex lg:flex-row flex-col pb-12 ' >
                            <div className=' w-full lg:pr-5 ' >
                                <ProductDetail productId={product_id} data={data} />
                            </div>
                            <div className=' w-full lg:w-fit lg:mt-0 mt-6 px-4 lg:px-0' >
                                <div className=' w-full lg:w-[400px] overflow-y-auto ' >
                                    <OtherProduct />
                                </div>
                            </div>
                        </div>
                    </div>
                </MenuLayout>
            )}
        </>
    )
}

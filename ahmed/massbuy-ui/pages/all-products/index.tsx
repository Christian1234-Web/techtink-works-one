import React,{useCallback, useEffect} from 'react'
import MenuLayout from '../../components/MenuLayout' 
import SingleItem from '../../components/homepagecomponents/SingleItem'
import { getCategories } from '../../services';
import toast from 'react-hot-toast';

export default function Index() {
 
    const [category, setCategory] = React.useState({} as any) 
    // const product_id = localStorage.getItem("product_id")
    // const [product_id, setProductId] = React.useState({} as any); 

   
  const fetchCategory = useCallback(async () => {
    let  product_id = localStorage.getItem("product_id");
    try {
      const response = await getCategories();
      response?.map((item: any) => {
        if (item.title === product_id) {
          // console.log(item,'skasla');
          setCategory(item);
        }
      })
      //   console.log(response); 
    } catch (err) {
      toast.error("Error occured");
    }
  }, []);
  //  useEffect(() => { 
  //     (async () => {
  //         try { 
  //         const response = await getCategories();
  //         response?.map((item: any) => {
  //           if(item.title === product_id){
  //               console.log(item); 
  //               setCategory(item);
  //           }
  //         })
  //       //   console.log(response); 
  //         } catch (err) {
  //           toast.error("Error occured");
  //         } 
  //     })(); 
  //   }, []); 
    useEffect(() => {
      // console.log(localStorage.getItem("product_id"));
      fetchCategory();
    }, [fetchCategory]);  

    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full mt-4 lg:mt-12 ' >
                <SingleItem title='Groceries' category={category} label={true} />
            </div>
        </MenuLayout>
    )
} 
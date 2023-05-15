import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import SingleItem from '../components/homepagecomponents/SingleItem'
import HeroSection from '../components/homepagecomponents/HeroSection'
import Packages from '../components/homepagecomponents/Packages'
import Electronic from '../components/homepagecomponents/Electronics/Index' 
import MenuLayout from '../components/MenuLayout'
import React, { useCallback, useEffect } from 'react'
import { getCategories } from '../services'
import toast from "react-hot-toast";
// import { Inter } from '@next/font/google' 
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [category, setCategory] = React.useState([] as any) 

  // React.useEffect(() => { 
  //   (async () => {
  //       try { 
  //       const response = await getCategories();
  //       console.log(response, 'hii'); 
  //       setCategory(response);
  //       } catch (err) {
  //         toast.error("Error occured");
  //       } 
  //   })(); 
  // }, []);
  const fetchC = useCallback(async () => {
    try {
      const response = await getCategories();
      // console.log(response, 'hii');
      setCategory(response);
    } catch (err) {
      toast.error("Error occured");
    }
  }, []);

  useEffect(() => {
    fetchC();
  }, [fetchC]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main> 
        <MenuLayout menu={false} category={false}> 
          <div className=' w-full mt-[10px] lg:mt-[32px] ' > 
            <HeroSection /> 
            {category?.map((item: any, index: number)=> {
              return(
                <div key={index} className=' w-full ' >
                  {item.title === "kids & Babies" &&
                    <Packages title={item.title} label={false}  />
                  } 
                  {/* mot active */}
                  {item.title === "electronic" && 
                    <Electronic label={false} category={item?._id} />
                  } 
                  {/* end  */}
                  {item.title !== "electronic" && item.title !== "kids & Babies" &&
                    <SingleItem label={false} title="Top Deals" category={item} />
                  }
                </div>
              )
            })}
            {/* <SingleItem label={false} title="Top Deals" category={category[2]} />
            <Packages title='Groceries' label={false} />
            <Packages title='Special Event' label={false} />
            <Packages title='Startup & Business' label={false} />
            <Electronic label={false} category={category[4]?._id} />
            <Packages title='Kids & Babies' label={false} />
            <SingleItem label={false} title="Home Appliances" category={category[0]}  />
            <SingleItem label={false} title="Kitchen Item" category={category[1]}  />
            <SingleItem label={false} title="Others" category={category[1]}  />  */}
          </div>
        </MenuLayout>
      </main>
    </>
  )
}

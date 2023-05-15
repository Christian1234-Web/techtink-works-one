import React from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'; 
import * as yup from 'yup'
import { useFormik } from 'formik'; 
import { Image, Input, useToast } from '@chakra-ui/react'
import { useRegisterCallback } from '../../services/authService'

export default function SignUp() {

 
    const toast = useToast()
    const [loading, setLoading] = React.useState(false)
    const [isShown, setIsShown] = React.useState(false)
    const { handleRegister } = useRegisterCallback();
    const loginSchema = yup.object({ 
        firstname: yup.string().required('Required'),
        lastname: yup.string().required('Required'),
        phone: yup.string().required('Required'),
        email: yup.string().email('This email is not valid').required('Your email is required'),
        password: yup.string().required('Your password is required').min(8, 'A minimium of 8 characters')
    })  

    // formik
    const formik = useFormik({
        initialValues: {firstname: '', lastname: '', email: '', password: '', phone: ''},
        validationSchema: loginSchema,
        onSubmit: () => {},
    }); 

    const submit = async () => { 
        setLoading(true)
        if (!formik.dirty) { 
            // toast.error("Please Enter Your Email And Password") 
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            }) 
        }else if (!formik.isValid) { 
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })  
        } else{ 
            const response = await handleRegister(JSON.stringify(formik.values))   
            if(response?.status === 200){
                toast({
                    title: response?.data?.msg,
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })  
            } else { 
                toast({
                    title: response?.data?.msg ? response?.data?.msg : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })  
            } 
        }
        setLoading(false); 
    }
    
    return (
        <div className=' w-full h-screen bg-white lg:bg-[#F5F5F5] flex flex-col items-center ' > 
            <div className=' bg-white w-full flex lg:loginShadow lg:px-[35px] py-[22px] justify-center items-center ' >
                <button onClick={()=> Router.push("/")} className=' flex items-center ' >
                    <Image src="/images/logo.svg" alt='logo' className=' h-[15px] ' />
                    <Image src="/images/massbuy.svg" className=' ml-1 h-[18px] ' alt='logo' />
                </button>
            </div>
            <div className='  lg:loginShadow w-full lg:w-[600px] font-medium my-6 lg:my-12 rounded-xl flex flex-col bg-white py-8 px-4 lg:px-[45px]  ' >
                <p className=' font-bold lg:text-2xl text-center ' >Create Account</p>
                <div className=' w-full mt-10 lg:mt-8 ' >
                    <p className=' text-sm font-medium mb-2 ' >First Name</p>
                    <Input 
                        name="firstname"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("firstname", true, true)
                        }  
                        height="45px" border="1px solid #595959E5" placeholder='Enter First Name' fontSize="sm" />
                    <div className="w-full h-auto pt-2">
                        {formik.touched.firstname && formik.errors.firstname && (
                            <motion.p
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xs font-Inter-Medium text-[#ff0000]"
                            >
                                {formik.errors.firstname}
                            </motion.p>
                        )}
                    </div> 
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm font-medium mb-2 ' >Last Name</p>
                    <Input 
                        name="lastname"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("lastname", true, true)
                        }  
                        height="45px" border="1px solid #595959E5" placeholder='Enter Last Name' fontSize="sm" />
                    <div className="w-full h-auto pt-2">
                        {formik.touched.lastname && formik.errors.lastname && (
                            <motion.p
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xs font-Inter-Medium text-[#ff0000]"
                            >
                                {formik.errors.lastname}
                            </motion.p>
                        )}
                    </div> 
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm font-medium mb-2 ' >Email Address</p>
                    <Input 
                        name="email"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("email", true, true)
                        }  
                        height="45px" border="1px solid #595959E5" placeholder='Enter email address' fontSize="sm" />
                    <div className="w-full h-auto pt-2">
                        {formik.touched.email && formik.errors.email && (
                            <motion.p
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xs font-Inter-Medium text-[#ff0000]"
                            >
                                {formik.errors.email}
                            </motion.p>
                        )}
                    </div> 
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >Password</p>
                    <div className=' w-full relative h-[45px] ' >
                        <Input 
                            name="password"
                            onChange={formik.handleChange}
                            onFocus={() =>
                                formik.setFieldTouched("password", true, true)
                            }  
                            height="45px" type={!isShown ? "password": "text"} border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" /> 
                        <button className=' top-0 z-20 absolute right-0 px-4 h-full flex items-center justify-center ' onClick={()=> setIsShown((prev)=> !prev)} >
                            <img src='/images/icon/eye.svg' alt="eye" />
                        </button>
                    </div>
                    <div className="w-full h-auto pt-2">
                        {formik.touched.password && formik.errors.password && (
                            <motion.p
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xs font-Inter-Medium text-[#ff0000]"
                            >
                                {formik.errors.password}
                            </motion.p>
                        )}
                    </div> 
                </div>  
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm font-medium mb-2 ' >Phone</p>
                    <Input 
                        name="phone"
                        onChange={formik.handleChange}
                        onFocus={() =>
                            formik.setFieldTouched("phone", true, true)
                        }  
                        type="number"
                        height="45px" border="1px solid #595959E5" placeholder='Enter phone' fontSize="sm" />
                    <div className="w-full h-auto pt-2">
                        {formik.touched.phone && formik.errors.phone && (
                            <motion.p
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xs font-Inter-Medium text-[#ff0000]"
                            >
                                {formik.errors.phone}
                            </motion.p>
                        )}
                    </div> 
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm font-medium mb-2 ' >Referral</p>
                    <Input 
                        // name="email"
                        // onChange={formik.handleChange}
                        // onFocus={() =>
                        //     formik.setFieldTouched("email", true, true)
                        // }  
                        height="45px" border="1px solid #595959E5" placeholder='Referral Code' fontSize="sm" />
                </div>
                <p className=' text-sm text-center mt-4 mb-4 font-medium lg:w-96 mx-auto ' >By signing up you accept our terms and conditions & privacy policy</p>
                <button disabled={loading} onClick={()=> submit()} className=' w-full h-[45px] rounded-[5px] text-white bg-[#E35C1B] font-Inter-ExtraBold text-sm mt-3 '>{loading ? "Loading...":"Create Account"}</button>
                <p className=' text-sm text-center mt-6 font-medium ' >Dont have an account? <span onClick={()=> Router.push("/login")}  className=' text-[#E35C1B] ml-1 font-bold ' >Login</span></p>
            </div>
        </div>
    )
} 
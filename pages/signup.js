import Head from 'next/head'
// import Layout from '../layout/layout'
import Link from 'next/link'
// import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router';
import { getSession, useSession, signIn,signOut } from "next-auth/react"
import Loader from '@/components/Loader';


 function Signup() {
    const [show, setShow] = useState({ password: false, cpassword: false })
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [showMessage, setShowMessage] = useState(true);
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);

    function handleSignOut(){
      signOut()
    }

    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username : username,
            email: email,
            password: password,
            cpassword: cpassword
        },
        validate: registerValidate,
        // handleSubmit
    })

    async function handleSubmit(e){
          setIsLoading(true);


      try{
          e.preventDefault();
          let values={ username, email,cpassword, password }
  
          // Send signup request to the API
          const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();
          console.log(data);

          setMessage(data.message)
          setMsgColor(data.msgColor)
          
          const timer = setTimeout(() => {
          setIsLoading(false);
          setShowMessage(false)
                // router.push("http://localhost:3000");
          if(response.success){
            fetchVerification()
          }

          }, 2000);
           return () => clearTimeout(timer);

      }catch(error){

          setMessage(error.message)
          setMsgColor(error.msgColor)

          const timer = setTimeout(() => {
                setIsLoading(false);
                setShowMessage(false);
          }, 2000);
           return () => clearTimeout(timer);
      }
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google')
    
        let username = session.user.name
        let email =session.user.email
        let password="123456"
        // Send signup request to the API
          let values={ username, email,cpassword, password }
  
        try{
        // Send signup request to the API
        const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log(data);

        setMessage(data.message)
        setMsgColor(data.msgColor)
        
        const timer = setTimeout(() => {
        setIsLoading(false);
        setShowMessage(false)
              router.push("http://localhost:3000");

        }, 2000);
          return () => clearTimeout(timer);


        }catch(error){

            setMessage(error.message)
            setMsgColor(error.msgColor)

            const timer = setTimeout(() => {
                  setIsLoading(false);
                  setShowMessage(false);
            }, 2000);
            return () => clearTimeout(timer);
          }
        
    }

    // Github Login 
    async function handleGithubSignin(){
        signIn('github')
          fetchVerification()

    }

        const fetchVerification = async () => {
        try {
          const response = await fetch('/api/verifications', {
            method: 'POST',
          });
          const jsonData = await response.json();
          console.log(jsonData)
          handleWebhook()
          // Redirect to a specific route after the component mounts
           router.push(jsonData.url);

        } catch (error) {
           console.log(error)
          console.error('Error fetching data:', error);
        }
    }

    const handleWebhook= async () => {
      try {
        const res = await fetch('/api/webhooks', {
          method: 'POST',
        });

        // const result = await res.json();

        console.log("result2  "+res)
        // console.log("result3  "+result)

      } catch (error) {
        console.log(error)
      }
    }

    return (

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section
            className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
          >
            <img
              alt="night"
              src="../images/img3.jpg"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Hustle_hub 
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                 Bringing skilled artisans to your doorstep
              </p>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1
                  className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                >
                  Welcome to Hustle_hub 
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Bringing skilled artisans to your doorstep
                </p>
              </div>
              <div>
                  <h3 class="font-heading text-4xl text-gray-900 font-semibold mb-4">Sign Up</h3>
                  <p class="text-lg text-gray-500 mb-10">Greetings ! We kindly request you to enter your details.</p>
                  <div class="flex flex-wrap mb-6 items-center -mx-2">
                    <div class="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                      <a onClick={handleGoogleSignin} class="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100" href="#">
                        <img src="saturn-assets/images/sign-up/icon-facebook.svg" alt=""/>
                        <span class="ml-4 text-sm font-semibold text-gray-500">Login with Google</span>
                      </a>
                    </div>
                    <div class="w-full md:w-1/2 px-2">
                      <a onClick={handleGithubSignin} class="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100" href="#">
                        <img src="saturn-assets/images/sign-up/icon-apple.svg" alt=""/>
                        <span class="ml-4 text-sm font-semibold text-gray-500">Login with Github</span>
                      </a>
                    </div>
                  </div>
                  <div class="flex mb-6 items-center">
                    <div class="w-full h-px bg-gray-300"></div>
                    <span class="mx-4 text-sm font-semibold text-gray-500">Or</span>
                    <div class="w-full h-px bg-gray-300"></div>
                  </div>
              </div>

                  {showMessage? (
                    <div class="w-full md:w-1/2 px-2">
                        {/* <p class={`ml-4 text-sm font-semibold bg-green text-gray-500`}>{message}</p> */}
                   
                    <div class={`relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold ${msgColor} text-orange-50 rounded-full overflow-hidden`}>
                      
                      <div class={`absolute top-0 right-full w-full h-full bg-gray-900 ${msgColor} transform group-hover:translate-x-full group-hover:scale-102 transition duration-500`}></div>
                      <span class="relative">{message}</span>
                       <Loader isLoading={isLoading} />
                    </div>

                     </div>

                    )

                  : <div>
                    
                    </div>}
              <form  className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                <div className={`col-span-6  ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                  <label
                    htmlFor="Username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    name='Username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* <div className="col-span-6 sm:col-span-3" >
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="Phone_number"
                    name="Phone_number"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div> */}
                <div className={`col-span-6 ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>

                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div className={`col-span-6 sm:col-span-3${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className={`col-span-6 sm:col-span-3 ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>

                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      terms and conditions
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          
                   <button 
                    onClick={handleSubmit}
                    class="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden" type="submit">
                      <div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span class="relative">SignUp</span>
                    </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    {/* <a href="login" className="text-gray-700 underline">Log in</a>. */}
                    <a href={'/login'} className="text-gray-700 underline">Log in</a>.
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>

    )
}
// export async function getServerSideProps({ req }){
//   const session = await getSession({ req })

//   if(!session){
//     return {
//       redirect : {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }
export default Signup

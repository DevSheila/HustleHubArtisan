import Head from 'next/head'
import Image from 'next/image'

// import a from 'next/a'
import { useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"
import NavBar from '@/componenets/navBar'
import MyApp from './_app'
export default function Home() {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <>
    <NavBar/>
    </>
    // <div className={styles.container}>
    //   <Head>
    //     <title>Home Page</title>
    //   </Head>

    //   {session ? User({ session, handleSignOut }) : Guest()}
    // </div>
  )
}

// Guest
// function Guest(){
//   return (
//     <main className="container mx-auto text-center py-20">
//           <h3 className='text-4xl font-bold'>Guest Homepage</h3>

//           <div className='flex justify-center'>
//             <a href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a>
//           </div>
//       </main>
//   )
// }

// // Authorize User
// function User({ session, handleSignOut }){
//   return(
//     <main className="container mx-auto text-center py-20">
//           <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

//           <div className='details'>
//             <h5>{session.user.name}</h5>
//             <h5>{session.user.email}</h5>
//           </div>

//           <div className="flex justify-center">
//             <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
//           </div>

//           <div className='flex justify-center'>
//             <a href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Pag</a>
//           </div>
//       </main>
//   )
// }


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
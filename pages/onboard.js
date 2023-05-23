import Loader from "@/components/Loader";
import { useState } from "react";
import React from "react";
import { getSession, useSession, signIn,signOut } from "next-auth/react"
import { useRouter } from 'next/router';


function Onboar() {
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [years, setYears] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");
  const [submitVisible, setSubmitVisible] = useState(false);

  const [image, setImage] = useState("");

    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [showMessage, setShowMessage] = useState(true);
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  // let currentTab = 0; // Current tab is set to be the first tab (0)
  // showTab(currentTab); // Display the current tab


  async function handleSubmit(e) {
    e.preventDefault();
    let values = {phone, profession, years, image };

    if(values.phone === "" || values.profession === "" || values.years === "" || values.image === "" ){
         setMessage("fill in all fields")
          setMsgColor("bg-red-500")
          
          const timer = setTimeout(() => {
          setIsLoading(false);
          setShowMessage(false)

          }, 2000);
           return () => clearTimeout(timer);
    }
    console.log(values);
    try {
        setIsLoading(true);

      // Send signup request to the API
      const response = await fetch("/api/artisan/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("response " + response);
      console.log("data " + response.data);
      console.log("message" + response.message);
      
        setMessage(data.message)
        setMsgColor(data.msgColor)
        
        const timer = setTimeout(() => {
        setIsLoading(false);
        setShowMessage(false)
                router.push("http://localhost:3000/land");

        }, 2000);
            return () => clearTimeout(timer);
    } catch (error) {
        console.log("error" + error);
        setMessage(error.message)
        setMsgColor(error.msgColor)

        const timer = setTimeout(() => {
                setIsLoading(false);
                setShowMessage(false);
        }, 2000);
        return () => clearTimeout(timer);
    }
  }

  const handleYears = (years) => {
    // setYears(years)
    console.log(years);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target.result);
    reader.readAsDataURL(file);
  };
  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   // Process the selected files here

  return (
    <div>
      <div
        class="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8   relative items-center"
        //  class="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        // style={{
        //   backgroundImage: `url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)`,
        // }}
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <div class="grid  gap-8 grid-cols-1">
            <div class="flex flex-col ">
              <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-bold text-lg mr-auto">Artisan Info</h2>
                <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
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
              <div class="mt-5">
                <div class="form">
                  <div class="md:space-y-2 mb-3">
                    <label class="text-xs font-bold text-gray-600 py-2">
                      Profile_photo
                      <abbr class="hidden" title="required">
                        *
                      </abbr>
                    </label>
                    <div class="flex items-center py-6">
                      <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                        <img
                          id="image"
                          className="object-cover w-full h-32 rounded-full"
                          src={image}
                          alt=""
                        />
                      </div>

                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            stroke="none"
                          ></rect>
                          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                        Browse Photo
                      </label>

                      <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
                        Click to add profile picture
                      </div>

                      <input
                        name="photo"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        type="file"
                        onChange={handleImageUpload}
                          required="required"
                      />
                    </div>
                  </div>
                  <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div class="mb-3 space-y-2 w-full text-xs">
                      <label class="font-bold text-gray-600 py-2">
                        Phone Number <abbr title="required">*</abbr>
                      </label>
                      <input
                        type="number"
                        placeholder="phone"
                        name="phone"
                        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="phone"

                      />
                      <p class="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>

                  <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div class="w-full flex flex-col mb-3">
                      <label class="font-bold text-gray-600 py-2">
                        Profession<abbr title="required">*</abbr>
                      </label>
                      <select
                        class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="integration[city_id]"
                        id="integration_city_id"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                      >
                        <option disabled>Seleted Profession</option>
                        <option value="Plumber" >Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Cleaner">Cleaner</option>
                      </select>
                      <p class="text-sm text-red-500 hidden mt-3" id="error">
                        Please fill out this field.
                      </p>
                    </div>
                    <div class="w-full flex flex-col mb-3">
                      <label class="font-bold text-gray-600 py-2">
                        Years of experience<abbr title="required">*</abbr>
                      </label>
                      <select
                        class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="integration[city_id]"
                        id="integration_city_id"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        
                      >
                        <option value="0-2" disabled>0-2</option>
                        <option value="2-4" >2-4</option>
                        <option value="4-6" >4-6</option>
                        <option value="more than 6">more than 6</option>
                      </select>
                      <p class="text-sm text-red-500 hidden mt-3" id="error">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div class="flex-auto w-full mb-1 text-xs space-y-2">
                    <label class="font-bold text-gray-600 py-2">
                      Description
                    </label>
                    <textarea
                     required="required"
                      name="desc"
                      id=""
                      class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                      placeholder="Enter your comapny info"
                      spellcheck="false"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <p class="text-xs text-gray-400 text-left my-3">
                      You inserted 0 characters
                    </p>
                  </div>
                  <p class="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{" "}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    {/* <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                      {" "}
                      Cancel{" "}
                    </button> */}
                    <button    onClick={handleSubmit} class="mb-2 md:mb-0 bg-blue-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
export default Onboar;

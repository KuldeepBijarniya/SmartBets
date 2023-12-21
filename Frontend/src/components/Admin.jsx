import React, { useState } from "react";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [expiry, setExpiry] = useState("");

  function handleSubmit() {
    setVisible3("block");
    axios
      .post("http://localhost:8282/login", { username: username, password: password })
      .then((response) => {
        console.log(response.data);
        if (response.data === true) {
          setVisible("none");
          setVisible2("block");
          setVisible3("none");
        }
        else{
          console.log('Error!!')
          setVisible3("none");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function handleSubmit2() {
    setVisible4("block");
    axios
      .post("http://localhost:8282/uploadAnswer",{ answer: name})
      .then((response) => {
        console.log(response.data);
        if(response.data==="Error!"){
          alert("something went wrong")
          setVisible4("none");
        }
        else{
          alert('Answer Uploaded Successfully!! : '+response.data);
          setVisible4("none");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function handleSubmit3() {
    setVisible4("block");
    await axios
      .get("http://localhost:8282/uploadQuestion")
      .then((response) => {
        console.log(response.data);
        if(response.data==="Error!"){
          alert("something went wrong")
          setVisible4("none");
        }
        else{
          alert('Questiion Uploaded Successfully!! : '+response.data);
          setVisible4("none");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [visible, setVisible] = useState("block");
  const [visible2, setVisible2] = useState("none");
  const [visible3, setVisible3] = useState("none");
  const [visible4, setVisible4] = useState("none");
  return (
    <div className="containers mx-auto   my-36">
      <div
        className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-50rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="" style={{ display: visible }}>
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Admin Login</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="User Name"
            />
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <button
              onClick={handleSubmit}
              className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
            <LinearProgress style={{ display: visible3 }} color="success" />
          </div>
        </div>
      </div>
      <div className="" style={{ display: visible2 }}>
   
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Set Correct Answer</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              placeholder="Correct Answer"
            />
            
            <button
              onClick={handleSubmit2}
              className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
         Upload
            </button>
            <LinearProgress style={{ display: visible4 }} color="success" />
          </div>
        </div>

        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Upload Question</h1>
   
            <button
              onClick={handleSubmit3}
              className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
         Upload
            </button>
         
          </div>
        </div>
      </div>
      </div>
  
  );
}

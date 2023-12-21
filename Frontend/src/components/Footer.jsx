import React from 'react'
import logo from '../images/TR.png'
import { Link } from "react-router-dom";
export default function Footer() {
  return (
   
<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8" id="bottom-bar">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0">
                <img src={logo} className="h-10 w-16" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BettingPlatform</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/" className="mr-4 hover:underline md:mr-6 ">Home</Link>
                </li>
                <li>
                    <Link to="/register" className="mr-4 hover:underline md:mr-6">Bet</Link>
                </li>
                <li>
                    <Link to="/result" className="mr-4 hover:underline md:mr-6 ">Result</Link>
                </li>
                <li>
                    <Link to="/admin" className="hover:underline">Admin Portal</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a to="/" className="hover:underline">BettingPlatform™</a> All Rights Reserved.</span>
    </div>
</footer>


  )
}

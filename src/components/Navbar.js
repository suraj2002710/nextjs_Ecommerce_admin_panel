import React from 'react'

const Navbar = () => {
  return (
    <>
          <nav className="bg-gray-800 py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                          <div className="flex-shrink-0">
                              <a href="#" className="text-white text-2xl font-bold">MyWebsite</a>
                          </div>
                          <div className="hidden md:block">
                              <div className="ml-10 flex items-baseline space-x-4">
                                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                              </div>
                          </div>
                      </div>
                      <div className="hidden md:block">
                          <div className="ml-4 flex items-center md:ml-6">
                              <button className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium">Sign in</button>
                          </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>

              <div className="hidden md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                      <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
                      <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</a>
                      <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Services</a>
                      <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact</a>
                  </div>
              </div>
          </nav>


    </>
  )
}

export default Navbar
import React from 'react'

const ProductCard = () => {
  return (
    <>

          <div className="flex flex-col w-0 flex-1 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Card 1 */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card 1" />
                      <div className="p-4">
                          <h2 className="text-lg font-bold text-gray-800">Card 1</h2>
                          <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                  </div>
                  {/* 
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card 2" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">Card 2</h2>
                <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card 3" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">Card 3</h2>
                <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card 4" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">Card 4</h2>
                <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div> */}
              </div>
          </div>
    </>
  )
}

export default ProductCard
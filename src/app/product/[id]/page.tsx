import { getProductById } from '@/actions'
import Modal from '@/components/Modal';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import { IoMdReturnLeft } from "react-icons/io";
import loading from './loading';
import Loading from './loading';
const page = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const product: any = await getProductById(params.id);
  // console.log("productDetails", product);
  if (!product) {
    notFound();
  }
  
  return (
    <div className="flex flex-col items-center p-4 border-2 border-black">

      <Link href={"/"} className='text-md text-blue-900  absolute top-[10px] left-[10px]'><IoMdReturnLeft className='inline text-xl'/>HOME</Link>

      <div className=' flex  flex-col lg:flex-row border-b-2 border-gray-700 rounded-sm mb-8'>


        <img src={product.image} alt={product.title} className="object-cover mb-4" />

        <div className=' flex flex-col justify-center items-center gap-3'>
          <h1 className="text-2xl font-bold mb-2 capitalize">{product.title}</h1>
          <div className='flex flex-row justify-evenly  w-full'>

            <div className="flex items-center mb-4">
              <p className="text-gray-600 mr-2">Discount Rate:</p>
              <p className="text-xl font-semibold">{product.discountRate}%</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-gray-600 mr-2">Reviews :</p>
              <p className="text-xl font-semibold">{product.reviewsCount}</p>
            </div>
            <div className="flex items-center mb-4 opacity-40 gap-1">
              <p className='uppercase font-semibold text-xl'>m.r.p </p>
              <p className="text-xl font-semibold line-through ">{product.currency}{product.originalPrice}</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-between w-full'>

            <div className=' grid grid-cols-2  gap-2 justify-evenly  items-center'>

              <div className="flex items-center mb-4 shadow-md shadow-green-600 rounded-md p-2 col-span-1">
                <p className="text-gray-600 mr-2">Average Price:</p>
                <p className="text-xl font-semibold">{product.currency}{product.averagePrice}</p>
              </div>
              <div className="flex items-center mb-4 shadow-md shadow-yellow-600 rounded-md p-2 col-span-1">
                <p className="text-gray-600 mr-2">Current Price:</p>
                <p className="text-xl font-semibold ">{product.currency}{product.currentPrice}</p>
              </div>
              <div className="flex items-center mb-4 shadow-md shadow-blue-600 rounded-md p-2 col-span-1">
                <p className="text-gray-600 mr-2">Lowest Price:</p>
                <p className="text-xl font-semibold">{product.currency}{product.lowestPrice}</p>
              </div>
              <div className="flex items-center mb-4 shadow-md shadow-red-600 rounded-md p-2 col-span-1">
                <p className="text-gray-600 mr-2">Highest Price:</p>
                <p className="text-xl font-semibold">{product.currency}{product.highestPrice}</p>
              </div>
            </div>
            <div className=' flex justify-center items-center gap-2'>

              <Link className=' w-full rounded-xl bg-blue-700 py-4 px-6 text-white uppercase border-2 text-xl' href={product.url}>Buy Now!</Link>
              
            </div>
          </div>
          <div className="w-full mt-4">
            <h2 className="text-xl font-bold mb-2">Price History</h2>
            <ul className="list-inside list-disc text-gray-600 mb-4">
              {product.priceHistory.map((price: { price: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | Date; }, index: React.Key | null | undefined) => (
                <li key={index}>{product.currency}{price.price} - {new Date(price.date).toLocaleString()}</li>
              ))}
            </ul>
          </div>
           {/* email to track  */}
           <Modal productId={params.id}/>
        </div>
      </div>

              {/* Description */}
     <div className='flex flex-col justify-center items-center mx-2'>
     <h4 className='text-4xl  container font-semibold mb-6'>Description...</h4>
      <p className="text-gray-600 mb-4 ">{product.description}</p>
     </div>
    </div>


  )
}

export default page
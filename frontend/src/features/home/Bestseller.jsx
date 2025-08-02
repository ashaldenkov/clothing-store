import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/ShopContext'
import Title from '@/components/Title'
import ProductItem from '@/features/shared/ProductItem'
import LoadingSkeletons from './LoadingSkeletons'

const Bestseller = () => {

  const { products = [], isLoading } = useContext(ShopContext); // make sure it is array
    const [ bestSeller, setBestSeller ] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0,8))
    }, [products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1='BEST' text2='SELLERS'/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Shop our most popular pieces that customers can’t get enough of.
            </p>
        </div>

        {
            isLoading ? (
                <LoadingSkeletons />
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                        bestSeller.map((item, index) => {
                        return (
                            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                        )})
                    }
                </div>  
            )
        }


    </div>
  )
}

export default Bestseller
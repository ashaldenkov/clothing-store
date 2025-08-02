import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/ShopContext'
import Title from '@/components/Title'
import { assets } from '@/assets/assets'
import CartTotal from '@/features/shared/CartTotal'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'

const Cart = () => {

  const { products, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [ cartData, setCartData ] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const sizes in cartItems[items]) {
          if (cartItems[items][sizes] > 0) {
            tempData.push({
              id: items,
              size: sizes,
              quantity: cartItems[items][sizes]
            })
          }
        }
      }
      setCartData(tempData)
    }

  }, [cartItems, products])

  if (cartData.length == 0) {
    return ( 
      <div className='min-h-[50vh] flex flex-col items-center'>
        <div className='text-2xl mb-3 self-start'>
          <Title text1='YOUR' text2='CART'/>
        </div>
        <div className='my-auto text-lg flex flex-col items-center'>
          <p>Your cart is empty! Try to add some items first.</p>
          <Link to='/collection' 
            className='bg-black text-white mt-4 px-4 py-2 w-fit transistion-all duration-500 hover:bg-slate-700'>
            Go shopping!
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='border-t pt-14 animate-fade animate-duration-500'>
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART'/>
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) =>  product._id === item.id)
            return (
              <div key={index} className='py-4 border-t last:border-y text-gray-700 
              grid grid-cols-[3fr_2fr_0.5fr_0.5fr] sm:grid-cols-[3fr_2fr_0.5fr_0.5fr] max-sm:flex flex-col items-center gap-4'>
                <div className='flex items-stretch gap-6'>
                  <img className='block w-full max-w-[390px] sm:w-40 aspect-square object-cover' src={productData.image[0]} alt=''/>
                  <div className='hidden sm:flex flex-col'>
                    <a href={`/product/${productData._id}`} className='text-xs sm:text-lg font-medium'>{productData.name}</a>
                    <div className='w-fit mt-3 px-2 sm:py-1 border bg-slate-50'>
                      {item.size}
                    </div>
                  </div>
                </div>
                <input type='number' min={1} value={item.quantity} 
                onChange={(e)=> 
                  e.target.value === '' || e.target.value === '0' ? 
                  null : 
                  updateQuantity(item.id, item.size, Number(e.target.value))
                }
                className='hidden sm:block border ml-auto max-w-10 sm:max-w-20 p-1 sm:px-2'/>
                <NumberFlow
                    className='hidden sm:block w-fit mx-auto'
                    value={productData.price * item.quantity} 
                    format={{ 
                        style: 'currency', 
                        currency: 'USD', 
                        maximumFractionDigits: 2 
                    }} 
                />
                <img src={assets.deleteIcon} onClick={()=>updateQuantity(item.id, item.size, 0)} alt='' 
                  className='hidden sm:block w-4 h-4 mx-auto sm:w-5 cursor-pointer hover:fill-white hover:scale-110 transistion-all duration-300'/>

                {/* mobile */}
                <div className='sm:hidden w-full'>
                  <a href={`/product/${productData._id}`} className='max-w-[390px] mx-auto block text-lg text-center font-medium'>{productData.name}</a>
                  <div className='max-w-[390px] mx-auto flex justify-between items-center'>
                    <input type='number' min={1} value={item.quantity} 
                    onChange={(e)=> 
                      e.target.value === '' || e.target.value === '0' ? 
                      null : 
                      updateQuantity(item.id, item.size, Number(e.target.value))
                    }
                    className='border max-w-10 sm:max-w-20 p-1 sm:px-2'
                    />
                    <div className='py-1 px-2 border bg-slate-50'>
                      {item.size}
                    </div>
                    <NumberFlow
                        className='w-fit'
                        value={productData.price * item.quantity} 
                        format={{ 
                            style: 'currency', 
                            currency: 'USD', 
                            maximumFractionDigits: 2 
                        }} 
                    />
                    <img src={assets.deleteIcon} onClick={()=>updateQuantity(item.id, item.size, 0)} alt='' 
                      className='justify-self-end w-4 h-4 sm:w-5 cursor-pointer hover:fill-white hover:scale-110 transistion-all duration-300'
                    />
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>


      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} 
            className='bg-black text-white text-sm my-8 px-4 py-3 transistion-all duration-500 hover:bg-slate-700'>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
import React, { useContext } from 'react'
import { ShopContext } from '@/context/ShopContext'
import Title from '@/components/Title'
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext)

  // Fetch orders using React Query
  const { data: orderData = [], isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['userOrders', token],
    queryFn: async () => {
      if (!token) return []
      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } })
      if (response.data.success) {
        const orders = response.data.orders.reverse()
        return orders
      } else {
        toast.error(response.data.message)
        return []
      }
    },
    enabled: !!token, // Fetch only if token exists
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  })

  if (isLoading) {
    return <div className='my-10 gap-6 flex justify-center items-center'>
        <div className="w-6 h-6 border-4 border-t-gray-800 border-gray-300 rounded-full animate-spin"></div>
        <p className="text-center text-gray-600">Loading your orders...</p>
    </div>
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load orders. Please try again.</p>
  }

  return (
    <div className='border-t pt-16 animate-fade animate-duration-500'>
      <div className='text-2xl'>
        <Title text1='MY' text2='ORDERS' />
      </div>

      {/* No Orders Found */}
      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 mt-6 text-lg">
          You haven't placed any orders yet. <br /> 
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => window.location.href = '/'}>
            Start shopping now!
          </span>
        </p>
      ) : (
        orderData.map((order) => (
          <div key={order._id} className="mb-8">
            {/* Order Header */}
            <div className="bg-gray-50 px-4 py-3 rounded-lg mb-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order Date: {new Date(order.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    {currency}{order.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.paymentMethod}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`min-w-2 h-2 rounded-full ${
                      order.status === 'Order Placed' ? 'bg-green-500' :
                      order.status === 'Processing' ? 'bg-yellow-500' :
                      order.status === 'Shipped' ? 'bg-blue-500' :
                      order.status === 'Delivered' ? 'bg-green-600' :
                      'bg-gray-500'
                    }`}></p>
                    <p className='text-sm font-medium'>{order.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items for this order */}
            {order.items.map((item, index) => (
              <div key={`${order._id}-${index}`} className='py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row
              md:items-center md:justify-between gap-4 ml-4'>
                <div className='flex items-center gap-6 text-sm'>
                  <img src={item.image[0]} alt="" className='w-16 sm:w-20' />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>
                      {item.description.split('\r\n')[0]}
                    </p>
                  </div>
                </div>
                <div className='md:w-1/3 flex justify-end'>
                  <button 
                    onClick={refetch}
                    className={`border px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2
                      ${isRefetching ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    disabled={isRefetching}
                  >
                    {isRefetching ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></span>
                        Refreshing...
                      </>
                    ) : (
                      "Track Order"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
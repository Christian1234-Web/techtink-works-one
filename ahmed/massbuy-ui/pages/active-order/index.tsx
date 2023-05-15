import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import EmptyOrder from '../../components/OrderComponents/EmptyOrder'
import OrderItem from '../../components/OrderComponents/OrderItem'
import OrderSummary from '../../components/OrderComponents/OrderSummary'

export default function Index() {

    const [isEmpty, setIsEmpty] = React.useState(false)
    const [viewDetail, setViewDetail] = React.useState(false)

    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' >
                {!viewDetail && ( 
                    <div className=' w-full border-b  border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                        <p className=' font-bold text-lg ' >Active Order</p>
                    </div> 
                )}
                {isEmpty && ( 
                    <EmptyOrder title='No Active Order.' body="You have not made any purchase recently." />
                )}
                {!isEmpty && ( 
                    <>
                        {!viewDetail && ( 
                            <OrderItem detail={setViewDetail} />
                        )}
                        {viewDetail && ( 
                            <OrderSummary detail={setViewDetail}/>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    )
} 
// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from './store'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import InvoiceList from './list'
import Showcase from './steps/Showcase'
import FoodItem from './steps/FoodItem'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  const steps = [
    {
      id: 'cart',
      title: 'Dashboard',
      subtitle: 'Items',
      icon: <Home size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      )
    },
    {
      id: 'Address',
      title: 'Transaction',
      subtitle: 'transaction',
      icon: <CreditCard size={18} />,
      className: 'mt-2',
      content: <InvoiceList size={10} stepper={stepper} />
    },
    {
      id: 'payment',
      title: 'Showcase',
      subtitle: 'showcase',
      icon: <CreditCard size={18} />,
      content: <Showcase
        stepper={stepper}
        dispatch={dispatch}
        products={store.cart}
        getCartItems={getCartItems}
        addToWishlist={addToWishlist}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
    },
    {
      id: 'fooditem',
      title: 'Food Items',
      subtitle: 'showcase',
      icon: <CreditCard size={18} />,
      content: <FoodItem
        stepper={stepper}
        dispatch={dispatch}
        products={store.cart}
        getCartItems={getCartItems}
        addToWishlist={addToWishlist}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
    }
  ]

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Checkout' breadCrumbParent='eCommerce' breadCrumbActive='Checkout' />
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  )
}

export default Checkout

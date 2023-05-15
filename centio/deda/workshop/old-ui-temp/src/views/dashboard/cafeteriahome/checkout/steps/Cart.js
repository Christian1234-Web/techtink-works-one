// ** React Imports

// ** Third Party Components

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, InputGroup, Input, InputGroupText, Label, Col } from 'reactstrap'
import InvoiceList from '../list'
import { useForm, Controller } from 'react-hook-form'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'

const Cart = props => {
  // ** Props
  const { products, stepper } = props

  const defaultValues = {
    checkoutPrice: ''
  }
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues })
  // ** Function to convert Date
  // const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  //   if (!value) return value
  //   return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  // }

  // ** Funciton Function to toggle wishlist item
  // const handleWishlistClick = (id, val) => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(id))
  //   } else {
  //     dispatch(addToWishlist(id))
  //   }
  //   dispatch(getCartItems())
  // }

  // ** Render cart items
  // const renderCart = () => {
  //   return products.map(item => {
  //     return (
  //       <Card key={item.name} className='ecommerce-card'>
  //         <div className='item-img'>
  //           <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
  //             <img className='img-fluid' src={item.image} alt={item.name} />
  //           </Link>
  //         </div>
  //         <CardBody>
  //           <div className='item-name'>
  //             <h6 className='mb-0'>
  //               <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>{item.name}</Link>
  //             </h6>
  //             <span className='item-company'>
  //               By
  //               <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
  //                 {item.brand}
  //               </a>
  //             </span>
  //             <div className='item-rating'>
  //               <ul className='unstyled-list list-inline'>
  //                 {new Array(5).fill().map((listItem, index) => {
  //                   return (
  //                     <li key={index} className='ratings-list-item me-25'>
  //                       <Star
  //                         className={classnames({
  //                           'filled-star': index + 1 <= item.rating,
  //                           'unfilled-star': index + 1 > item.rating
  //                         })}
  //                       />
  //                     </li>
  //                   )
  //                 })}
  //               </ul>
  //             </div>
  //           </div>
  //           <span className='text-success mb-1'>In Stock</span>
  //           <div className='item-quantity'>
  //             <span className='quantity-title me-50'>Qty</span>
  //             <InputNumber
  //               min={1}
  //               max={10}
  //               upHandler={<Plus />}
  //               className='cart-input'
  //               defaultValue={item.qty}
  //               downHandler={<Minus />}
  //             />
  //           </div>
  //           <div className='delivery-date text-muted'>Delivery by, {formatDate(item.shippingDate)}</div>
  //           <span className='text-success'>
  //             {item.discountPercentage}% off {item.offers} offers Available
  //           </span>
  //         </CardBody>
  //         <div className='item-options text-center'>
  //           <div className='item-wrapper'>
  //             <div className='item-cost'>
  //               <h4 className='item-price'>${item.price}</h4>
  //               {item.hasFreeShipping ? (
  //                 <CardText className='shipping'>
  //                   <Badge color='light-success' pill>
  //                     Free Shipping
  //                   </Badge>
  //                 </CardText>
  //               ) : null}
  //             </div>
  //           </div>
  //           <Button className='mt-1 remove-wishlist' color='light' onClick={() => dispatch(deleteCartItem(item.id))}>
  //             <X size={14} className='me-25' />
  //             <span>Remove</span>
  //           </Button>
  //           <Button
  //             className='btn-cart'
  //             color='primary'
  //             onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
  //           >
  //             <Heart
  //               size={14}
  //               className={classnames('me-25', {
  //                 'fill-current': item.isInWishlist
  //               })}
  //             />
  //             <span className='text-truncate'>Wishlist</span>
  //           </Button>
  //         </div>
  //       </Card>
  //     )
  //   })
  // }

  return (
    <div className='list-view d-flex ' style={{ width: "100%" }}>
      <div className='' style={{ width: "65%" }}>
        <InvoiceList />
      </div>
      <div className='checkout-options mx-4'>
        <Card className='' style={{ width: "35rem" }}>
          <CardBody>
            <label className='section-label mb-1'>Payment Calculator</label>
            <Col md='6' sm='12' lg='12'>
              <div className='mb-2'>
                <Input type='select' name='add-type' id='add-type'>
                  <option value='home'>Choose Customer</option>
                  <option value='work'>Staff</option>
                  <option value='work'>Patients</option>
                  <option value='work'>Walk In</option>

                </Input>
              </div>
            </Col>
            <InputGroup className='input-group-merge coupons'>
              <Input placeholder='Item' />
              <Input placeholder='Quantity' />
              <InputGroupText className='text-primary ms-0'>Price($)</InputGroupText>
            </InputGroup>
            <hr />
            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Total MRP</div>
                  <div className='detail-amt'>Subtotal</div>
                  <div className='detail-amt'>0</div>

                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Bag Discount</div>
                  <div className='detail-amt'>V.A.T</div>
                  <div className='detail-amt discount-amt text-success'>0</div>

                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Estimated Tax</div>
                  <div className='detail-amt'>Total</div>
                  <div className='detail-amt'>0</div>

                </li>
                <li className='price-detail'>
                  <div className='detail-title'>EMI Eligibility</div>
                  <div className='detail-amt'></div>
                  Amt. Paid <Controller
                    control={control}
                    name='checkoutPincode'
                    render={({ field }) => (
                      <Input
                        type='number'
                        id='checkoutPrice'
                        placeholder='201301'
                        style={{ width: "25%" }}
                        invalid={errors.checkoutPincode && true}
                        {...field}
                      />
                    )}
                  />
                  <a href='/' className='detail-amt text-primary' onClick={e => e.preventDefault()}>
                    0
                  </a>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  <div className='detail-amt'>Balance</div>
                  <div className='detail-amt discount-amt text-success'>0</div>
                </li>
              </ul>
              <Col md='6' sm='12' lg='12'>
                <div className='mb-2'>
                  <Input type='select' name='add-type' id='add-type'>
                    <option value='home'>Payment Method</option>
                    <option value='cash'>Cash</option>
                    <option value='card'>Card</option>
                  </Input>
                </div>
              </Col>
              <hr />

              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt fw-bolder'>$574</div>
                </li>
              </ul>
              <ul>
                <li className='price-detail'>
                  <Button
                    block
                    color='primary'
                    disabled={!products.length}
                    onClick={() => stepper.next()}
                    classnames='btn-next place-order'
                  >
                    Process
                  </Button>
                  <Button className='mx-2'
                    block
                    color='primary'
                    disabled={!products.length}
                    onClick={() => stepper.next()}
                    classnames='btn-next place-order'
                  >
                    Reset
                  </Button>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
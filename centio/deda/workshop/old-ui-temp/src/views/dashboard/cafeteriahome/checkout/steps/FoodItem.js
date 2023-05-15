// ** React Imports

// ** Third Party Components

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, InputGroup, Input, InputGroupText, Label, Col } from 'reactstrap'
import InvoiceList from '../list'
import { useForm, Controller } from 'react-hook-form'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'

const FoodItem = props => {
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
            <div className='' style={{ width: "75%" }}>
                <InvoiceList />
            </div>
            <div className='checkout-options mx-4'>
                <Card className='' style={{ width: "25rem" }}>
                    <CardBody>
                        <label className='section-label mb-1'>Add Food Item</label>
                        <Col md='6' sm='12' lg='12'>
                            <div className='mb-2'>
                                <Input type='select' name='add-type' id='add-type'>
                                    <option value='home'>--Select--</option>
                                    <option value='work'>No Options</option>
                                </Input>
                            </div>
                        </Col>
                        <hr />
                        <div className='price-details'>
                            <ul className='list-unstyled'>
                                <li className='price-detail'>
                                    <Controller
                                        control={control}
                                        name='checkoutPincode'
                                        render={({ field }) => (
                                            <Input
                                                type='number'
                                                id='checkoutPrice'
                                                placeholder='Item Price'
                                                invalid={errors.checkoutPincode && true}
                                                {...field}
                                            />
                                        )}
                                    />
                                </li>
                                <li className='price-detail'>
                                    <Controller
                                        control={control}
                                        name='checkoutPincode'
                                        render={({ field }) => (
                                            <Input
                                                type='number'
                                                id='checkoutPrice'
                                                placeholder='Item Quantity'
                                                invalid={errors.checkoutPincode && true}
                                                {...field}
                                            />
                                        )}
                                    />
                                </li>
                            </ul>
                            <hr />
                            <ul>
                                <li className='price-detail'>
                                    <Button 
                                        block
                                        color='primary'
                                        disabled={!products.length}
                                        onClick={() => stepper.next()}
                                        classnames='btn-next place-order'
                                    >
                                        Create
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

export default FoodItem

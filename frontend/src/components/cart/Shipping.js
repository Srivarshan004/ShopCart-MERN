import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlices";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {
    if( 
        !shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.phoneNo||
        !shippingInfo.postalCode||
        !shippingInfo.country||
        !shippingInfo.state
    ){
        toast.error('Please fill the All Shipping information',{position:toast.POSITION.BOTTOM_CENTER});
        navigate('/shipping');
    }

}


function Shipping() {
    const { shippingInfo={} } = useSelector(state => state.cartState);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const submitHandler = () => {
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate('/order/confirm');
    }


    return (
        <Fragment>
            <CheckoutSteps shipping={true} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control my-2"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control my-2"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control my-2"
                                value={phoneNo}
                                onChange={event => setPhoneNo(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control my-2"
                                value={postalCode}
                                onChange={event => setPostalCode(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                className="form-select form-control my-2 py-2"
                                id="country_field"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                required >
                                {countryList.map((country, i) => (
                                    <option key={i} value={country.name} >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control my-2"
                                value={state}
                                onChange={event => setState(event.target.value)}
                                required
                            />
                        </div>

                        <button id="shipping_btn" type="submit" className="btn btn-block py-3 mt-4">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping;
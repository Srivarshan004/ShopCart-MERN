import React from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userAction';

function Header(){
    const { isAuthenticated, user } =   useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState);

    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const logoutHandler = () => {
        dispatch(logout);
    }

    return(
        <nav className="navbar row">

        <div className="col-12 col-md-3 flex-grow-1">
            <div className="navbar-brand">
                <Link to='/'>
                    <img src="../images/ShopCart_logo.png" alt="logo"/>
                </Link>
            </div>
        </div>

        <div className="col-12 col-md-3 flex-grow-1 my-3">
            <Search />
        </div>

        <div className="col-12 col-md-3 flex-grow-1 " id="cart-session">
            {isAuthenticated ? (
                <Dropdown className='d-inline'>
                    <Dropdown.Toggle variant='default text-white pr-5 border-0' id='dropdown-basic'>
                        <figure className='avatar avatar-nav'>
                            <Image width='50px' src={user.avatar??'./images/user-avatar.png'} />
                        </figure>
                        <span className='mx-3'>{user.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {user.role === 'admin' && <Dropdown.Item className='text-dark' onClick={() => {navigate('/admin/dashboard')}}>Dashboard</Dropdown.Item>}
                    <Dropdown.Item className='text-dark' onClick={() => {navigate('/profile')}}>Profile</Dropdown.Item>
                    <Dropdown.Item className='text-dark' onClick={() => {navigate('/orders')}}>Orders</Dropdown.Item>
                    <Dropdown.Item className='text-danger' onClick={logoutHandler}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : 
            <Link to="/login"  className="btn" id="login_btn">Login</Link> }
            <div className="cart_option m-2">
                <Link to='/cart'>
                <i className="bi bi-cart3"></i>
                {cartItems.length > 0  ?
                    <span id="cart_count">{cartItems.length}</span> : null }
                </Link>
            </div>
        </div>
    </nav>
    )
}


export default Header;
import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import login, { clearAuthError } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const redirect = location.search?'/'+location.search.split('=')[1] : '/';

    const submitHandler = (event) => {
        event.preventDefault(); 
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate(redirect);
        }
        if(error){
            toast(error, {
                position : toast.POSITION.BOTTOM_CENTER,
                type : 'error',
                onOpen : () => {
                    dispatch(clearAuthError)
                }
            })
            return
        }
    },[isAuthenticated, error, dispatch, navigate])

    return (
        <Fragment>
            <MetaData title={`Login`}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field" className="mb-2">Email</label>
                            <input 
                               type="email" 
                               id="email_field" 
                               className="form-control mb-3" 
                               value={email} 
                               onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field" className="mb-2">Password</label>
                            <input 
                               type="password"
                               id="password_field"
                               className="form-control" 
                               value={password} 
                               onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <Link to='/password/forgot' className="mb-4" id="forgot_password">Forgot Password?</Link>

                        <button 
                            id="login_button" 
                            type="submit" 
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to='/register' className="mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>

    )
}

export default Login;
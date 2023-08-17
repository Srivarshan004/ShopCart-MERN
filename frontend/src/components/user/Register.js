import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register(){

  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : ''
  });

  const [avatar, setAvatar] = useState();
  const [avatarPriview, setAvatarPriview] = useState('/images/user-avatar.png');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.authState);

  const onChange = (event) => {
    if(event.target.name === 'avatar'){
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setAvatarPriview(reader.result);
          setAvatar(event.target.files[0]);
        }
      } 
      reader.readAsDataURL(event.target.files[0])
    } else {
      setUserData({...userData, [event.target.name] : event.target.value});
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('avatar', avatar);
    dispatch(register(formData));
  }
  
  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
      return
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
  },[error, isAuthenticated, dispatch, navigate])
    return(
        <div className="row wrapper" id="register-box">
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" enctype="multipart/form-data">
              <h1 className="mb-3">Register</h1>
  
              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  name='name'
                  onChange={onChange}
                  id="name_field"
                  className="form-control my-2"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  name='email'
                  onChange={onChange}
                  id="email_field"
                  className="form-control my-2"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  name='password'
                  onChange={onChange}
                  id="password_field"
                  className="form-control my-2"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar item-rtl">
                      <img
                        src={avatarPriview}
                        className="rounded-circle"
                        alt="Avatar"
                      />
                    </figure>
                  </div>
                  <div className="input-group my-4">
                    <input 
                    type="file" 
                    name='avatar'
                    onChange={onChange}
                    className="form-control w-100" 
                    id="inputGroupFile02" />
                  </div>
                </div>
              </div>
  
              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
    )
}

export default Register;
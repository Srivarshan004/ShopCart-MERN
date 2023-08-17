import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlices";


function UpdateProfile() {

    const { user, isUpdated, error } = useSelector(state => state.authState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPriview, setAvatarPriview] = useState('/images/user-avatar.png');
    const dispatch = useDispatch();

    const onChangeAvatar = (event) => {
        const reader = new FileReader(); 
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPriview(reader.result);
                setAvatar(event.target.files[0]);
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            if(user.avatar){
                setAvatarPriview(user.avatar);
            }
        }

        if(isUpdated){
            toast('Profile updated successfully',{
                type:"success",
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
            return;
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
    }, [user, isUpdated, error, dispatch])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} enctype="multipart/form-data">
                    <h1 className="mt-2 mb-5">Update Profile</h1>

                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
                        <input
                            type="name"
                            id="name_field"
                            className="form-control my-3"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control my-3"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className="d-flex align-items-center mt-2">
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
                                    className="form-control w-100"
                                    id="inputGroupFile02"
                                    onChange={onChangeAvatar}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )

}

export default UpdateProfile;
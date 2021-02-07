import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { userActions } from '../../_redux/_actions';

//css
import './profile.css';

const Profile = ({ selectedUser }) => {

    let { id } = useParams();
    const user = useSelector((state) => state.users && state.users.user && state.users.user.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getOne(id))
    }, [])

    return (
        <div>
            {user ?
                (
                    <div className="profile-card">
                        <div className="shape">
                            <div>
                                <img src={user && user.avatar} className="image" alt="profile" />
                            </div>
                        </div>
                        <h3>{user && user.first_name} {user && user.last_name}</h3>
                        <h5 className="title">{user && user.email}</h5>
                        <br></br>
                        <p>Web Designer</p>
                    </div>) :
                <div><img src="/images/Ellipsis-1s-200px.svg" alt="Loading...." className="loader mt-5" /></div>
            }
        </div>
    )
}

export default Profile;
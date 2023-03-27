import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userActions } from '../../_redux/_actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Pagination from '../Table/Pagination';
import Table from '../Table/Table';

const Dashboard = () => {

    const showToastMessage = () => {
        const { waName = "" } = JSON.parse(localStorage.getItem('waInfo') || {});
        toast.success(`Welcome, ${waName}! You are successfully logged in using OTPless!`, {
            position: toast.POSITION.BOTTOM_LEFT
        });
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const columns = ["ID", "Email", "First Name", "Last Name", "Avatar"];

    const data = useSelector((state) => state.users && state.users.items && state.users.items.data);
    const totalPages = useSelector((state) => state.users && state.users.items && state.users.items.total_pages);

    const [page, setPage] = useState(1);

    useEffect(() => {
        showToastMessage();
    }, [])

    useEffect(() => {

        dispatch(userActions.getAll(page));

    }, [page])

    return (
        <div className="container mt-3">

            {data ? (
                <div>
                    <div className="shadow-lg p-3 mb-3 bg-white rounded">
                        {data && data.length && <Table
                            columns={columns}
                            data={data}
                        />}
                    </div>

                    <div className="float-right">
                        {totalPages && <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageClick={setPage}
                        />
                        }
                    </div>

                    <div>
                        <button onClick={() => {
                            dispatch(userActions.logout());
                            history.push('/login')
                        }}
                            className="btn btn-primary float-left"
                            style={{ background: "rgb(119, 120, 122)" }} >
                            Logout
                        </button>
                    </div>
                </div>)
                :
                <div><img src="/images/Ellipsis-1s-200px.svg" alt="Loading...." className="loader mt-5" /></div>
            }

        </div>
    );
}

export default Dashboard;
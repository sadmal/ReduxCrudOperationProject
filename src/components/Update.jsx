import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dataUpdate } from "../features/userDetailSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const notify = () => toast.success("user updated!!");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.app);
    const [updateUser, setUpdateUser] = useState();

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id);
            setUpdateUser(singleUser[0]);
        }
    }, []);

    const newData = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(dataUpdate(updateUser));
        notify()
        setUpdateUser("")
    };

    return (
        <div>
            <h2 className="my-2" style={{ textAlign: "center" }}>Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={updateUser && updateUser.name}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={updateUser && updateUser.email}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control"
                        value={updateUser && updateUser.age}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        checked={updateUser && updateUser.gender === "Male"}
                        onChange={newData}
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        checked={updateUser && updateUser.gender === "Female"}
                        onChange={newData}
                    />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Update;

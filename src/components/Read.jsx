import React, { useEffect, useState } from 'react'
import { showUser } from '../features/userDetailSlice'
import { connect, useDispatch, useSelector } from 'react-redux'
import CustomModal from './CustomModal'
import { Link } from "react-router-dom"
import { deleteUser } from '../features/userDetailSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { bindActionCreators } from '@reduxjs/toolkit'

const Read = ({ users, searchData, loading, deleteUser }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [id, setId] = useState()
    const [radioData, setRadioData] = useState("")
    // const {users , searchData , loading} = useSelector((state) => state.app)

    // useEffect(() => {
    //     dispatch(showUser())
    // }, [])


    if (loading) {
        return <h3 style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</h3>
    }


    return (
        <div style={{ width: "100%", backgroundColor: "rgb(180, 180, 180)" }}>
            <div >
                <input className='form-check-input' type="radio" id="all" checked={radioData === ""} onChange={(e) => setRadioData("")} value="All" />
                <label className='form-check-label' htmlFor="all">All</label>
                <input className='form-check-input' type="radio" id="male" checked={radioData === "Male"} onChange={(e) => setRadioData(e.target.value)} name="gender" value="Male" />
                <label className='form-check-label' htmlFor="male">Male</label>
                <input className='form-check-input' type="radio" id="female" checked={radioData === "Female"} onChange={(e) => setRadioData(e.target.value)} name="gender" value="Female" />
                <label className='form-check-label' htmlFor="female">Female</label>
            </div>

            {showPopup && (<CustomModal
                id={id}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
            />
            )}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>All Data</h2>

                {users && users
                    .filter((ele) => {
                        if (searchData.length === 0) {
                            return ele
                        }
                        else {
                            return ele.name.toLowerCase().includes(searchData.toLowerCase())
                        }
                    }).filter((ele) => {
                        if (radioData === "") {
                            return ele
                        }
                        else {
                            return ele.gender === radioData
                        }
                    })
                    .map((ele) => (
                        <div key={ele.id} className="card my-2" style={{ width: "30rem", textAlign: "center" }}>

                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                                <p className='card-text'>{ele.gender}</p>
                                <button onClick={() => [setId(ele.id), setShowPopup(true)]} className="btn btn-primary mx-2">View</button>
                                <Link to={`/edit/${ele.id}`} className="btn btn-primary mx-2">Edit</Link>
                                <Link onClick={() => deleteUser(ele.id)} className="btn btn-primary mx-2">Delete</Link>
                            </div>
                        </div>
                    )
                    )}
            </div>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.app.users,
        searchData: state.app.searchData,
        loading: state.app.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (UserId) => dispatch(deleteUser(UserId)),
        dispatch: dispatch(showUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Read)

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { searchUser } from '../features/userDetailSlice';

const Navbar = () => {
  const allUsers = useSelector((state) => state.app.users)
  const [serachUser , setSearchUser] = useState("")
  const dispatch = useDispatch()
  
  useEffect(()=>{
   dispatch(searchUser(serachUser))
  },[serachUser])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <h4 className="nav-link mx-2">CRUD REDUX</h4>
            <li className="nav-item">
              <Link to="/" className='nav-link'>Create Post</Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className='nav-link'>All Post ({allUsers.length})</Link>
            </li>
            <li>
            <input onChange={(e)=> setSearchUser(e.target.value)}  className='nav-link mx-2' type="search" placeholder="Search.."/>

            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
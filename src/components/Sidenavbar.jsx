import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PrivatePage from '../private/components/PrivatePage';

export const Sidenavbar = () => {
    const [show, setShow] = useState(false);
  
  return (
    <div className="container-fluid">
      <div className="row">
        <PrivatePage></PrivatePage>
        <div className="col-auto col-sm-2 bg-primary d-flex flex-column justify-content-between min-vh-100">
            <div>
            <a href="" className='text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline'>
              <span className='fs-4'>Side Menu</span>
            </a>
            <hr  className='text-white d-none d-sm-block'/>
            <ul
              class="nav nav-pills flex-column"
            >
              <li class="nav-item text-white">
                <a href="#" class="nav-link active" aria-current="page"
                  >Active</a
                >
              </li>
              <li class="nav-item text-white">
                <a href="#" class="nav-link">Link</a>
              </li>
              <li class="nav-item text-white" data-bs-toogle ="collapse">
                <a href="#" class="nav-link">Disabled</a>
                
              </li>

            </ul>
            
            </div>
            <div className="dropdown open">
              <a
                className="btn btn-secondary dropdown-toggle text-white"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Yousaf</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="triggerId">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item disabled" href="#">Disabled action</a>
              </div>
            </div>
            
        </div>

      </div>
      
    </div>
  )
}

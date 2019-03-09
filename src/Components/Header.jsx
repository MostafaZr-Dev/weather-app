import React from 'react';

const Header = (props) => {
    return ( 
        <div className="col-12 text-center mt-5">
            <h1 className="header-text">
                {props.children}
            </h1>
        </div> 
     );
}
 
export default Header;
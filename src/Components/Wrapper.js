import React from 'react';

const Wrapper = (props) => {
    return ( 
        <div className="col-12 text-center mt-3 p-5 wrapper-weather animated zoomIn">
            {props.children}
        </div> 
    );
}
 
export default Wrapper;
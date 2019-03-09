import React from 'react';

const ErrorMessage = (props) => {
    return ( 
        <div className = {props.class}>
            {props.children}
        </div>
     );
}
 
export default ErrorMessage;
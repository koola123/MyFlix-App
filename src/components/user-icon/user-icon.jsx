import React from "react";
import { FaUserCircle } from "react-icons/fa";


class UserIcon extends React.Component {
    render() {
        return (
            <span>{' '}
               <FaUserCircle 
               color="#c8b054"
               style={{marginBottom:"3px"}}
                />
            </span>
        );
    }
}

export default UserIcon;
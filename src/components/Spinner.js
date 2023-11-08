import React from "react";
import loading from '../Spinner.gif';

export class Spinner extends React.Component{
render(){
    return(
        <div className="text-center">
            <img src={loading} alt="loading..." />
        </div>
    );
}
}
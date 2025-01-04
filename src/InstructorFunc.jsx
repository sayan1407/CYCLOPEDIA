import React, { useEffect } from "react";
const InstructorFunc = () => {
   useEffect(() => {
    return () => {
      console.log("Instructor - unmounted")
    }
   })
  
    return (
      <div className="p-3">
        
         
            <div>

            Name: {this.props.instructor.name} <br />
            Email : {this.props.instructor.email}
            <br />
            Phone : {this.props.instructor.phone}
            <br />
            </div>

        
        
      </div>
    );
  
}

export default InstructorFunc;

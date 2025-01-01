import React from "react";
class Instructor extends React.Component {
    componentDidMount(){
        console.log("Instructor - Mount")
    }
    componentDidUpdate()
    {
        console.log("Instructor - Update")
    }
    componentWillUnmount()
    {
        console.log("Instructor - Unmount")
    }
  render() {
    console.log("Instructor - Render")
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
}

export default Instructor;

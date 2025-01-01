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
        <span className="h4 text-success">Instructor</span>
        <i className={`bi ${this.props.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  btn btn-success btn-sm`} onClick={() => this.props.handleHideInstructorClick()}></i>
       
        <br />
        {!this.props.hideInstructor && (
            <div>

            Name: {this.props.instructor.name} <br />
            Email : {this.props.instructor.email}
            <br />
            Phone : {this.props.instructor.phone}
            <br />
            </div>

        )}
        
      </div>
    );
  }
}

export default Instructor;

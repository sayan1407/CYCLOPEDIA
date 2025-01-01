import React from "react";
import { getRandomUser } from "./Utility/api";

class CyclopediaClassPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          instructor: undefined,
          studentList: [],
          studentCount: 0,
          hideInstructor: false,
        };
      }
      componentDidMount = async () => {
        console.log("Component Did Mount");
        const response = await getRandomUser();
        console.log(response);
        this.setState((prevState) => {
          return {
            instructor: {
              name: response.data.first_name + " " + response.data.last_name,
              email: response.data.email,
              phone: response.data.phone_number,
            },
          };
        });
      };
      componentDidUpdate() {
        console.log("Component Did Update");
      }
      componentWillUnmount() {
        console.log("Component Will UnMount");
      }
      handleAddStudent = () => {
        this.setState((previousState) => {
            return{
                studentCount : previousState.studentCount + 1
            }
        })
      }
      handleRemoveAllStudent = () => {
        this.setState((previousState) => {
            return{
                studentCount : 0
            }
        })
      }
      render() {
        console.log("Render Component");
        return (
          <div>
            {this.state.instructor && (
              <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                <i className=" bi bi-toggle-off btn btn-success btn-sm"></i>
                <br />
                Name: {this.state.instructor.name} <br />
                Email : {this.state.instructor.email}
                <br />
                Phone : {this.state.instructor.phone}
                <br />
              </div>
              
            )}
            <div className="p-3">
                <span className="h4 text-success">Student Count : {this.state.studentCount}</span> <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Student</button>
            </div>
          </div>
        );
      }
}

export default CyclopediaClassPage;
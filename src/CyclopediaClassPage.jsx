import React from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Instructor";

class CyclopediaClassPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
          instructor: undefined,
          studentList: [],
          studentCount: 0,
          hideInstructor: false,
          inputName : "",
          inputFeedback : ""
        };
      }
      componentDidMount = async () => {
        console.log("Component Did Mount");
        const response = await getRandomUser();
        console.log(response);
        if(JSON.parse(localStorage.getItem("cyclopediaState")))
        {

        }
        else{
            this.setState((prevState) => {
                return {
                  instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                  },
                };
              });

        }
        
      };
      componentDidUpdate = async (previousProps,previousState)  => {
        console.log("Component Did Update");
        localStorage.setItem("cyclopediaState",JSON.stringify(this.state))
        if(previousState.studentCount < this.state.studentCount){
            const newStudent = await getRandomUser();
            console.log(newStudent.data.first_name);
            this.setState((prevState) => {
                 return {
                    studentList : [...prevState.studentList,{
                        name : newStudent.data.first_name + " " + newStudent.data.last_name
                    }]
                 }
            })
        }
        else if(previousState.studentCount > this.state.studentCount){
            this.setState({studentList : []})
        }
        
        console.log(this.state.studentList);
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
      handleHideInstructorClick = () =>{
        this.setState((previousState) => {
            return{
                hideInstructor : !previousState.hideInstructor
            }
        })
      }
      render() {
        console.log("Render Component");
        console.log(this.state.hideInstructor)
        return (
          <div>
            <span className="h4 text-success">Instructor</span>
            <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  btn btn-success btn-sm`} onClick={this.handleHideInstructorClick}></i>
       
            <br />
            {!this.state.hideInstructor && this.state.instructor && (
              <Instructor instructor = {this.state.instructor} hideInstructor = {this.state.hideInstructor}/>
              
            )}
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br/>
                <input type="text" placeholder="Name..." 
                onChange={(e) => this.setState({inputName : e.target.value})} />
                Value : {this.state.inputName}
                <br/>
                <textarea placeholder="Feedback..." 
                onChange={(e) => this.setState({inputFeedback : e.target.value})}
                ></textarea>
                Value : {this.state.inputFeedback}
            </div>
            <div className="p-3">
                <span className="h4 text-success">Student Count : {this.state.studentCount}</span> <br/>
                <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Student</button>
                {this.state.studentCount > 0 && this.state.studentList.map((student,index) => {
                    return(
                        <div className="text-white" key={index}>- {student.name}</div>
                    )
                })}
            </div>
          </div>
        );
      }
}

export default CyclopediaClassPage;
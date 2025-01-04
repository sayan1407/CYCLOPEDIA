import React, { useEffect, useId, useRef, useState } from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Instructor";

const CyclopediaFuncPage = () => {
   const[state,setState] = useState(() => {
     return {
          instructor: undefined,
          studentList: [],
          studentCount: 0,
          hideInstructor: false
     }
   })
   const[inputName,setInputName] = useState(() => {
      return ""
   })
   const[inputFeedback,setInputFeedback] = useState(() => {
    return ""
 })
   const totalRender = useRef(0)
   const feedbackInputRef = useRef(null)
   const id = useId()
   useEffect(() => {
    console.log("This will invoke for every render")
    totalRender.current = totalRender.current + 1
    console.log(totalRender.current)
   })
  
   useEffect(() => {
    console.log("This will invoke for the first render only");
    const getUser = async () => {
      const response = await getRandomUser();
          console.log(response);
            setState((prevState) => {
                return {
                  ...prevState,
                  instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                  },
                };
              });
    

    }
    if(!state.hideInstructor)
    {
      getUser()

    }
    
   },[state.hideInstructor])

   useEffect(() => {
    console.log("This will be invoked when there is any change in inputfeedback field")
   },[inputFeedback])

   useEffect(() => {
 
    const getUser = async () => {
      const newStudent = await getRandomUser();
      console.log(newStudent.data.first_name);
      setState((prevState) => {
        return {
          ...prevState,
           studentList : [...prevState.studentList,{
               name : newStudent.data.first_name + " " + newStudent.data.last_name
           }]
        }
      })
    }
    
     if(state.studentCount > 0){
      getUser();
     }
     else{
      setState((prevState) => {
        return {
          ...prevState,
          studentList : []
        }
      })
     }
    
             
   },[state.studentCount])
   useEffect(() => {
    feedbackInputRef.current.focus();
    return () => {
      console.log("This will be invoked when component got unmounted")
    }
   },[])
    
     const handleAddStudent = () => {
       setState((previousState) => {
            return{
              ...previousState,
                studentCount : previousState.studentCount + 1
            }
        })
      }
      const handleRemoveAllStudent = () => {
       setState((previousState) => {
            return{
                ...previousState,
                studentCount : 0
            }
        })
      }
      const handleHideInstructorClick = () =>{
        setState((previousState) => {
            return{
                ...previousState,
                hideInstructor : !previousState.hideInstructor
            }
        })
      }
     
        return (
          <div>
            <span className="h4 text-success">Instructor</span>
            <i className={`bi ${state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"}  btn btn-success btn-sm`} onClick={handleHideInstructorClick}></i>
       
            <br />
            {!state.hideInstructor && state.instructor && (
              <Instructor instructor = {state.instructor} hideInstructor = {state.hideInstructor}/>
              
            )}
            <div className="p-3">
                <span className="h4 text-success">Total Render : {totalRender.current}</span> <br/>
                <span className="h4 text-success">Feedback</span>
                <br/>
                <input type="text" placeholder="Name..." id={`${id}-inputname`}
                onChange={(e) => setInputName(() => {return e.target.value})} />
                <label htmlFor={`${id}-inputname`}>Name : </label> {inputName}               
                <br/>
                <textarea placeholder="Feedback..."  id={`${id}-inputfeedback`}
                onChange={(e) => setInputFeedback(() => {return e.target.value})}
                ref={feedbackInputRef}
                ></textarea>
                <label htmlFor={`${id}-inputfeedback`}>Feedback : </label> {inputFeedback}
            </div>
            <div className="p-3">
                <span className="h4 text-success">Student Count : {state.studentCount}</span> <br/>
                <button className="btn btn-success btn-sm" onClick={handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={handleRemoveAllStudent}>Remove All Student</button>
                {state.studentCount > 0 && state.studentList.map((student,index) => {
                    return(
                        <div className="text-white" key={index}>- {student.name}</div>
                    )
                })}
            </div>
          </div>
        );
      }


export default CyclopediaFuncPage;
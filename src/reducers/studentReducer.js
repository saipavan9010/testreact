const studentReducer = (state = [],action) => {
    console.log(action.payload);
    switch(action.type){
        
    
    case 'ADD_STUDENT':
    var stateCopy = [...state,action.payload];
    localStorage.setItem('students',JSON.stringify(stateCopy));
    return stateCopy
    
    case 'DELETE_STUDENT':
    var  stateCopy = state.filter( x => x.id !== action.payload);
    localStorage.setItem('students',JSON.stringify(stateCopy));
    return stateCopy
        
    case 'UPDATE_STUDENT':
    
    var stateCopy = state.map((student) => {
        const {id,name,grade,school} = action.payload;
        if(student.id === id)
        {
        student.name = name;
        student.grade = grade;
        student.school = school;
        }
        return student;
    })
    localStorage.setItem('students',JSON.stringify(stateCopy));
    return stateCopy

    case 'LIST_STUDENT':
            var stateCopy =action.payload;
    localStorage.setItem('students',JSON.stringify(stateCopy));
    console.log("pavan");
         return stateCopy;



    
    default:
        return state;
    }
    
    }
    export default studentReducer;
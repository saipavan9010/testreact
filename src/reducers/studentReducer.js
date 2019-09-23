const studentReducer = (state = [],action) => {
   
    switch(action.type){
        
    
    case 'ADD_STUDENT':
    var stateCopy = [...state,action.payload];
    
    return stateCopy
    
    case 'DELETE_STUDENT':
    var  stateCopy = state.filter( x => x.id !== action.payload);
    
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
   
    return stateCopy

    case 'LIST_STUDENT':
            var stateCopy =action.payload;
   
         return stateCopy; 
    default:
        return state;
    }
    
    }
    export default studentReducer;
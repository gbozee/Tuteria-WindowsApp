import {createStore, combineReducers} from 'redux'

const defaultState = [
    {
        id:1,label: "Subjects", icon: "url('/images/app/fonts/1-black.png')",
        currentStep:true,completed:false, questions:[]
    },
    {
        id:2,label: "Lesson Details", icon: "url(/images/app/fonts/2-black.png)",
        currentStep:false,completed:false, questions:[
            {category:1, value:[], weekdays:["Monday", "Tuesday", "Wednesday", 'Thursday',
        "Friday", "Saturday", "Sunday"]},
            {category:2, type:"text",label:"How soon should lessons start?", value:"", name:"start_of_lesson"},
            {category:2, type:"number",label:"Number of Students", value:"", name:"no_of_students"},
            {category:2, type:"select",label:"Preferred Gender of Tutor", value:"", name:"gender", options:[
                {value:"", text:"Any gender is fine"},
                {value:"M", text:"I prefer a Male"},
                {value:"F", text:"I prefer a Female"},
            ]},
            {category:3, type:"select",label:"For how long?", value:"", 
                extra:"If unsure, why not start with 1 month?",
                name:"days_per_week", options:[
                    {value:"", text:"Select Duration"},
                    {value:"1", text:"1 week"},
                    {value:"2", text:"2 weeks"},
                    {value:"3", text:"3 weeks"},
                    {value:"4", text:"1 month"},
                ]
            },
            {category:3, value:"", type:"text", extra:"E.g. 4:00pm or 5:30pm",
                name:"time_of_lesson", label:"What time should lessons start?"},
            {category:3, type:"select",label:"Hours per day?", 
                value:"", 
                extra:"If unsure, it's fine to start with 2 hours",
                name:"hours_per_day", options:[
                    {value:"", text:"Select"},
                    {value:"1", text:"1 hour"},
                    {value:"2", text:"2 hours"},
                    {value:"3", text:"3 hours"},
                    {value:"4", text:"4 hours"},
                    {value:"5", text:"5 hours"},
                ]
            },
        ]
    },
    {
        id:3,label: "Your Goal and Budget", icon: "url('/images/app/fonts/3-black.png')",
        currentStep:false,completed:false, questions:[
            {type:"textarea", name:"expectation", value:""},
            {type: "number", name:"budget", value:""}
        ]
    },
    {
        id:4,label: "Personal Details", icon: "url('/images/app/fonts/4-black.png')",
        currentStep:false,completed:false, questions:[
            {type:"text",label:"First Name", value:"", name:"first_name"},
            {type:"text",label:"Last Name",value:"",name:"last_name"},
            {type:"text",label:"Email",value:"",name:"email"},
            {type:"tel",label:"Telephone mumber",value:"",name:"number"},
            {type:"text",label:"Home Address",value:"",name:"home_address"},
            {type:"text",label:"Vicinity",value:"",name:"vicinity"},
            {type:"select",label:"State",value:"",name:"state", options:[
                "Abia", "Abuja", "Adamawa", "Akwa Ibom", "Anambra", "Bayelsa", "Bauchi", "Benue",
                "Borno", "Cross River", "Delta", "Edo", "Ebonyi", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna",
                "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nassawara", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
                "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]},
            {type:"select",label:"How did you learn about us?",value:"",name:"where_you_heard",options: [
                "Tv", "Radio", "Facebook", "Linkedin", "Twitter",
                "Search Engine (Google/Yahoo/Bing)",
                "Friend/Family/Word of Mouth", "SMS Notification",
                "LindaIkeji Blog", "Nairaland", "BellaNaija", "Instagram", 
                "Others", "Phone Call"
            ] },
        ]
    }
]
const question = (state, action) =>{
    if(action.type == "UPDATE_ANSWERS" && action.question == state.label){
        return Object.assign({},state,{value:action.value})
    }
    if(action.type == "UPDATE_QUESTION_3" && action.name == state.name){
        return Object.assign({},state,{value:action.value})
    }
    if(action.type == "UPDATE_WEEKDAY_CHECKBOX"){
        let index = state.value.indexOf(action.value);
        var new_state;
        if(index > -1){
            new_state =  [
                ...state.value.slice(0, index),
                ...state.value.slice(index + 1)
            ]
        }else{
            new_state = [...state.value, action.value]
        }
        return Object.assign({},state,{value:new_state})
    }
    return state
}
const currentSection = (state, action) => {
    switch(action.type){
        case "CHANGE_SECTION":
            let is_current_step = action.id == state.id;
            return Object.assign({},state,{currentStep:is_current_step})
        case "UPDATE_ANSWERS":
        case "UPDATE_WEEKDAY_CHECKBOX":
        case "UPDATE_QUESTION_3":
            if(state.id == action.id){                
                return Object.assign({},
                    state,
                    {questions:state.questions.map(q => question(q, action))})
            }
        default:
            return state
    }
}
const appState = (state=defaultState, action) => {
    if(action.type == 'RESET_STATE'){
        return defaultState;
    }    
    return state.map(x=>currentSection(x,action))
}
const rootReducer = combineReducers({
    appState,
})
const configureStore = (initialState)=>{
    return createStore(rootReducer, initialState 
    // compose(
    //     applyMiddleware(thunk,sagaMiddleware),
    //     window.devToolsExtension ? window.devToolsExtension() : f => f
    // )
    );
}
export default configureStore 

export const loadState = ()=>{
    try{
        const serializedState = localStorage.getItem('tuteria-state');
        if(serializedState == null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined
    }
}

export const saveState = (state)=>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tuteria-state', serializedState);
    }catch(err){

    }
}

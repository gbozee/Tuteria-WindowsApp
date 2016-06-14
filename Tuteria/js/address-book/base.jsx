import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactWinJS from 'react-winjs';
import {hashHistory, Router, Route} from 'react-router'
import Accordion, {CheckBox} from './src/Accordion';
import {Provider, connect} from 'react-redux';
import configureStore, {loadState, saveState} from './reducers'
import throttle from 'lodash.throttle';

var splitViewId = "mainSplitView";
var splitViewConfigs = {
    small: {
        closedDisplayMode: "none",
        openedDisplayMode: "overlay"
    },
    medium: {
        closedDisplayMode: "inline",
        openedDisplayMode: "overlay"
    },
    large: {
        closedDisplayMode: "inline",
        openedDisplayMode: "inline"
    }
};
function getMode() {
    return (
        window.innerWidth >= 1366 ? "large" :
            window.innerWidth >= 800 ? "medium" :
                "small"
    );
}
const persistedState = loadState() 
let store = configureStore(persistedState);
store.subscribe(throttle(()=>{
    console.log(store.getState());
    saveState({appState:store.getState().appState})
}))

const FirstComponent = (props) => {
    let categories = [
        {
            name: 'KG $ Nursery',
            subjects: ["Elementary Math", "Elementary English", "Literacy & Numeracy", "Phonics & Orals", "All Nursery Subjects"],
            levels: ["Pre-Nursery", "Nursery 1", "Nursery 2"]
        },
        {
            name: 'Primary',
            subjects: ["Basic Mathematics", "English Language", "Basic Sciences", "Verbal Reasoning", "Quant. Reasoning", "Computer Education"],
            levels: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"]
        },
        { 
            name: 'JSS', 
            subjects: ["Mathematics", "English Language", "Basic Sciences", "Business Studies", "Computer Science", "Basic Technology", "Agricultural Science"],
            levels: ["JSS 1", "JSS 2",  "JSS 3"] 
        },
        { 
            name: 'SSS', 
            subjects: ["Mathematics",  "English Language",  "Physics",  "Further Mathematics",  "Chemistry",  "Literature in English",  "Economics",  "Commerce",  "Accounting",  "Government",  "Computer Science",  "Technical Drawing",  "Biology",  "Agricultural Science",  "Geography"], 
            levels: ["SSS 1", "SSS 2", "SSS 3"] 
        },
        { 
            name: 'Languages',
            subjects: ["Kalabari", "Annang", "Ibibio", "Hausa", "Igbo", "Yoruba", "German", "Arabic", "Spanish", "French"], 
            levels: [ "Beginner", "Intermediate", "Advanced"] 
        },
        { 
            name: 'Music', 
            subjects: [ "Piano",  "Drums",  "Guitar",  "Saxophone"], 
            levels: [ "Beginner", "Intermediate", "Advanced"]
        },
        { 
            name: 'Standard & Professional Examinations', 
            subjects: ["ICAN", "ACCA", "GRE", "IELTS","GMAT", "SAT Math", "TOEFL", "CFA", "SAT Writing", "SAT Reading"], 
            levels: [] 
        }
    ]
    return (
        <div>
            <Accordion title={`Select your subjects and level where appropriate!`}
                categories={categories} />
            <div className="row-space-10">
                <p>
                    if the subject you want to learn isn't listed here,
                    visit <a href="https://www.tuteria.com" target="_blank">https://www.tuteria.com</a> to find and place a request accordingly
                </p>
            </div>
            
            <div className="buttons">
                <button type="submit" className="horizontalButtonLayout win-button">
                    Submit</button>
            </div>
        </div>
    )
}
const SecondComponent = (props) => {
    let category_1 = props.questions.filter(x=> x.category == 1)[0]
    return (
        <div>
            <div id="scenarioItem">
                <h2 className="win-h2" style={{ marginLeft: "10px" }}>{props.content}</h2>
                <p style={{marginBottom: "2px"}}>Please select the days you want lessons to hold</p>
                <em>For example, if you want lessons 3 times a week, then check 3 days</em>
            </div>
            <div id="scenarioControl">
                <div className="row-space-10">
                {category_1.weekdays.map((weekday,index)=>
                    <CheckBox key={index} 
                        isChecked={category_1.value.indexOf(weekday) > -1 ? true : null} 
                        value={weekday} onSubjectSelected={(e)=>{
                            store.dispatch({type:"UPDATE_WEEKDAY_CHECKBOX", 
                                id:props.id, value:e.target.value})
                        }} 
                    />)}
                </div>
                <div className="col-group">
                    <div className="col-12">
                        <div className="col-group">
                            <div className="col-6">
                                <div class ="start_of_lesson" >
                                    <label>How soon should lessons start?<br />
                                        <input type="text" className="win-textbox" name="start_of_lesson" />
                                    </label>
                                </div>
                                <div class ="students" >
                                    <label>Number of Students<br />
                                        <input type="number" className="win-textbox" name="start_of_lesson" />
                                    </label>
                                </div>   
                                <div className="gender">
                                    <label >Preferred Gender of Tutor <br/>
                                        <select name="gender" className="win-dropdown" onChange={()=>{}}>
                                            <option value="">Any gender is fine</option>
                                            <option value="M">I prefer a Male</option>
                                            <option value="F">I prefer a Female</option>
                                        </select>
                                    </label>
                                </div>                                                         
                            </div>
                            <div className="col-6">
                                <div class ="start_of_lesson" >
                                    <label>For how long?<br />
                                        <small style={{display: "inline-block"}}> <em>If unsure, why not start with 1 month?</em> </small>
                                        <select className="win-dropdown" style={{display: "block"}} name="no_of_weeks" onChange={()=>{}}>
                                            <option value="">Select Duration</option>
                                        </select>
                                    </label>
                                </div>
                                <div class ="students" >
                                    <label>What time should lessons start?<br />
                                        <small style={{display: "inline-block"}}>
                                            <em>E.g. 4:00pm or 5:30pm</em>
                                        </small>
                                        <input type="number" style={{display: "block"}} className="win-textbox" name="start_of_lesson" />
                                    </label>
                                </div>
                                <div class ="students" >
                                    <label>Hours per day?<br />
                                        <small >
                                            <em>If unsure, it's fine to start with 2 hours</em>
                                        </small>
                                        <select style={{display: "block"}} className="win-dropdown" name="no_of_hours" onChange={()=>{}}>
                                            <option value="">Select</option>
                                        </select>
                                    </label>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>                
                <div className="buttons">
                    <button type="submit" className="horizontalButtonLayout win-button">
                        Proceed to Next Step</button>
                </div>
            </div>
        </div>

    )
}
const ThirdComponent = (props) => {
    const budget = `₦${props.budget || 2000}`
    const textarea = props.questions.filter(x=> x.type == "textarea")[0]
    const budget_field = props.questions.filter(x=> x.type=="number")[0]
    return (
        <div>
            <div id="scenarioItem">
                <h2 className="win-h2" style={{ marginLeft: "10px" }}>{props.content}</h2>
                <p style={{marginBottom: "2px"}}>Tell us your specific goal for this lesson, and if you have personal preference for the type of teacher you want, please mention it here as well. Be as detailed as possible.</p>
                <em>E.g. "I want to prepare my son for SAT exams, he needs help with the Math section" or "I want to learn how to play the piano as a beginner" or "I need help with assignments for my kids especially in English"</em>
            </div>
            <div id="scenarioControl">
                <div className="start_of_lesson row-space-10" >
                    <label>
                        <textarea onChange={(e)=>{
                            store.dispatch({type:'UPDATE_QUESTION_3', 
                                id:props.id, name: textarea.name, value:e.target.value})
                        }} className="win-textarea" name="expectation" defaultValue={textarea.value} />
                    </label>
                </div> 
                <div className="col-group">
                    <div className="col-12">
                        <div className="col-group">
                            <div className="col-6">
                                <div className="name">
                                    <label>What's your budget for this lesson?
                                        <small style={{display: "block"}}><em>Hint: set a high budget to get more experienced teachers.</em></small>
                                        <br />
                                        <input onChange={(e)=>{
                                            store.dispatch({type: 'UPDATE_QUESTION_3',
                                                id:props.id, name:budget_field.name, value:e.target.value})
                                        }} style={{display: "block"}} type="number" 
                                            name="budget" className="win-textbox" defaultValue={budget_field.value} />
                                    </label>
                                </div>
                            </div>
                            <div className="col-3">
                                <small>Actual lesson cost may be lower or higher</small>
                                <div className="win-h1">{budget}</div>
                            </div>
                        </div>
                    </div>
                </div>                
                <div className="buttons">
                    <button onClick={()=>{

                    }} type="submit" className="horizontalButtonLayout win-button">
                        Proceed to Next Step</button>
                </div> 
            </div>
        </div>
    )
}
const FourthComponent = (props) => {
    return (
        <div>
            <div id="scenarioItem">
                <h2 className="win-h2">{props.content}</h2>
                <p style={{marginBottom: "2px"}}>Populate your personal details</p>                
            </div>
            <div id="scenarioControl">
                <form id="form1">
                    <div className="twoColumnFormContainer">
                        {props.questions.map((question, index)=>
                            <div className={question.name} key={index}>
                                <label>{question.label} 
                                <br />
                                {question.type == 'text' || question.type == 'tel' ? <input type={question.type} name={question.name} className="win-textbox" defaultValue={question.value} onChange={(e)=>{
                                    let value = e.target.value;
                                    store.dispatch({type:'UPDATE_ANSWERS',
                                        id:props.id,question:question.label,value})
                                }}/> :
                                <select name={question.name} className="win-dropdown" defaultValue={question.value} onChange={(e)=>{
                                            let value = e.target.value;
                                            store.dispatch({type:'UPDATE_ANSWERS',
                                                id:props.id, question:question.label, value})
                                        }}>
                                    <option value="">Select</option>
                                    {question.options.map((state,j)=>
                                        <option key={j} value={state}>
                                            {state}
                                        </option>)}
                                </select>}
                                </label>
                            </div>)}                        
                    </div>
                </form>
                <div className="buttons">
                    <button type="submit" className="horizontalButtonLayout win-button">
                        Submit</button>
                </div>
            </div>
        </div>

    )
}
class Sample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paneOpened: true,
            mode: getMode()
        }
        this.handleTogglePane = this.handleTogglePane.bind(this);
        this.handleAfterClose = this.handleAfterClose.bind(this);
        this.getSplitViewConfig = this.getSplitViewConfig.bind(this);        
    }
    getSplitViewConfig() {
        return splitViewConfigs[this.state.mode];
    }
    handleTogglePane() {
        this.setState({ paneOpened: !this.state.paneOpened });
    }
    handleAfterClose() {
        this.setState({ paneOpened: false });
    }
    render() {
        const {handleChangeContent, sections, current} = this.props;
        var paneComponent = (
            <div>
                {sections.map((x, i) =>
                    <ReactWinJS.SplitView.Command
                        style={x.currentStep ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : null}
                        key={i}
                        label={x.label}
                        icon={x.icon}
                        onInvoked={() =>
                            handleChangeContent(x.id) } />) }
            </div>
        );
        var contentComponent = (
            <div id="contentWrapper">
                <div id="contentHost">
                    <div>
                        <current.component
                            content={current.label} {...current}
                            />
                    </div>
                </div>
            </div>
        );
        return (
            <div style={{ height: "100%" }}>
                <div className="the_heading win-ui-dark" style={{ height: 48, backgroundColor: "rgb(0, 113, 193)" }}>
                    <ReactWinJS.SplitViewPaneToggle
                        style={{ display: 'inline-block' }}
                        aria-controls={splitViewId}
                        paneOpened={this.state.paneOpened}
                        onInvoked={this.handleTogglePane} />
                    <img src="/images/app/logo.png" alt="Tuteria Logo" />
                    <h3 className="win-h3" style={{ display: "inline-block", marginLeft: 5 }}>Tuteria Request Form</h3>
                </div>
                <ReactWinJS.SplitView
                    id={splitViewId}
                    style={{ height: "calc(100% - 48px)" }}
                    paneComponent={paneComponent}
                    contentComponent={contentComponent}
                    paneOpened={this.state.paneOpened}
                    onAfterClose={this.handleAfterClose}
                    {...this.getSplitViewConfig() } />
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch)=>({
   handleChangeContent(id){
       dispatch({type:'CHANGE_SECTION',id})
   },
})
const mapStateToProps = (state)=>{
    const defaultComponent = {1:FirstComponent,2:SecondComponent,3:ThirdComponent,4:FourthComponent}
    let current = state.appState.filter(x=> x.currentStep == true)[0]
    current = Object.assign({},current,{component:defaultComponent[current.id]})
    
    return {
        sections: state.appState,
        current
    }
}

const Root = connect(mapStateToProps, mapDispatchToProps)(Sample)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, 
    document.getElementById("app")
);

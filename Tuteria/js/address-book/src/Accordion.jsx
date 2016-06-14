import React, {Component, PropTypes} from 'react'

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class: "section"
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.state.open) {
            this.setState({
                open: false,
                class: "section"
            });
        } else {
            this.setState({
                open: true,
                class: "section open"
            });
        }
    }
    render() {
        return (
            <div className={this.state.class}>
                <button>toggle</button>
                <div className="sectionhead" onClick={this.handleClick}>{this.props.title}</div>
                <div className="articlewrap">
                    <div className="article">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export class CheckBox extends Component{    
    render(){
        return (
            <div className="col-4 col-mb-12 row-space-10">
                <label>
                    <input type='checkbox' className='win-checkbox' 
                        value={this.props.value} 
                        checked={this.props.isChecked}
                        onChange={this.props.onSubjectSelected} />
                        {this.props.value}
                </label>            
            </div>            
        )
    }
}
const Accordion = (props) => {
    const {categories} = props;
    return (
        <div className="main">
            <div className="title">{props.title}</div>
            <div className="col-group">
            <div className="col-12">
            {categories.map((category, index)=>
                <Section key={index} title={category.name}>
                    {category.subjects.map((subject,i)=>
                        <CheckBox key={i} value={subject} />)}
                    <div className="col-group">
                        <p className="col-12">Please Select Class</p>
                    </div>
                    <div className="col-group">
                    {category.levels.map((level,j_index)=>
                            <CheckBox key={j_index} value={level} />)}
                    </div>                    
                </Section>)
            }
            </div>
            </div>
            
        </div>
    )
};

export default Accordion;
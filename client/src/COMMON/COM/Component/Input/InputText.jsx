import React, {Component} from 'react';

export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.className = props.className;
        this.pageModel = props.model;
        this.bindName = props.property;
        this.divClass = props.divClass;
        this.id = props.id;
        this.type= props.type;
        this.defaultValue = props.defaultValue;
        this.inputType = props.inputType;
        this.icon = props.icon;
        this.iconName = props.iconName;
        this.placeholder = props.placeholder;
        this.divTag = props.divTag;
        this.props = props;
    }

    keyDownAction(){
        this.pageModel[this.bindName] = this.input.value;
        //console.log(this.input.value);
    }

    iconRender(){
        if(this.icon){
            return(
                <i aria-hidden='true' className={this.iconName + ' icon'}/>
            );
        }
    }

    render() {
        if(this.divTag == 'false'){
            return(
                <input placeholder={this.placeholder} id={this.id} className={this.className} type={this.type} onKeyUp={this.keyDownAction.bind(this)} ref={input => this.input = input} defaultValue={this.defaultValue} style={this.props.style}/>
                    
            );
        }else{
            return(
                <div className={'ui '+ this.inputType + ' ' + this.icon + ' input ' + this.divClass}>
                    <input placeholder={this.placeholder} id={this.id} className={this.className} type={this.type} onKeyUp={this.keyDownAction.bind(this)} ref={input => this.input = input} defaultValue={this.defaultValue} style={this.props.style}/>
                    {this.iconRender()}
                    {this.props.children}
                </div>
            );
        }
        
    }
}
import React, {Component} from 'react';

export default class UIDataTable extends Component {
    constructor(props) {
        super(props);
        this.className = props.className;
        this.pageModel = props.model;
        this.bindName = props.property;
        this.id = props.id;
        this.label = props.label;
    }

    

    render() {
        return(
            <label className={this.className} id={this.id}>{this.label}</label>
        );
    }
}
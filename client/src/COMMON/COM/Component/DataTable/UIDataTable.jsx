import React, {Component} from 'react';
import UItable_Col from './UItable_Col.jsx';
export default class UIDataTable extends Component {
    constructor(props) {
        super(props);
        this.className = props.className;
        this.pageModel = props.model;
        this.bindName = props.property;
        this.id = props.id;
        this.type= props.type;
        this.defaultValue = props.defaultValue;
        this.colList = props.children;
    }

    

    render() {
        return(
            <div className="datatable">
                <div className="datatable-hdiv">
                    <div className="datatable-hbox">
                        <table className="datatable-htable">
                            <thead>
                                <tr>
                                    <th>列1</th>
                                    <th>列2</th>
                                    <th>列3</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="datatable-bdiv">
                    <div className="datatable-bbox">
                        <table className="datatable-btable">
                            <tbody>
                                <tr>
                                    {
                                        this.colList.map((item, i) => (
                                            <td>
                                                <UItable_Col label={item.props.label} id={item.props.id} key={i}></UItable_Col>
                                                
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <td>值4</td>
                                    <td>值5</td>
                                    <td>值6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
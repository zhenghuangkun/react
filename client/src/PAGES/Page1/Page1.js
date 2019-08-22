import React, {Component} from 'react';
import PageAction from './action';
import PageServer from './server';
import UIDataTable from '../../COMMON/COM/Component/DataTable/UIDataTable.jsx';
import UItable_Col from '../../COMMON/COM/Component/DataTable/UItable_Col.jsx';
import InputText from '../../COMMON/COM/Component/Input/InputText.jsx';
import commonSessionTool from '../../COMMON/MVC/utils/commonSessionTool.js';
import { Button, Icon, Table } from 'semantic-ui-react';
import commonReduxTool from '../../redux/commonReduxTool';

export default class Page1 extends Component {

    constructor(props){
        super(props);
        this.action = new PageAction();
        this.server = new PageServer("page1Rui001Server");
        this.pageMode = {};
        this.state={
            model:{},
            initFlag: false
        }
    }

    /**
     * 正要装载,每一个组件render之前立即调用，页面还没渲染前
     */
	componentWillMount(){
        document.title = "page1";
        console.log('page1-login-state:');
        commonReduxTool.getLoginState();
        this.action.initData(this);

        
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){
        
    }

    render() {
        if(this.state.initFlag){
            return (
                <div>
                    <div>
                        this is Page1111~
                        <table>
                            <tbody>
                                <tr>
                                    <td>姓名:</td>
                                    <td>{this.state.model.data.userName}</td>
                                </tr>
                                <tr>
                                    <td>密码:</td>
                                    <td>{this.state.model.data.passWord}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {/* <UIDataTable>
                            <UItable_Col label="ssss1" id="hss1"></UItable_Col>
                            <UItable_Col label="ssss2" id="hss2"></UItable_Col>
                            <UItable_Col label="ssss3" id="hss3"></UItable_Col>
                            <UItable_Col label="ssss4" id="hss4"></UItable_Col>
                        </UIDataTable> */}
                    </div>
                    <div>
                        <Button animated>
                            <Button.Content visible>Next</Button.Content>
                            <Button.Content hidden>
                            <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                        <Table celled>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Notes</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            <Table.Row>
                                <Table.Cell>No Name Specified</Table.Cell>
                                <Table.Cell>Unknown</Table.Cell>
                                <Table.Cell>None</Table.Cell>
                            </Table.Row>
                            <Table.Row warning>
                                <Table.Cell>Jimmy</Table.Cell>
                                <Table.Cell>
                                <Icon name='attention' />
                                Requires Action
                                </Table.Cell>
                                <Table.Cell>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jamie</Table.Cell>
                                <Table.Cell>Unknown</Table.Cell>
                                <Table.Cell warning>
                                <Icon name='attention' />
                                Hostile
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Unknown</Table.Cell>
                                <Table.Cell>None</Table.Cell>
                            </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                    <InputText  type="text" inputType="" model={this.pageModel} property='userName' className="input-body" icon="" iconName="users" />
                </div>
            )
        }
        return '';
    }
}
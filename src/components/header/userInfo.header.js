import { Popover, Button, Icon,Modal } from 'antd';
import React,{Component} from "react";
import styles from "./header.less";
import UserForm from "../forms/userInfo.form";

const ExportModal = function({phone,visible,handleCancel,handleOk,changePassword,dispatch,clear}){
    return(
        <Modal
          title="修改账户信息"
          visible={visible}
          onCancel={handleCancel}
          onOk={handleOk}
        >
            <UserForm 
                phone={phone} 
                changePassword={changePassword} 
                dispatch={dispatch}
                clear={clear}
            />
        </Modal>
    );
};

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            clear: false
        };
    }
    modalHandler= ()=>{
        this.setState({
            visible: true,
            clear: false
        });
    }
    handleOk = ()=>{
        this.props.dispatch({type:"data/changePassword"});
    }
    getLevel = (level)=>{
        switch (level){
            case 1: return "市级管理员";
            case 2: return "县/区管理员";
            case 3: return "镇/街道管理员";
            case 4: return "村/社区管理员";
            default: return "管理员";
        }
    }

    handleCancel=()=>{
        this.setState({
            visible:false,
            clear: true
        });
    }

    render(){
        const {userInfo,handleLogout,dispatch,changePassword,alertMsg} =this.props;
        const text="用户信息";
        const content = (
            <div style={{padding: '0'}}>
                <p style={{textAlign:"center"}}><span> {this.getLevel(userInfo.orgLevel)} </span></p>
                <ul className={styles.listItemUl}>
                    <li key="userinfo1">
                        <a onClick={this.modalHandler}>
                            <span>
                                <Icon type="solution" />
                            </span>
                            <p>修改密码</p>
                        </a>
                    </li>
                    <li key="userinfo3">
                        <a onClick={handleLogout}>
                            <span>
                                <Icon type="poweroff" />
                            </span>
                            <p>退出登录</p>
                        </a>
                    </li>
                </ul>
            </div>
        );
        
        return(
            <div className={styles.userInfoArea}>
                <ExportModal 
                    visible={this.state.visible} 
                    handleCancel={this.handleCancel} 
                    phone={userInfo.phone} 
                    handleOk={this.handleOk}
                    changePassword={changePassword}
                    dispatch={dispatch}
                    clear={this.state.clear}
                />
                <Popover placement="bottomRight" content={content} trigger="hover" overlayClassName={styles.userInfoOverlay}>
                    <span className={styles.userInfoSpan} >账户信息：{userInfo.phone}</span>
                </Popover>
            </div>
        );
    }
}

export default UserInfo;
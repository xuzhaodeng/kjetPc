import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/index.header";
import Content from "../components/content/index.content";
import Footer from "../components/footer";
import MenuList from "../components/menu/index.menu";
import {message} from "antd";

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      collapsed: false,
      mode: "inline",
      height: 640,
      downloadUrl: "",
      alert:""
    }
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  onLogout=()=>{
    this.props.dispatch({type:'login/logout'});
  }

  componentDidMount(){
      const height = window.screen.availHeight?window.screen.availHeight:640;
      this.setState({
          height: height-300
      });
  }

  checkIfNeedAlert(nextProps,preProps){
    if(nextProps.data.changePasswordMessageAlert && nextProps.data.changePasswordMessageAlert != preProps.data.changePasswordMessageAlert){
        switch(nextProps.data.changePasswordMessageType){
          case "success":
            message.success(nextProps.data.changePasswordMessageText);
            const logout = this.onLogout;
            this.setState({
              alert:"success"
            });
            setTimeout(function(){logout();},1000);
            break;
          case "error":
            message.error(nextProps.data.changePasswordMessageText);
            this.setState({
              alert:"success"
            });
            break;
          default:
            return true;
        }
    }
    return true;
  }
  checkIfNeedDownload(nextProps,preProps){
    if(nextProps.data.downloadUrl == preProps.data.downloadUrl){
      return false;
    }
    return true;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.changePasswordMessageAlert){
      if(this.checkIfNeedAlert(nextProps,this.props)){
        this.props.dispatch({type:"data/closeMessage",alertType:"changePassword"});
        return true;
      }else{
        return false;
      }
    }
    
    if(nextProps.data.downloadUrl != ""){
      if(this.checkIfNeedDownload(nextProps,this.props)){
        this.props.dispatch({type:"data/closeDownload"});
        this.setState({
          downloadUrl:nextProps.data.downloadUrl
        });
      }else{
        return false;
      }
    }
    return true;
  }

  
  render(){
    if(this.props.login.status === false) return null;
    const path = (typeof this.props.location.pathname !== "undefined")?this.props.location.pathname.split('\/'):["","/"];
    const {dispatch} = this.props;
    const url = this.state.downloadUrl;
    const menuSet = {search:1,data:1,city:1,area:1,details:1,country:1,checkCity:2,checkArea:2,checkData:2};
    const menuList1=[
        {text:"地区汇总表",icon:"contacts",link:this.props.login.originalLink,level:[1,2,3],menu:1},
        {text:"花名册查询",icon:"solution",link:"/search",level:[1,2],menu:1}
    ];
    const menuList2=[
        {text:"保障评估",icon:"smile-o",link:this.props.login.originalCheckLink,level:[1,2,3],menu:2}
    ];
    const navList = [
        {text: "资料审核",link:this.props.login.originalLink},
        {text: "保障评估",link:this.props.login.originalCheckLink}
    ];
    return (
      <Layout
        type="leftSider"
        header={<Header 
          navList={navList} 
          userInfo={this.props.login.loginData} 
          handleLogout={this.onLogout} 
          dispatch={dispatch}
          changePassword={this.props.data.changePassword}
          applyStatusReport={this.props.login.loginData.applyStatusReport}
          />
        }
        footer={<Footer />}
        menuList={<MenuList menuList={menuSet[path[1]]==1?menuList1:menuList2} mode={this.state.mode} collapsed={this.state.collapsed} level={this.props.login.loginData.orgLevel} />}
        mode={this.state.mode}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        height={this.state.height}
        path={path[1]}
      >
          <iframe style={{display:"none"}} src={url} ></iframe>
          {this.props.children}
      </Layout>
    );
  }
}

IndexPage.propTypes = {};

export default connect(({login,data,loading})=>{return {login,data,loading};})(IndexPage);

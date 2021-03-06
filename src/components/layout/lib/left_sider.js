import { Layout,Menu,Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import QueueAnim from 'rc-queue-anim';
import FixedBottom from "../../well/feedBack.well";
const {SubMenu} = Menu;

export default function({components,param}){
    return(
          <Layout>
                <Header className="header" style={{position:"fixed",top:0,left:0,width:"100%",zIndex:11}}>
                    {components.header}
                </Header>
                <Layout style={{marginTop:50}} key="1">
                    <Sider
                        collapsible
                        collapsed={param.collapsed}
                        onCollapse={param.onCollapse}
                        width={160}
                        style={{ height: "100%",backgroundColor: "#fff",paddingTop:64,position:"fixed",top:0,left:0,zIndex:10 }}
                    >
                        {components.menuList}
                    </Sider>
                    <Layout style={{ padding: '16px',paddingLeft:!param.collapsed?176:80 }} >
                        <Content style={{ backgroundColor: '#fff', padding: 16, margin: 0, minHeight: 800 }}>
                           {components.children}
                        </Content>
                    </Layout>
                </Layout>
                <Footer>{components.footer}</Footer>
            </Layout>
    );
}
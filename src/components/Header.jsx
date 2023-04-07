import React from 'react';
import {Layout, Space, Button} from "antd";
import {Link, useLocation} from "react-router-dom";
import {
    LogoutOutlined
} from '@ant-design/icons';
import {auth} from "../firebase/Firebase"
import {signOut} from "firebase/auth";
import {selectIsLoggedIn, selectProjectData} from "../app/slice";
import {useSelector} from "react-redux";

const { Header} = Layout;

function HeaderC() {
    const location = useLocation();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const projectData = useSelector(selectProjectData);
    const showTitle = !["/main"].includes(location.pathname)
    return (
        <Header
            style={{
                backgroundColor : "#001529",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            <div className="header-logo">
                <Link to={"/main"}  style={{letterSpacing: 1, color: '#fff', fontSize: 30}}>
                    {showTitle ? projectData.title : ''}
                </Link>
            </div>
            {
                isLoggedIn &&
                <div className="header-icon" style={{marginTop : 5 }}>
                    <Space>
                        <Space wrap>
                            <Button
                                type="text"
                                icon={<LogoutOutlined  style={{ color: '#fff', fontSize: 24 }} />}
                                onClick={() => signOut(auth)}
                            />
                        </Space>
                    </Space>
                </div>
            }
        </Header>
    );
}

export default HeaderC;

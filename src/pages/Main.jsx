import React from "react";
import {selectProjectList, setModal, setProjectData, selectProjectData, setCategoryList} from "../app/slice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Space, Card, Dropdown} from 'antd'
import {PlusOutlined} from "@ant-design/icons";

const uploadStyle = {
    display: 'inline-block',
    width: '300px',
    height: '183px',
    marginTop : '10px',
    overflow: 'hidden',
    backgroundColor : '#fefefe',
    position : 'relative'
};

function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projectList = useSelector(selectProjectList);
    const projectData = useSelector(selectProjectData);

    const createProject = () => {
        projectData.id !== "" && dispatch(setProjectData({title : "", id : ""}));
        dispatch(setModal({show: true, type: 'project', subType : 'create'}));
    }
    const updateProject = () => dispatch(setModal({show: true, type: 'project', subType : 'update'}));
    const deleteProject = () => dispatch(setModal({show: true, type: 'delete-project'}));

    const items = [
        {
            label: '수정',
            key: '1',
            onClick : () => {updateProject()}
        },
        {
            label: '삭제',
            key: '2',
            onClick : () => {deleteProject()}
        }
    ];
    const menuProps = {items};

    return (
        <div style={{textAlign:'center'}}>
            {
                <Space style={{marginTop:  20, flexWrap: 'wrap'}} size={16}>
                    <div onClick={createProject} style={uploadStyle} className={"upload_btn"}>
                        <PlusOutlined style={{margin: '20% 0 10px 0'}}/>
                        <div>프로젝트 생성</div>
                    </div>
                    {projectList.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            extra={<Dropdown.Button menu={menuProps} />}
                            style={{width: 300}}
                            onClick={() => {
                                dispatch(setCategoryList([]))
                                dispatch(setProjectData({title : item.title, id : item.id}))}
                            }
                        >
                            <div style={{cursor: 'pointer'}} onClick={() => {navigate(`/detail/${item.id}`)}}>
                                <p>생성일 : {item.createdDate}</p>
                                <p>수정일 : {item.updatedDate}</p>
                            </div>
                        </Card>
                    ))}
                </Space>
            }
        </div>
    );
}

export default Main;

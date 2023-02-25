import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    selectProjectList,
    setModal,
    setCategoryList,
    selectCategoryList,
    selectIsLoggedIn,
    setCategoryData,
    setProjectData,
    selectPageList,
    setPageData
} from "../app/slice";
import {Tree, Tag, Popover, Button} from 'antd';
import {PlusOutlined, SmallDashOutlined} from "@ant-design/icons";
import {getPageApi} from "../api/adaptor.api";

const { DirectoryTree } = Tree;

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.projectId;
    const projectList = useSelector(selectProjectList);
    const categoryList = useSelector(selectCategoryList);
    const categoryData = useSelector(setCategoryData);
    const pageList = useSelector(selectPageList);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [treeData, setTreeData] = useState([]);
    const [url, setUrl] = useState("");

    const createCategory = () => {
        categoryData.id !== "" && dispatch(setCategoryData({title : "", id : "", parentId : ""}));
        dispatch(setModal({show: true, type: 'category', subType : 'create'}));
    };
    const updateCategory = () => dispatch(setModal({show: true, type: 'category', subType : 'update'}));
    const deleteCategory = () => dispatch(setModal({show: true, type: 'delete-category'}));

    const createPage = () => dispatch(setModal({show: true, type: 'page', subType : 'create'}));
    const updatePage = () => dispatch(setModal({show: true, type: 'page', subType : 'update'}));
    const deletePage = () => dispatch(setModal({show: true, type: 'delete-page'}));

    const categoryContent = (
        <div style={{cursor : 'pointer'}}>
            <p onClick={createPage}>하위 카테고리 생성</p>
            <p onClick={updateCategory}>수정</p>
            <p onClick={deleteCategory}>삭제</p>
        </div>
    );

    const pageContent = (
        <div style={{cursor : 'pointer'}}>
            <p onClick={updatePage}>수정</p>
            <p onClick={deletePage}>삭제</p>
        </div>
    );

    useEffect(()=> {
        projectList.forEach( val =>{
            if(val.id === id) {
                getPageApi(val.id);
                dispatch(setCategoryList(val.category));
                dispatch(setProjectData({id: val.id, title : val.title}))
            }
        })
    },[projectList]);

    useEffect(() => {
        const categoryListCopy = JSON.parse(JSON.stringify(categoryList));
        console.log(categoryListCopy)
        console.log(pageList)
        for(let i = 0; i < pageList.length; i++){
            for(let j = 0; j < categoryListCopy.length; j++){
                if(pageList[i].parentId === categoryListCopy[j].id){
                    categoryListCopy[j].page.push(pageList[i])
                }
            }
        }
        let newArr = [];
        categoryListCopy.map((val, idx)=> {
            let y = {};
            y['title'] = <div>
                {!isLoggedIn
                    ? (
                        <div className="text">{val['title']}</div >
                    )
                    : (
                        <div style={{display : 'flex'}} onClick={() => {dispatch(setCategoryData({title : val.title, id : val.id, parentId : val.parentId}))}}>
                            <div className="text">{val['title']}</div>
                            <Popover placement="right" style={{marginRight: 10}} content={categoryContent} trigger="hover">
                                <SmallDashOutlined style={{marginLeft: 20, marginTop: 3, width: 20, height:20, border: "1px solid #d9d9d9"}}/>
                            </Popover>
                        </div>
                    )
                }
            </div>
            y['key'] = idx;
            y['children'] = val.page.map((val2, idx2) => {
                let z = {};
                z['title'] = <div style={{display : 'flex'}} onClick={() => {dispatch(setPageData({state: val2.state, url: val2.url, title : val2.title, id : val2.id, parentId : val2.parentId}))}}>
                    <div>
                        <Tag color={val2['state'] === "0" ? 'default' : val2['state'] === "2" ? 'green' : 'volcano'}>
                            {val2['state'] === "0" ? '대기중' : val2['state'] === "2" ? '완료' : '작업중'}
                        </Tag>
                    </div>
                    <div className="text" style={{width: 73, overflow: 'hidden'}}>{val2['title']}</div>
                    <img style={{marginRight: 10, marginTop: 7, width: 10, height: 10}} src={"https://cdn-icons-png.flaticon.com/128/2089/2089708.png"} alt=""/>
                    <Popover placement="right" content={pageContent} trigger="hover">
                        <SmallDashOutlined style={{marginTop: 3, float : 'right', width: 20, height:20, border: "1px solid #d9d9d9"}}/>
                    </Popover>
                </div>
                z['key'] = `${idx}-${idx2}`;
                z['isLeaf'] = true;
                z['url'] = val2['url'];
                return z
            });
            newArr.push(y);
        });
        setTreeData(newArr);
    }, [pageList]);

    const onSelect = (keys, info) => {
        if(info.nativeEvent.target.tagName === "IMG"){
            window.open(info.node.url, "_blank")
        }else{
            info.node.url !== undefined && setUrl(info.node.url)
        }
    };

    return (
        <div style={{display : 'flex'}}>
            <div style={{width: 300}}>
                {treeData.length > 0 &&
                    <DirectoryTree
                        multiple
                        placement="top"
                        defaultExpandAll
                        onSelect={onSelect}
                        treeData={treeData}
                        defaultSelectedKeys={['0-0']}
                        style={{fontSize : 16, marginTop : 5}}
                    />
                }
                {isLoggedIn && (
                        <Button type="text" className="createBtn" icon={<PlusOutlined />} onClick={createCategory}>카테고리 생성</Button>
                    )
                }
            </div>
            <div style={{width: '85%', height: 800}}>
                <iframe src={url} height="100%" width="100%"/>
            </div>
        </div>
    )
}
export default Detail;

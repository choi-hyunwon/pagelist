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
    setPageData,
    selectProjectData
} from "../app/slice";
import {Tree, Tag, Popover, Button, Checkbox} from 'antd';
import {PlusOutlined, SmallDashOutlined} from "@ant-design/icons";
import {getPageApi} from "../api/adaptor.api";

const { DirectoryTree } = Tree;

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.projectId;
    const projectList = useSelector(selectProjectList);
    const projectData = useSelector(selectProjectData);
    const categoryList = useSelector(selectCategoryList);
    const pageList = useSelector(selectPageList);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [treeData, setTreeData] = useState([]);
    const [isMobile, setIsMobile] = useState(true);
    const [isShowAll, setIsShowAll] = useState(true);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [allKeys, setAllKeys] = useState([]);
    const [checked, setChecked] = useState(false);
    const [url, setUrl] = useState("");

    const createCategory = () => {
        dispatch(setCategoryData({title : "", id : "", parentId : ""}));
        dispatch(setModal({show: true, type: 'category', subType : 'create'}));
    };
    const updateCategory = () => dispatch(setModal({show: true, type: 'category', subType : 'update'}));
    const deleteCategory = () => dispatch(setModal({show: true, type: 'delete-category'}));

    const createPage = () => {
        dispatch(setPageData({title : "", url : "", id : "", parentId : "", state: ""}))
        dispatch(setModal({show: true, type: 'page', subType : 'create'}));
    }
    const updatePage = () => dispatch(setModal({show: true, type: 'page', subType : 'update'}));
    const deletePage = () => dispatch(setModal({show: true, type: 'delete-page'}));

    const categoryContent = (
        <div style={{cursor : 'pointer'}}>
            <p onClick={createPage}>페이지 생성</p>
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
                getPageApi({id :val.id});
                dispatch(setCategoryList(val.category));
                dispatch(setProjectData({id: val.id, title : val.title}))
            }
        })
    },[projectList]);

    useEffect(() => {
        const categoryListCopy = JSON.parse(JSON.stringify(categoryList));
        for(let i = 0; i < pageList.length; i++){
            for(let j = 0; j < categoryListCopy.length; j++){
                if(pageList[i].parentId === categoryListCopy[j].id){
                    categoryListCopy[j].page.push(pageList[i])
                }
            }
        }
        setUrl(categoryListCopy[0]?.page[0]?.url);
        let newArr = [];
        categoryListCopy.map((val, idx)=> {
            let y = {};
            y['title'] =
                <div style={{display : 'flex'}} onClick={() => { isLoggedIn && dispatch(setCategoryData({title : val.title, id : val.id, parentId : val.parentId}))}}>
                    <div className="text">{val['title']}</div>
                    {isLoggedIn &&
                        <Popover placement="right" style={{marginRight: 10}} content={categoryContent} trigger="hover">
                            <SmallDashOutlined style={{margin:'3px 0 0 20px', width: 20, height:20, border: "1px solid #d9d9d9"}}/>
                        </Popover>
                    }
                </div>
            y['key'] = idx.toString();
            y['children'] = val.page.map((val2, idx2) => {
                let z = {};
                z['title'] = <div style={{display : 'block'}} onClick={() => {isLoggedIn && dispatch(setPageData({state: val2.state, url: val2.url, title : val2.title, id : val2.id, parentId : val2.parentId}))}}>
                    <div style={{display : 'flex'}} >
                        <div>
                            <Tag color={val2['state'] === "0" ? 'default' : val2['state'] === "2" ? 'green' : 'volcano'}>
                                {val2['state'] === "0" ? '대기중' : val2['state'] === "2" ? '완료' : '작업중'}
                            </Tag>
                        </div>
                        <div>
                            <Tag color={'default'} className={'blank'}>
                                새창보기
                            </Tag>
                        </div>
                        {isLoggedIn &&
                            <Popover placement="right" content={pageContent} trigger="hover">
                                <SmallDashOutlined style={{marginTop: 3, float : 'right', width: 20, height:20, border: "1px solid #d9d9d9"}}/>
                            </Popover>
                        }
                    </div>
                    <div className="text" >{val2['title']}</div>
                </div>
                z['key'] = `${idx}-${idx2}`;
                z['isLeaf'] = true;
                z['url'] = val2['url'];
                return z
            });
            newArr.push(y);
        });
        const expandedKeys = [];
        const expandMethod = arr => {
            arr.forEach(data => {
                expandedKeys.push(data.key);
                if (data.children) expandMethod(data.children);
            });
        };
        newArr= newArr.reverse()
        expandMethod(newArr);
        setAllKeys(expandedKeys);
        console.log(newArr)
        setTreeData(newArr);
    }, [pageList, categoryList]);

    const onSelect = (keys, info) => {
        if(expandedKeys.length > 1){
            if(keys[0].split('-').length === 1){
                if(!expandedKeys.includes(keys[0])) setExpandedKeys(keys);
                else setExpandedKeys(expandedKeys.filter(val => val.split('-')[0] !== keys[0]));
            }
        }else{
            if(expandedKeys[0] === keys[0]) setExpandedKeys([]);
            else if(expandedKeys[0] !== keys[0].split('-')[0]) setExpandedKeys(keys);
        }
        if(info.nativeEvent.target.className.includes("blank") ){
            window.open(info.node.url, "_blank");
            setUrl(info.node.url);
        }else{
            info.node.url !== undefined && setUrl(info.node.url);
        }
    };

    const onExpandAll = (e) => {
        if(isShowAll) setExpandedKeys([]);
        else setExpandedKeys(allKeys);
        setIsShowAll(!isShowAll);
        setChecked(e.target.checked);
    };

    return (
        <div style={{display : 'flex'}}>
            <div style={{width: 380, backgroundColor:"#f4f4f4"}}>
                {/*<h3 style={{margin: '5px 0 -7px 5px'}}>{projectData.title}</h3>*/}
                {treeData.length > 0 &&
                    <div style={{margin: '15px 0 0 5px', display : 'flex'}}>
                        {/*<div onClick={onExpandAll} style={{cursor : 'pointer', fontSize : 14, marginRight : 15}}>모두 {isShowAll ? '닫기' : '열기'}</div>*/}
                        <Checkbox defaultChecked={'checked'} onChange={(e)=>setIsMobile(e.target.checked)}>모바일 보기</Checkbox>
                    </div>
                }
                {isLoggedIn && (
                    <Button style={{width : 150, margin : '15px 0 15px 5px' , border : '1px solid #d9d9d9'}} type="text" className="createBtn" icon={<PlusOutlined />} onClick={createCategory}>
                        카테고리 생성
                    </Button>
                )}
                {treeData.length > 0 &&
                    <DirectoryTree
                        multiple
                        placement="top"
                        onSelect={onSelect}
                        treeData={treeData}
                        // defaultExpandAll={true}
                        style={{fontSize : 16, marginTop : 5, height: 680, overflowY : 'auto'}}
                        expandedKeys={expandedKeys}
                    />
                }
            </div>
            <div style={{ margin: `${isMobile ? '0 auto' : '0'}`, width: `${isMobile ? '375px' : '85%'}`, height: 800}}>
                <iframe src={url} height="100%" width="100%"/>
            </div>
        </div>
    )
}
export default Detail;

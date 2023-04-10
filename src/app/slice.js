import { createSlice} from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        modal : {show : false, type : "", subType : ""},
        isLoggedIn : false
    },
    reducers: {
        setModal : (state, action) => {
            state.modal = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});
export const {setModal, setIsLoggedIn} = commonSlice.actions;
export const selectModal = state => state.common.modal;
export const selectIsLoggedIn = state => state.common.isLoggedIn;

const postSlice = createSlice({
    name: "post",
    initialState: {
        projectList : [],
        projectData : {
            title : "",
            id : "",
            type : "",
            defaultUrl : ""
        },
        categoryList : [],
        categoryData : {
            title : "",
            id : "",
            parentId : ""
        },
        pageList : [],
        pageData : {
            title : "",
            url : "",
            id : "",
            parentId : "",
            state: ""
        },
    },
    reducers: {
        setProjectList : (state, action) => {
            state.projectList = action.payload;
        },
        setProjectData: (state, action) => {
            state.projectData = action.payload;
        },
        setCategoryList : (state, action) => {
            state.categoryList = action.payload;
        },
        setCategoryData: (state, action) => {
            state.categoryData = action.payload;
        },
        setPageList : (state, action) => {
            state.pageList = action.payload;
        },
        setPageData : (state, action) => {
            state.pageData = action.payload;
        },
    }
});

export const {setProjectList, setProjectData, setCategoryList, setCategoryData, setPageList, setPageData} = postSlice.actions;

export const selectProjectList = state => state.post.projectList;
export const selectProjectData = state => state.post.projectData;
export const selectCategoryList = state => state.post.categoryList;
export const selectCategoryData = state => state.post.categoryData;
export const selectPageList = state => state.post.pageList;
export const selectPageData = state => state.post.pageData;

export {commonSlice,postSlice};

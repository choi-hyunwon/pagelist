import store from "../app/store";
import {auth, firestore} from "../firebase/Firebase";
import {setProjectList, setModal, setPageList} from "../app/slice";
import {createUserWithEmailAndPassword} from "firebase/auth";

const user = firestore.collection("user");
const project = firestore.collection("project");
const page = firestore.collection("page");

export const createUserApi = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const userInfo = userCredential.user;
            user.doc(userInfo.uid).set({
                email : values.email,
                password : values.password
            });
            store.dispatch(setModal({show: true, type: "join-success"}));
        })
        .catch((error) => {
            switch(error.code){
                case "auth/email-already-in-use":
                    store.dispatch(setModal({show: true, type: "email-already-in-use"}));
                    break;
                default:
                    store.dispatch(setModal({show: true, type: "join-fail"}));
                    break;
            }
        });
};

export const getProjectApi = () => {
    let projectList = [];

    return project.get().then((doc) => {
        doc.forEach((docs)=>{
            projectList.push(docs.data())
        })
        store.dispatch(setProjectList(projectList))
    });
};

export const getPageApi = (id) => {
    return page.doc(id).get().then((doc) => {
        doc.data()?.list !== undefined && store.dispatch(setPageList(doc.data().list))
    });
};

export const createProjectApi = (values) => {
    project.doc(values.id).set({
        ...values,
        category : []
    })
    .then(() => {
        getProjectApi();
        store.dispatch(setModal({show: true, type: "create-project-success"}));
    })
    .catch((error) => {
        console.error("[createProjectApi] Error : ", error);
    });
};

export const updateProjectApi = (values) => {
    project.doc(store.getState().post.projectData.id).update({
        ...values
    })
    .then(() => {
        getProjectApi();
        store.dispatch(setModal({show: true, type: "update-project-success"}));
    })
    .catch((error) => {
        console.error("[updateProjectApi] Error : ", error);
    });
};

export const deleteProjectApi = () => {
    project.doc(store.getState().post.projectData.id).delete()
    .then(() => {
        getProjectApi();
        store.dispatch(setModal({show: true, type: "delete-project-success"}));
    })
    .catch((error) => {
        console.error("[deleteProjectApi] Error : ", error);
    });
};

export const createCategoryApi = (values) => {
    const post = store.getState().post;
    const categoryList = [...post.categoryList];
    categoryList.push({...values, page : []});

    project.doc(post.projectData.id).update({
        category : categoryList
    })
        .then(() => {
            getProjectApi();
            store.dispatch(setModal({show: true, type: "create-category-success"}));
        })
        .catch((error) => {
            console.error("[createCategoryApi] Error : ", error);
        });
};

export const updateCategoryApi = (values) => {
    const post = store.getState().post;
    const categoryList = JSON.parse(JSON.stringify(post.categoryList));
    categoryList.forEach((val) => {
        if(val.id === post.categoryData.id) {
            val.title = values.title;
            val.updatedDate =  values.updatedDate;
        }
    });
    project.doc(post.categoryData.parentId).update({
        category : categoryList
    })
        .then(() => {
            getProjectApi();
            store.dispatch(setModal({show: true, type: "update-category-success"}));
        })
        .catch((error) => {
            console.error("[updateCategoryApi] Error : ", error);
        });
};

export const deleteCategoryApi = () => {
    const post = store.getState().post;
    const categoryList = JSON.parse(JSON.stringify(post.categoryList));
    const pageList = JSON.parse(JSON.stringify(post.pageList));

    page.doc(post.categoryData.parentId).update({
        list : pageList.filter(val => val.parentId !== post.categoryData.id)
    });

    project.doc(post.categoryData.parentId).update({
        category : categoryList.filter(val => val.id !== post.categoryData.id)
    })
        .then(() => {
            getProjectApi();
            store.dispatch(setModal({show: true, type: "delete-category-success"}));
        })
        .catch((error) => {
            console.error("[deleteCategoryApi] Error : ", error);
        });
};

export const createPageApi = (values) => {
    const post = store.getState().post;
    const pageList = [...post.pageList];
    pageList.push({...values});

    page.doc(post.projectData.id).get().then((docs) => {
        if(docs.data() === undefined){
            page.doc(post.projectData.id).set({
                list : pageList
            })
                .then(() => {
                    getPageApi(post.projectData.id);
                    store.dispatch(setModal({show: true, type: "create-page-success"}));
                })
                .catch((error) => {
                    console.error("[createPageApi] Error : ", error);
                });
        }else{
            page.doc(post.projectData.id).update({
                list : pageList
            })
                .then(() => {
                    getPageApi(post.projectData.id);
                    store.dispatch(setModal({show: true, type: "create-page-success"}));
                })
                .catch((error) => {
                    console.error("[createPageApi] Error : ", error);
                });
        }
    });
};

export const updatePageApi = (values) => {
    const post = store.getState().post;
    const pageList = JSON.parse(JSON.stringify(post.pageList));
    pageList.forEach((val) => {
        if(val.id === post.pageData.id) {
            val.title = values.title;
            val.updatedDate =  values.updatedDate;
            val.url = values.url;
            val.state = values.state;
        }
    });
    page.doc(post.projectData.id).update({
        list : pageList
    })
        .then(() => {
            getPageApi(post.projectData.id);
            store.dispatch(setModal({show: true, type: "update-page-success"}));
        })
        .catch((error) => {
            console.error("[updatePageApi] Error : ", error);
        });
};

export const deletePageApi = () => {
    const post = store.getState().post;
    const pageList = JSON.parse(JSON.stringify(post.pageList));
    page.doc(post.projectData.id).update({
        list : pageList.filter(val => val.id !== post.pageData.id)
    })
        .then(() => {
            getProjectApi();
            store.dispatch(setModal({show: true, type: "delete-page-success"}));
        })
        .catch((error) => {
            console.error("[deletePageApi] Error : ", error);
        });
};

import store from "../app/store";
import {auth, firestore} from "../firebase/Firebase";
import {setProjectList, setModal} from "../app/slice";
import {createUserWithEmailAndPassword} from "firebase/auth";

const user = firestore.collection("user");
const project = firestore.collection("project");

export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values.user;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userInfo = userCredential.user;
            user.doc(userInfo.uid).set({
                ...values.user
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


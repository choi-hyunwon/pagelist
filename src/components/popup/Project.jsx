import React from 'react';
import {Form, Input, Button, Radio} from "antd";
import {selectProjectData} from "../../app/slice";
import {createProjectApi, updateProjectApi} from "../../api/adaptor.api";
import {useSelector} from "react-redux";
import {format} from 'date-fns'
import TextArea from "antd/es/input/TextArea";

const Project = ({subType}) => {
    const projectData = useSelector(selectProjectData);
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
    };

    const onFinish = (values) => {
        let projectData = {
            title : values.title,
            updatedDate : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            type : values.type,
            defaultUrl : values.defaultUrl || ""
        }
        if(subType === "create") {
            projectData = {...projectData, ...{id : Math.random().toString(36).substr(2, 16), createdDate : format(new Date(), "yyyy-MM-dd HH:mm:ss")}}
            createProjectApi(projectData);
        } else {
            updateProjectApi(projectData);
        }
    };

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    title : projectData.title,
                    type : projectData.type,
                    defaultUrl : projectData.defaultUrl
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={'title'}
                    label="Title"
                    rules={[{required: true}]}
                >
                    <Input style={{width : 400}} placeholder="프로젝트명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={['type']}
                    label="Type"
                    rules={[{required: true}]}
                >
                    <Radio.Group>
                        <Radio value="pc">PC</Radio>
                        <Radio value="mobile">MOBILE</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={'defaultUrl'}
                    label="Default Url"
                >
                    <TextArea style={{width : 400}} placeholder="대기중 페이지 URL을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name="submit"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {subType}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};
export default Project;

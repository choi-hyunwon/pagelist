import React from 'react';
import {Form, Input, Button, Radio} from "antd";
import {selectCategoryData, selectPageData, selectProjectData} from "../../app/slice";
import {checkUrl} from "../../utils/utilCommon";
import {createPageApi, updatePageApi} from "../../api/adaptor.api";
import {useSelector} from "react-redux";
import {format} from 'date-fns'
import TextArea from "antd/es/input/TextArea";

const Page = ({subType}) => {
    const projectData = useSelector(selectProjectData);
    const categoryData = useSelector(selectCategoryData);
    const pageData = useSelector(selectPageData);
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

    const validateUrl = (_, value) => {
        if (!value || checkUrl(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const onFinish = (values) => {
        let pageData = {
            title : values.title,
            state : values.state,
            url : values.url,
            updatedDate : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        }
        if(subType === "create") {
            pageData = {...pageData, ...{
                parentId : categoryData.id,
                id : Math.random().toString(36).substr(2, 16),
                createdDate : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            }};
            createPageApi(pageData);
        } else {
            updatePageApi(pageData);
        }
    };

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    title : pageData.title,
                    url : pageData.url || projectData.defaultUrl,
                    state : pageData.state || "0"
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={'title'}
                    label="Title"
                    rules={[{required: true}]}
                >
                    <Input placeholder="페이지명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={'url'}
                    label="Url"
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator: validateUrl,
                            message: "URL 형식에 맞게 입력해주세요."
                        }
                    ]}
                >
                    <TextArea  placeholder="링크명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={['state']}
                    label="State"
                    rules={[{required: true}]}
                >
                    <Radio.Group>
                        <Radio value="0">대기중</Radio>
                        <Radio value="1">작업중</Radio>
                        <Radio value="2">완료</Radio>
                    </Radio.Group>
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
export default Page;

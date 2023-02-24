import React from 'react';
import {Form, Input, Button, Radio} from "antd";
import {selectCategoryData} from "../app/slice";
import {createPageApi, updatePageApi} from "../api/adaptor.api";
import {useSelector} from "react-redux";
import {format} from 'date-fns'

const Page = ({subType}) => {
    const categoryData = useSelector(selectCategoryData);
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

                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={'title'}
                    label="Title"
                    rules={[{required: true}]}
                >
                    <Input style={{width : '300px'}} placeholder="페이지명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={'url'}
                    label="Url"
                    rules={[{required: true}]}
                >
                    <Input style={{width : '300px'}} placeholder="링크명을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={['state']}
                    label="State"
                    rules={[{required: true}]}
                >
                    <Radio.Group>
                        <Radio value="0">TODO</Radio>
                        <Radio value="1">IN PROGRESS</Radio>
                        <Radio value="2">DONE</Radio>
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

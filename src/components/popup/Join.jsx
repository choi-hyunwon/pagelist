import React, {useEffect} from "react";
import { Button, Form, Input } from 'antd';
import {checkPassword} from '../../utils/utilCommon';
import {createUserApi} from "../../api/adaptor.api";
import {LockOutlined, MailOutlined} from "@ant-design/icons";

const Join = () => {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(()=> {
        console.log("가입 간편")
    },[]);

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };

    const validatePassword = (_, value) => {
        if (!value || checkPassword(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const register = async (values) => {
        createUserApi(values.user)
    };

    return (
        <Form
            {...layout}
            style={{maxWidth: 600 , margin: '0 auto'}}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={register}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'email',
                        message: '이메일 형식에 맞게 작성해주세요.'
                    }
                ]}
            >
                <Input placeholder="이메일을 입력해주세요" prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="PW"
                rules={[
                    {
                        required: true,
                    },
                    {
                        validator: validatePassword,
                        message: "최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합"
                    }
                ]}
            >
                <Input.Password
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    autoComplete="on"
                    prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                />
            </Form.Item>
            <Form.Item
                name="submit"
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    join
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Join;

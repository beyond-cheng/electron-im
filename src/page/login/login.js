import React from 'react';
import { Form, Input, Button, Checkbox, message } from "antd";
import "antd/dist/antd.css";
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            token: null
        }
    }

    generatorToken() {
        return this.state.username + '-' + this.state.password;
    }

    onFinish() {
        if(this.state.username === 'ldd' && this.state.password === '123') {
            //賬密通過
            this.setState({
                token: this.generatorToken()
            });

            // ipcRenderer.send('loginSucc', this.setState.token);

            window.NativeAPI.loginSucc(this.state.token);

        } else {
            message.error('账号或密码错误');
        }
    }

    onFinishFailed() {

    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePwdChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish.bind(this)}
                onFinishFailed={this.onFinishFailed.bind(this)}
                autoComplete="off"
                className="login-form"
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={this.state.username} onChange={this.handlePwdChange.bind(this)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 8 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 5, span: 8 }}>
                    <Button type="primary" htmlType="submit">
                    登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Login;

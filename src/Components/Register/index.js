import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import './index.less';

const FormItem = Form.Item;

class Register extends Component {
    constructor() {
        super()
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('输入的两次密码不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码'
                        }, {
                            validator: this.validateToNextPassword
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码'
                        }, {
                            validator: this.compareToFirstPassword
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} onBlur={this.handleConfirmBlur} />} type="password" placeholder="确认密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>同意 《xxx协议》</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    或者 <Link to='/login'>登录</Link>
                </FormItem>
            </Form>
        )
    }
}

const WrapRegister = Form.create()(Register);
export default WrapRegister;
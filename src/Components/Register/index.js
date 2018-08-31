import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, Button, Checkbox } from 'antd';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            telephone: ''
        }
    }
    _emitEmpty = (type) => {
        switch (type) {
            case "userName":
                this.userNameInput.focus()
                this.setState({ userName: '' })
                break
            case "telephone":
                this.telephoneInput.focus()
                this.setState({ telephone: '' })
                break
            case "password":
                this.passwordInput.focus()
                this.setState({ password: '' })
                break
            default: return
        }
    }
    handleChangeUsername = e => {
        this.setState({ userName: e.target.value })
    }
    handleChangeTelephone = e => {
        this.setState({ telephone: e.target.value })
    }
    handleChangePassword = e => {
        this.setState({ password: e.target.value })
    }
    render() {
        const userName = this.state.userName;
        const password = this.state.password;
        const telephone = this.state.telephone;
        const suffixUsername = userName ? <Icon type='close-circle' onClick={this._emitEmpty.bind(this, "userName")} /> : null
        const suffixPassword = password ? <Icon type='close-circle' onClick={this._emitEmpty.bind(this, "password")} /> : null
        const suffixTelephone = telephone ? <Icon type='close-circle' onClick={this._emitEmpty.bind(this, "telephone")} /> : null
        return (
            <form id='login_register'>
                <Input
                    placeholder='请输入用户名'
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffixUsername}
                    onChange={this.handleChangeUsername}
                    value={userName}
                    ref={node => this.userNameInput = node}
                />
                <Input
                    placeholder='请输入手机号'
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffixTelephone}
                    onChange={this.handleChangeTelephone}
                    value={telephone}
                    ref={node => this.telephoneInput = node}
                />
                <Input
                    placeholder='请输入密码'
                    type='password'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffixPassword}
                    onChange={this.handleChangePassword}
                    value={password}
                    ref={node => this.passwordInput = node}
                />
                <Checkbox>同意</Checkbox>
                <Button type='primary'>注册</Button>
                <div className='switch'>
                    已有帐号？<Link to='/login'>登录</Link>
                </div>
            </form>
        )
    }
}
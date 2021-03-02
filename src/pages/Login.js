import React, { useEffect, useState } from 'react'
import { usePost } from '../utils/rest'
import { Redirect } from 'react-router-dom'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuxWQxD8LrPkRmm6CGP_BR6KPoElQZmwU'

const Login = () => {
    const [postData, signin] = usePost(url)
    const [logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect (() => {
        if (Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken)            
            setLogado(true)
        }
    },[postData])

    const login = async() => {
        await signin({
            email,
            password: senha,
            returnSecureToken: true
        })
    }

    const onChangeEmail = (evt) => {
        setEmail(evt.target.value)
    }

    const onChangeSenha = (evt) => {
        setSenha(evt.target.value)
    }

    if (logado) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Login</h1>
            {
                postData.error && postData.error.length > 0 &&
                <p className="text-danger">E-mail e/ou senha incorretos</p>
            }
            <input type="text" value={email} onChange={onChangeEmail} placeholder="E-mail" />
            <input type="password" value={senha} onChange={onChangeSenha} placeholder="Senha" />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
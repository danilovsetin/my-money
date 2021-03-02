import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Header = () => {    
    const [logado, setLogado] = useState(true)
    useEffect(() => {              
        const token = localStorage.getItem('token')    
        if (token) {
            setLogado(true)            
        } else {
            setLogado(false)
        }
    },[])

    const logout = () => {
        localStorage.removeItem('token')
        setLogado(false)
    }

    if (!logado) {
        return <Redirect to='/login' />
    } else {
        return (
            <nav className='navbar navbar-light bg-light'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>MyMoney</Link>
                
                    <ul className='navbar-nav mr-auto'>
                        <li  className='nav-item'>
                            <button type='button' onClick={logout} className='btn nav-link'>Sair</button>
                        </li>
                    </ul>            
                </div>
            </nav>  
        )
    }
}

export default Header
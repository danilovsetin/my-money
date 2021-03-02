import React from 'react'
import { Link } from 'react-router-dom'
import Rest from '../../utils/rest'
import { Redirect } from 'react-router-dom'

const baseURL = 'https://mymoney-e3011-default-rtdb.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Meses = () => {    
    const data = useGet('meses')  

    if (data.loading) {
        return <span>Carregando...</span>
    }

    if (data.error === 'Permission denied') {
        return <Redirect to='/login'></Redirect>
    }

    if (Object.keys(data.data).length > 0) {
        return(
            <table className='table'>
                <thead>
                <tr>
                    <th>Ano/Mês</th>
                    <th>Previsão Entradas</th>
                    <th>Entradas</th>
                    <th>Previsão Saídas</th>
                    <th>Saídas</th>
                </tr>
                </thead>  
                <tbody>
                {
                    Object
                    .keys(data.data)
                    .map(mes => {
                    return(
                        <tr key={mes}>
                        <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_entradas}</td>
                        <td>{data.data[mes].entradas}</td>
                        <td>{data.data[mes].previsao_saidas}</td>
                        <td>{data.data[mes].saidas}</td>
                        </tr>
                    )
                    })
                }
                </tbody>          
            </table>                                        
        )
    }
        
}
export default Meses
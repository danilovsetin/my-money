import React from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-e3011-default-rtdb.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Movimentacoes = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    if (data.loading) {
        return <div className='container'><span>Carregando...</span></div>
    }
    return(        
      <div className='container'>
        <h2>Movimentações</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
            {
                data.data &&
                Object
                .keys(data.data)
                .map(mov => {
                return(
                    <tr key={mov}>                    
                    <td>{data.data[mov].descricao}</td>
                    <td>{data.data[mov].valor}</td>                    
                    </tr>
                )
                })
            }
            {
                !data.data &&
                <span>Não existem movimentações nesse período</span>
            }
            </tbody>
        </table>        
      </div>
    )
}

export default Movimentacoes


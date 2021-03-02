import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacaoApi } from '../../api'
import AdicionarMovimentacao from './AdicionarMovimentacao'
import InfoMes from './InfoMes'


const Movimentacoes = ({match}) => {        
    
    const {movimentacoes, salvarNovaMovimentacao, removerMovimentacao} = useMovimentacaoApi(match.params.data)

    

    const salvarMovimentacao = async (dados) => {        
        await salvarNovaMovimentacao(dados)            
        movimentacoes.refetch()
        //infoMes.refetch()                
    }

    const excluirMovimentacao = async(id) => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)        
        movimentacoes.refetch()
        //infoMes.refetch()
    }    

    if (movimentacoes.loading) {
        return <div className='container'><span>Carregando...</span></div>
    }

    if (movimentacoes.error === 'Permission denied') {
        return <Redirect to='/login'></Redirect>
    }

    return(        
      <div className='container'>
        <h2>Movimentações</h2>
        <InfoMes data={match.params.data} />        
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
            {
                movimentacoes.data &&
                Object
                .keys(movimentacoes.data)
                .map(mov => {
                return(
                    <tr key={mov}>                    
                        <td>{movimentacoes.data[mov].descricao}</td>
                        <td>
                            {movimentacoes.data[mov].valor} {'  '}
                            <button className='btn btn-danger' onClick={() => excluirMovimentacao(mov)}>-</button>
                        </td>                           
                    </tr>                    
                )
                })                
            }
            {
                !movimentacoes.data &&
                <span>Não existem movimentações nesse período</span>
            }
            <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
            
            </tbody>
        </table>        
      </div>
    )
}

export default Movimentacoes


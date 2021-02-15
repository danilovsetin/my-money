import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-e3011-default-rtdb.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const Movimentacoes = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [postDelete, remover]  = useDelete()
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')

    const onChangeValor = (evt) => {
        setValor(evt.target.value)
    }

    const onChangeDescricao = (evt) => {
        setDescricao(evt.target.value)
    }

    const salvarMovimentacao = async () => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor('')
            data.refetch()
        }        
    }

    const excluirMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.data}/${id}`)        
        data.refetch()
    }

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
                        <td>
                            {data.data[mov].valor} {'  '}
                            <button className='btn btn-danger' onClick={() => excluirMovimentacao(mov)}>-</button>
                        </td>                           
                    </tr>                    
                )
                })                
            }
            {
                !data.data &&
                <span>Não existem movimentações nesse período</span>
            }
                <tr>
                    <td>
                        <input type='text' value={descricao} onChange={onChangeDescricao} />
                    </td>
                    <td>
                        <input type='text' value={valor} onChange={onChangeValor} />
                        <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
                    </td>
                </tr>
            </tbody>
        </table>        
      </div>
    )
}

export default Movimentacoes


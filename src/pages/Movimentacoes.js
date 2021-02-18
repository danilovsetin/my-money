import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-e3011-default-rtdb.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movimentacoes = ({match}) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [postDelete, remover]  = useDelete()
    const [dataPatch, patch]  = usePatch()
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
            dataMeses.refetch()
        }        
    }

    const excluirMovimentacao = async(id) => {
        await remover(`movimentacoes/${match.params.data}/${id}`)        
        data.refetch()
        dataMeses.refetch()
    }

    const alterarPrevisaoEntrada = (evt) => {
        if (evt.target.value) {
            patch(`meses/${match.params.data}`, {previsao_entradas: evt.target.value})
            setTimeout(() => {
                dataMeses.refetch()
            },2000)
        }                
    }

    const alterarPrevisaoSaida = (evt) => {
        if (evt.target.value) {
            patch(`meses/${match.params.data}`, {previsao_saidas: evt.target.value})
            setTimeout(() => {
                dataMeses.refetch()
            },2000)
        }
        
    }

    if (data.loading) {
        return <div className='container'><span>Carregando...</span></div>
    }
    return(        
      <div className='container'>
        <h2>Movimentações</h2>
        {
            !dataMeses.loading && dataMeses.data &&
            <div>
            Previsão Entradas: {dataMeses.data.previsao_entradas} <input type="text" onBlur={alterarPrevisaoEntrada}  /> / Previsão Saídas: {dataMeses.data.previsao_saidas} <input type="text" onBlur={alterarPrevisaoSaida}  /><br />
            Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
            </div>
        }
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


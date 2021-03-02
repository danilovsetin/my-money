import React, { useState } from 'react'

const AdicionarMovimentacao = ({salvarNovaMovimentacao}) => {
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
            await salvarNovaMovimentacao({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor('')
        }
    }

    return (
        <tr>
            <td>
                <input type='text' value={descricao} onChange={onChangeDescricao} />
            </td>
            <td>
                <input type='text' value={valor} onChange={onChangeValor} />
                <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
            </td>
        </tr>
    )
}

export default AdicionarMovimentacao
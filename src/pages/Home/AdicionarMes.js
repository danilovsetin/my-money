import React, { useState, useRef } from 'react'
import {Redirect} from 'react-router-dom'

const AdicionarMes = () => {
    const refAno = useRef()
    const refMes = useRef()
    const [redir, setRedir] = useState('')

    const anoMin = 2019
    const anoMax = 2022
    const anos = []
    const meses = []

    for(var i = anoMin; i <= anoMax; i++){
        anos.push(i)                
    }

    for(var i = 1; i <= 12; i++){
        meses.push(i)                
    }

    const zeroPad = mes => {
        if (mes < 10){
            return '0'+mes
        }
        return mes
    }

    const verMes = () => {
        setRedir(refAno.current.value + '-' + refMes.current.value)
    }
    if(redir !== ''){
        return <Redirect to={'movimentacoes/'+redir} />
    }
    return (
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select ref={refAno}>
                {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}                
            </select>
            <select ref={refMes}>
                {meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)}                                
            </select>
            <button onClick={verMes}>Adicionar mês</button>
        </React.Fragment>
    )
}

export default AdicionarMes
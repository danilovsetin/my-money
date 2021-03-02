import React from 'react'
import { useMesApi } from '../../api'

const InfoMes = ({data}) => {
    const { infoMes, alterarMes } = useMesApi(data)

    const alterarPrevisaoEntrada = (evt) => {
        if (evt.target.value) {
            alterarMes({previsao_entradas: evt.target.value})
            setTimeout(() => {
                infoMes.refetch()
            },2000)
        }                
    }

    const alterarPrevisaoSaida = (evt) => {
        if (evt.target.value) {
            alterarMes({previsao_saidas: evt.target.value})
            setTimeout(() => {
                infoMes.refetch()
            },2000)
        }
        
    }

    if (infoMes.loading) {
        return <p>Carregando dados do mês...</p>
    }
    if (infoMes.data) {
        return(            
            <div>
                Previsão Entradas: {infoMes.data.previsao_entradas} <input type="text" onBlur={alterarPrevisaoEntrada}  /> / Previsão Saídas: {infoMes.data.previsao_saidas} <input type="text" onBlur={alterarPrevisaoSaida}  /><br />
                Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
            </div>
            
        )
    }

    return null
    
}

export default InfoMes
import React from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-e3011-default-rtdb.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

export const useMesApi = (data) => {
    const infoMes = useGet(`meses/${data}`)
    const [dataPatch, alterarMes]  = usePatch(`meses/${data}`)
    return {infoMes, alterarMes}
}

export const useMovimentacaoApi = (data) => {
    const movimentacoes = useGet(`movimentacoes/${data}`)
    const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`)
    const [postDelete, removerMovimentacao]  = useDelete() 
    return {movimentacoes, salvarNovaMovimentacao, removerMovimentacao}
}


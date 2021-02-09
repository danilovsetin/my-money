import React from 'react'

const AdicionarMes = () => {
    return (
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
            </select>
            <select>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
            </select>
            <button>Adicionar mês</button>
        </React.Fragment>
    )
}

export default AdicionarMes
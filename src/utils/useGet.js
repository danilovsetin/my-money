import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const useGet = url => {
    const reducer = (state, action) => {  
      if(action.type === 'REQUEST'){
        return {
          ...state,
          loading: true
        }
      }
    
      if(action.type === 'SUCCESS'){
        return {
          ...state,
          loading:false,
          data: action.data
        }
      }
      return state
    }
  
    const [data, dispatch] = useReducer(reducer, {
      data: {},
      loading: true
    })
    
  
    useEffect(() => {
      dispatch({type: 'REQUEST'})
      axios
        .get(url)
        .then(res =>
          dispatch({type: 'SUCCESS', data: res.data})
        )
    },[])
  
    return data
  }

  export default useGet
import Cookies from "js-cookie"
import { TODO_FAILURE, TODO_LOADING, TODO_SUCCESS } from "./actiontype"
import axios from 'axios'

export const addEvent=(obj)=>(dispatch)=>{
    const token = Cookies.get('token')||JSON.parse(localStorage.getItem('token'))
    console.log(token,'7')
    const headers = {
        Authorization:`Bearer ${token}`
    }
    dispatch({type:TODO_LOADING})
    axios.post('http://localhost:8000/todo/create',obj,{headers})
    .then((res)=>{
        console.log(res.data)
        dispatch({type:TODO_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:TODO_FAILURE,payload:err})
    })
}

export const getEvent = () => (dispatch) => {
    const token = Cookies.get('token')||JSON.parse(localStorage.getItem('token'))
    console.log(token,'7')
    const headers = {
        Authorization:`Bearer ${token}`
    }
    dispatch({type:TODO_LOADING})
    axios.get('http://localhost:8000/todo/task', { headers })
    .then((res)=>{
        console.log(res.data.msg)
        dispatch({type:TODO_SUCCESS,payload:res.data.msg})
    })
    .catch((err)=>{
        console.log(err.message)
        dispatch({type:TODO_FAILURE})
    })
}

export const deleteEvent = (id) => (dispatch) => {
    const token=Cookies.get('token')||JSON.parse(localStorage.getItem('token'))
    console.log(token,'43')
    const headers={
        Authorization:`Bearer ${token}`
    }
    dispatch({type:TODO_LOADING})
    axios.delete(`http://localhost:8000/todo/tasks/${id}`,{ headers })
    .then((res)=>{
        console.log(res)
        dispatch({type:TODO_SUCCESS})
    })
    .catch(err=>console.log(err.message))
}
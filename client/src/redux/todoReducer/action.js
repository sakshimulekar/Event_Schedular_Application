import Cookies from "js-cookie"
import { TODO_FAILURE, TODO_LOADING, TODO_SUCCESS } from "./actiontype"
import axios from 'axios'
import {toast} from "react-toastify"

//add event
export const addEvent=(obj)=>(dispatch)=>{
    const token = Cookies.get('token')||JSON.parse(localStorage.getItem('token'))
    console.log(token,'7')
    const headers = {
        Authorization:`Bearer ${token}`
    }
    dispatch({type:TODO_LOADING})
    axios.post('http://localhost:8000/todo/create',obj,{headers})
    .then((res)=>{
        console.log(res.data.event)
        const msg = res.data.msg
        if(msg==="Event Added successfully!!"){
            toast('Event Added successfully!!',{style:{fontWeight:'bold',fontSize:'20px',color:"black"}})
        }
        dispatch({type:TODO_SUCCESS,payload:res.data.event})
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:TODO_FAILURE,payload:err})
    })
}

// get event
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

//delete event
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
        const msg = res.data.msg
        if(msg==="Event deleted!!"){
            toast('Event deleted!!',{style:{fontWeight:'bold',fontSize:'20px',color:"black"}})
        }
        dispatch({type:TODO_SUCCESS})
    })
    .catch(err=>console.log(err.message))
}

//edit event
export const editEventData=(id,obj)=>(dispatch)=>{
    console.log(id,61)
    const token=Cookies.get('token')||JSON.parse(localStorage.getItem('token'))
    const headers={
        Authorization:`Bearer ${token}`
    }
    dispatch({type:TODO_LOADING})
    axios.put(`http://localhost:8000/todo/tasks/${id}`,obj,{ headers })
    .then((res)=>{
        console.log(res.data)
        const msg = res.data.msg
        if(msg==="Event updated successfully!!"){
            toast('Event updated successfully!!',{style:{fontWeight:'bold',fontSize:'20px',color:"black"}})
        }
        dispatch({type:TODO_SUCCESS,payload:res.data.updatedTask})
    })
    .catch((err)=>{
        console.log(err)
        dispatch({type:TODO_FAILURE})
    })
}
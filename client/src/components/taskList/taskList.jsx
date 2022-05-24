import axios from 'axios'
import { useEffect, useState } from 'react'
import {  Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import style from './taskList.module.css'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'

const TaskList = ()=>{
    
    const [tasks, setTask] = useState([])
    const navigate = useNavigate()

    const tasksResponse = async()=>{
        await axios.get('http://localhost:3001/task')
        .then(res => {
            setTask(res.data)
        })
    } 
    // console.log(tasksResponse())
    useEffect(()=>{
        tasksResponse()
    },[])

    const handleDelete = async (id)=>{
        await axios.delete(`http://localhost:3001/task/${id}`)
        setTask(tasks.filter(task=> task.id !== id))
    }

    return (
        <>
        <h1>
            Task List
        </h1>
        <Grid container >
            {tasks ?tasks.map(task=>{
                return (
                    <Card key={task.id} variant='outlined' style={{color:'white',backgroundColor:'#262626'}} className= {style.card}>
                        <CardContent >

                            <Typography >Title: {task.title}</Typography>
                            <Typography >Description: {task.description}</Typography>

                            <IconButton onClick={()=>navigate(`/task/${task.id}/edit`)} color='success' arial-label='edit'>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={()=> handleDelete(task.id)} color='error' arial-label='delete'>
                                <DeleteIcon/>
                            </IconButton>
        
                        </CardContent>
                    </Card>
                )
            }):<h1>There isnt tasks</h1>}
        </Grid>
        </>
    )
}

export default TaskList
import { Typography, Grid, Card, CardContent, TextField, Button, Box, CircularProgress } from "@mui/material"
// import SendIcon from '@mui/icons-material/Create'
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';

const Form = ()=>{

    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const params = useParams()

    const handleChange = e =>{
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e=>{
        e.preventDefault()
        setLoading(true)

        if(editing) await axios.put(`http://localhost:3001/task/${params.id}`, task)

        else await axios.post('http://localhost:3001/task', task)
        
        setLoading(false)
            
        await Swal.fire("Done!", "The task was added", "success")
        .then((res)=>{
            if(res.isConfirmed || res.dismiss==='backdrop') navigate('/task')
        })
    }

    const loadTask = async (id)=>{
        const taskLoad = await axios.get(`http://localhost:3001/task/${id}`)
        setTask({title: taskLoad.data.title, description: taskLoad.data.description})
        setEditing(true)
    }

    useEffect(()=>{ 
        if(params.id) loadTask(params.id)
    },[params.id])

    return <>

        <Grid container alignItems='center' justifyContent='center' direction='column' >
            <Grid item xs={3} >
                <Card sx={{mt:5}} style={{ backgroundColor:'#1e272e', padding:'1rem', textAlign:'center'}} >
                    <Typography variant='h5' color='white' >
                        {editing ? 'Editing task' 
                        :'Create new task'
                        }
                    </Typography>
                    <CardContent onSubmit={handleSubmit} >
                        <Box component='form' noValidate autoComplete='off' >

                            <TextField 
                            value={task.title}
                            name='title' 
                            variant='outlined' 
                            label='Title' 
                            onChange={handleChange}
                            sx={{display:'block', margin: '.5rem 0'}} 
                            inputProps={{ style:{color:'white'}}} 
                            InputLabelProps={{ style:{color:'#3b6895'}}}  
                            />

                            <TextField 
                            value={task.description}
                            name='description' 
                            variant='outlined' 
                            label='Description' 
                            onChange={handleChange}
                            fullWidth 
                            multiline 
                            rows={3} 
                            sx={{display:'block', margin: '0.5rem 0'}} 
                            inputProps={{style:{color:'white'}}} 
                            InputLabelProps={{ style:{color:'#3b6895'}}}
                            />

                            <Button color='primary'  variant='contained' type='submit' endIcon={<SaveIcon/>} disabled={ !task.title || !task.description}>
                                {loading ? ( <CircularProgress color='inherit' size={24} /> )
                                :('Save')}
                            </Button>                            

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
    
}

export default Form
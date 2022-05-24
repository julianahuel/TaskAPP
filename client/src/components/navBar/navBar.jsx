import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import style from './navBar.module.css'

function NavBar (){

  const navigate = useNavigate()

  return (
    <Box sx={ {flexGrow: 1}}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>

            <Typography variant='h6' sx={ {flexGrow: 1}}>
              <Link className={style.homeLink} to='/task'> Home </Link>
            </Typography>

            <Button variant='contained' color='primary' onClick={()=>navigate('/task/new')}>
              New Task
            </Button>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default NavBar
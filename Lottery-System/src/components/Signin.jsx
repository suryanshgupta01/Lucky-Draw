import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
const defaultTheme = createTheme();


const Signin = () => {
    const baseURL = "https://lottery-mangement-system-1.onrender.com"
    const [email, setEmail] = useState(localStorage.getItem('email') || '')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [successmessage, setSuccessMessage] = useState('')
    const [errormessage, setErrorMessage] = useState('')
    if (1 == 44) {
        navigate('/')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setErrorMessage('')

            if (!email || !password) {
                setErrorMessage("Any value is missing!")
                return
            }
            axios.post(`${baseURL}/login`, {
                email: email,
                password: password
            }).then(({ data }) => {
                if (data?.isAdmin) {
                    localStorage.setItem('userinfo-Lucky', JSON.stringify(data));
                    window.location.reload()
                    setSuccessMessage("User signed in")
                } else {
                    setErrorMessage("Invalid credentials")
                }
            }).catch((err) => {
                setErrorMessage("Invalid email or password")
                console.log(err)
            })
            // await Signin(name1, email, password)

        } catch (err) {
            setErrorMessage("Something bad has happened")
            console.log(err)
        }
    }
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    }, []);



    return (
        <> <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {successmessage && <Alert variant="filled" severity="success" style={{ marginBottom: '2rem' }}>
                            {successmessage}
                        </Alert>}
                        {errormessage && <Alert variant="filled" severity="error" style={{ marginBottom: '2rem' }}>
                            {errormessage}
                        </Alert>}
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    defaultValue={email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                        <Grid container justifyContent="flex-end">

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>


                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}
export default Signin
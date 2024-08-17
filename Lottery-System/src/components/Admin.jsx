import React, { useState, useEffect } from 'react'
import Avatar1 from './Avatar1'
import Color from './Color'
import Avatar2 from './Avatar2'
import { Button } from '@mui/material'
import axios from 'axios'
import Navbar from './Navbar'

const Admin = () => {
    const [colorResult, setcolorResult] = useState([])
    const [numberResult, setnumberResult] = useState([])
    const start = 29
    const prettifyDate = (time) => {
        const date = new Date(time)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleString('en-US', options)
    }
    const editNumber = (id, val) => {
        // changeInDB("number", id, val)
        axios.post('http://localhost:4000/edit', {
            thing: "number",
            id: Number(id),
            value: val
        })
        setnumberResult(prev => prev.map((num, index) => (index === id ? val : num)))
    }
    const editColor = (id, val) => {
        // changeInDB("color", id, val)
        axios.post('http://localhost:4000/edit', {
            thing: "color",
            id: Number(id),
            value: val
        })
        setcolorResult(prev => prev.map((num, index) => (index == id ? val : num)))
    }
    const getArray = async () => {
        try {
            const response = await fetch('http://localhost:4000/arr')
            const data = await response.json()
            setnumberResult(data.numberArr)
            setcolorResult(data.colorArr)
            console.log(data.numberArr)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const time = ["2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM"]
    const time2 = ["2AM", "6AM", "10AM", "2PM"]
    useEffect(() => {
        getArray()
    }, []);
    const isSmall = window.innerWidth < 500
    return (
        <>
            <Navbar />
            <div>
                <Button variant="contained"
                    sx={{ mt: 3, mb: 2 }} onClick={() => { localStorage.removeItem('userinfo-Lucky'); window.location.reload(); }}>Signout
                </Button>

                <div className='boxes1' >
                    {numberResult.slice(start, start + 16).map((ele, ind) => (
                        <div className='card1' style={{ padding: '1rem', margin: '0.25rem', fontSize: '2rem', fontWeight: '600' }}>{ele}
                            <div style={{ position: 'relative', fontSize: '1rem', borderColor: 'black' }}>
                                {/* <button class="button-35" style={{ backgroundColor: 'transparent' }} role="button"> */}
                                <Avatar1 info={{ ind: ind + start, val: numberResult[ind + start], editNumber: editNumber, date: `${ind < 8 ? prettifyDate(new Date().getTime() + (-1) * 1000 * 24 * 3600) : prettifyDate(new Date().getTime())} ${time[ind % 8]}`, time: time[ind % 8] }} />
                                {/* Edit value</button> */}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                {ind < 8 ? prettifyDate(new Date().getTime() + (-1) * 1000 * 24 * 3600) : prettifyDate(new Date().getTime())} {time[ind % 8]}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='boxes1' >
                    {colorResult.slice(start, start + 8).map((ele, ind) => (
                        <div className='card1' style={{ padding: '1rem', margin: '1rem', fontSize: '2rem', fontWeight: '600' }}><Color colour={ele} />
                            <div style={{ position: 'relative', fontSize: '1rem', borderColor: 'black' }}>
                                {/* <button class="button-35" style={{ backgroundColor: 'transparent' }} role="button"> */}
                                <Avatar1 info={{ iscolor: true, ind: ind + start, val: colorResult[ind + start], editColor: editColor, date: `${ind < 4 ? prettifyDate(new Date().getTime() + (-1) * 1000 * 24 * 3600) : prettifyDate(new Date().getTime())} ${time2[ind % 4]}` }} />
                                {/* Edit value</button> */}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                {ind < 4 ? prettifyDate(new Date().getTime() + (-1) * 1000 * 24 * 3600) : prettifyDate(new Date().getTime())} {time2[ind % 4]}
                                {/* {prettifyDate(new Date().getTime() + (ind - 1) * 1000 * 24 * 3600)} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Admin

import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Color from './Color';
import Avatar1 from './Avatar1';
import Avatar2 from './Avatar2';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'


const LandingPage = () => {

    const [colorResult, setcolorResult] = useState([])
    const [numberResult, setnumberResult] = useState([]);
    const [start, setStart] = useState()
    const [startcolor, setStartcolor] = useState()
    const navigate = useNavigate()
    const time = ["2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM"]
    const time2 = ["2AM", "6AM", "10AM", "2PM"]

    const getArray = async () => {
        try {
            const response = await fetch('http://localhost:4000/arruser')
            const data = await response.json()
            setnumberResult(data.numberArr)
            setcolorResult(data.colorArr)
            localStorage.setItem('colorArr', JSON.stringify(data.colorArr))
            localStorage.setItem('numberArr', JSON.stringify(data.numberArr))
            setStart(data.numberArr.length - 17)
            setStartcolor(data.colorArr.length - 17)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    useEffect(() => {
        getArray()
    }, []);

    return (
        <><div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                <div className=''>
                    <div className='makerow'>
                        <div>
                            <h4>Number Results</h4>
                            <span style={{ color: 'red' }}>You can play this game<br /> between 2am and 4pm everyday</span>
                            <div className='makecol boxes2'>
                                {numberResult.slice(start, start + 16).map((ele, ind) => (
                                    ind > 7 ? null : (
                                        <div className='makecol card1' style={{ justifyContent: 'center', alignItems: 'center', padding: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>
                                            <div className='makerow' style={{ justifyContent: 'center', marginRight: '0.5rem', fontSize: '1rem' }}>
                                                <div>{ind + 1}. ({time[ind]})</div>
                                            </div>
                                            <div className='makerow'>
                                                <div style={{ marginRight: '0.5rem' }} >{numberResult[start + ind]}
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                        Yesterday
                                                    </div>
                                                </div>
                                                <div>{numberResult[start + ind + 8]}
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                        Today
                                                    </div >
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            {/* <Avatar1 info={{ ind: 1, val: yourNumber[1], editNumber: editNumber }} /> */}
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='makerow'>
                        <div>
                            <h4>Color Results</h4>
                            <span style={{ color: 'red' }}>You can play this game<br /> between 2am and 2pm everyday</span>
                            <div className='makecol boxes2'>
                                {colorResult.slice(startcolor, startcolor + 8).map((ele, ind) => (
                                    ind > 3 ? null : (
                                        <div className='makecol card1' style={{ backgroundColor: '#d47328', justifyContent: 'center', alignItems: 'center', padding: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>
                                            <div className='makerow' style={{ justifyContent: 'center', marginRight: '0.5rem', fontSize: '1rem' }}>
                                                <div>{ind + 1}. ({time2[ind]})</div>
                                            </div>
                                            <div className='makerow'>
                                                <div style={{ marginRight: '0.5rem' }} ><Color colour={colorResult[startcolor + ind]} />
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                        Yesterday
                                                    </div>
                                                </div>
                                                <div><Color colour={colorResult[startcolor + ind + 4]} />
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                        Today
                                                    </div >
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* <Avatar1 info={{ iscolor: true, ind: 1, val: yourColor[1], editColor: editColor }} /> */}
                        </div>
                    </div>
                </div>

            </div>
            <div style={{ margin: '2rem', display: 'flex', justifyContent: 'space-around' }} >
                <Button variant="contained"
                    sx={{ mt: 3, mb: 2 }} onClick={() => { navigate('/color-chart') }}>Past color chart
                </Button>
                <Button variant="contained"
                    sx={{ mt: 3, mb: 2 }} onClick={() => { navigate('/number-chart') }}>Past number chart
                </Button>
                {/* <Avatar2 info={{ colorArr: colorResult }} />
                <Avatar2 info={{ numberArr: numberResult }} /> */}
            </div>
            <div>
            </div>
        </div>
        </>
    )
}

export default LandingPage

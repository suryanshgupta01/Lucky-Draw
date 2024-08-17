import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Color from './Color';
import Avatar1 from './Avatar1';
import Avatar2 from './Avatar2';


const LandingPage = () => {

    const [colorResult, setcolorResult] = useState([])
    const [numberResult, setnumberResult] = useState([]);
    const start = 29
    const time = ["2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM"]
    const time2 = ["2AM", "6AM", "10AM", "2PM"]

    const getArray = async () => {
        try {
            const response = await fetch('http://localhost:4000/arruser')
            const data = await response.json()
            setnumberResult(data.numberArr)
            setcolorResult(data.colorArr)
            console.log(data.numberArr)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    useEffect(() => {
        getArray()
    }, []);

    const isSmall = window.innerWidth < 500
    console.log(window.innerWidth, isSmall)
    return (
        <><div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: !isSmall ? '3rem' : '1.5rem', gap: '2rem' }}>
                <div className=''>
                    <div className='makerow'>
                        <div>
                            <h4>Number Results</h4>
                            <span style={{ color: 'red' }}>You can play this game<br /> between 2am and 4pm everyday</span>
                            <div className='makerow' style={{ justifyContent: 'center', display: 'grid', gridTemplateColumns: window.innerWidth > 500 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', gap: '1rem' }}>
                                {numberResult.slice(start, 45).map((ele, ind) => (
                                    ind > 7 ? null : (
                                        <div className='makecol card1' style={{ display: 'flex', flexDirection: 'row', padding: '1rem', fontSize: '2rem', fontWeight: '600' }}>
                                            <div>{numberResult[start + ind]}
                                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                    Yesterday
                                                </div>
                                            </div>
                                            <div>{numberResult[start + ind + 8]} <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                Today
                                            </div >
                                                <div style={{ fontSize: '1.5rem' }}>
                                                    {time[ind]}
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
                            <div className='makerow' style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 500 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', gap: '1rem' }}>
                                {colorResult.slice(start, 45).map((ele, ind) => (
                                    ind > 3 ? null : (
                                        <div className='makecol card1' style={{ display: 'flex', backgroundColor: '#d47328', flexDirection: 'row', padding: '1rem', fontSize: '2rem', fontWeight: '600' }}>
                                            <div>
                                                <Color colour={colorResult[start + ind]} />
                                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                    Yesterday
                                                </div>
                                            </div>
                                            <div><Color colour={colorResult[start + ind + 4]} />
                                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                    Today
                                                </div>
                                                <div style={{ fontSize: '1.5rem' }}>
                                                    {time2[ind]}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}

                            </div>
                            {/* <Avatar1 info={{ iscolor: true, ind: 1, val: yourColor[1], editColor: editColor }} /> */}
                        </div>
                        {/* <div style={{ width: '5px', backgroundColor: 'black', height: '250px' }}></div> */}
                        {/* <div>
                            <h4>Official color</h4>
                            <div className='makerow'>
                            {colorResult.map((ele, ind) => (
                                <div className='makecol' style={{ padding: '1rem', fontSize: '2rem', fontWeight: '600' }}>
                                <Color colour={ele} />
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                            {ind == 0 ? 'Yesterday' : 'Today'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div> */}
                    </div>
                </div>

            </div>
            <div style={{ margin: '2rem', display: 'flex', justifyContent: 'space-around' }} >
                <Avatar2 info={{ colorArr: colorResult }} />
                <Avatar2 info={{ numberArr: numberResult }} />
            </div>
            <div>

                {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginLeft: '3rem', display: 'none' }} >
                    {users.map((ele, _) => (
                        <div className='card1' style={{ padding: '0.25rem', margin: '4rem', fontSize: '2rem', fontWeight: '600' }}>
                            <div>{ele?.name}</div><hr style={{ height: '5px', backgroundColor: 'black', width: '104.5%', marginLeft: '-4px' }} />
                            <div>
                                {ele?.numbers.map((ele1, ind) => (
                                    <div className='makerow' style={{ padding: '0.25rem', fontSize: '2rem', fontWeight: '600' }}>{ele1}
                                        <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                            {ind == 0 ? 'Yesterday' : 'Today'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {ele?.colors.map((ele, ind) => (
                                    <div className='makerow' style={{ padding: '0.25rem', fontSize: '2rem' }}><Color colour={ele} /><div style={{ fontSize: '1rem', fontWeight: '600' }}>{ind == 0 ? 'Yesterday' : 'Today'}</div></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
        </>
    )
}

export default LandingPage

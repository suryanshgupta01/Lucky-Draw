import React from 'react'
import Color from './Color'
import Navbar from './Navbar'

const NumberChart = () => {
    const numberArr = JSON.parse(localStorage.getItem('numberArr')) || []
    const time2 = ["2AM", "6AM", "10AM", "2PM"].reverse()
    const time = ["2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM"]

    const prettifyDate = (i, parts) => {
        const time = new Date('09-01-2024').getTime() + (i) * 3600 * 24 * 1000;
        const date = new Date(time)
        const options = { month: 'short', day: 'numeric' }
        return date.toLocaleString('en-US', options)
    }
    return (
        <div>
            <Navbar />
            <h1>Past number chart</h1>
            <div style={{ maxHeight: '100vh', overflowY: 'auto', textAlign: 'center' }}>

                <table className="table table-hover table-striped" >
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Date</th>
                            {time.map((ele, i) => (
                                <th scope="col" key={i}>{ele}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.floor((numberArr?.length - 1) / 8) - 6 }).map((_, i) => (
                            <tr>
                                <td>{prettifyDate(i, 8)}</td>
                                {Array.from({ length: 8 }).map((_, ind) => {
                                    return (<td><strong>{numberArr?.slice(53, (numberArr?.length - 1))[i * 8 + ind]}</strong></td>)
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NumberChart

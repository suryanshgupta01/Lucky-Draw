import React from 'react'
import Color from './Color'
import Navbar from './Navbar'

const ColorChart = () => {
    const colorArr = JSON.parse(localStorage.getItem('colorArr')) || []
    const time2 = ["2AM", "6AM", "10AM", "2PM"]
    const prettifyDate = (i, parts) => {
        const time = new Date('09-01-2024').getTime() + (i) * 3600 * 24 * 1000;
        const date = new Date(time)
        const options = { month: 'short', day: 'numeric' }
        return date.toLocaleString('en-US', options)
    }
    return (
        <div>
            <Navbar />
            <h1>Past color chart</h1>
            <div style={{ maxHeight: '100vh', overflowY: 'auto', textAlign: 'center' }}>

                <table className="table table-hover table-striped" >
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Date</th>
                            {time2.map((ele, i) => (
                                <th scope="col" key={i}>{ele}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.floor((colorArr?.length - 7 - 40 - 16) / 4) }).map((_, i) => (
                            <tr>
                                <td>{prettifyDate(i, 4)}</td>
                                {Array.from({ length: 4 }).map((_, ind) => {
                                    return (<td><Color colour={colorArr?.slice(40, (colorArr?.length - 7 - 16))[i * 4 + ind + 1]} /></td>)
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ColorChart

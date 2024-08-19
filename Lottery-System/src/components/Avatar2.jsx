import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Color from './Color';

export default function Avatar2({ info }) {
    const [open, setOpen] = useState(false);
    const time = ["2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM"].reverse()
    const time2 = ["2AM", "6AM", "10AM", "2PM"].reverse()
    const prettifyDate = (i, parts) => {
        const time = new Date().getTime() - (i + 1) * 3600 * 24 * 1000;
        const date = new Date(time)
        const options = { month: 'short', day: 'numeric' }
        return date.toLocaleString('en-US', options)
    }
    console.log(info?.numberArr?.length)
    if (info.numberArr)
        return (
            <React.Fragment >
                <Button color="primary" onClick={() => setOpen(true)}>
                    Past Number chart
                </Button>
                <Transition in={open} timeout={100}>
                    {(state) => (
                        <Modal
                            keepMounted
                            open={!['exited', 'exiting'].includes(state)}
                            onClose={() => setOpen(false)}
                            slotProps={{
                                backdrop: {
                                    sx: {
                                        opacity: 0,
                                        backdropFilter: 'none',
                                        transition: `opacity 400ms, backdrop-filter 400ms`,
                                        ...{
                                            entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                            entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        }[state],
                                    },
                                },
                            }}
                            sx={{
                                visibility: state === 'exited' ? 'hidden' : 'visible',
                            }}
                        >
                            <ModalDialog
                                sx={{
                                    opacity: 0,
                                    width: '70vw',
                                    transition: `opacity 300ms`,
                                    ...{
                                        entering: { opacity: 1 },
                                        entered: { opacity: 1 },
                                    }[state],
                                }}
                            >
                                <DialogTitle>Past Number Result</DialogTitle>
                                <div style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'center' }}>

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
                                            {Array.from({ length: Math.floor((info?.numberArr?.length - 9) / 8) }).map((_, i) => (
                                                <tr>
                                                    <td>{prettifyDate(i, 8)}</td>
                                                    {Array.from({ length: 8 }).map((_, ind) => {
                                                        return (<td><strong>{info?.numberArr?.slice(0, (info?.numberArr?.length - 9)).reverse()[i * 8 + ind]}</strong></td>)
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ModalDialog>
                        </Modal>
                    )}
                </Transition>
            </React.Fragment>
        )
    else return (
        <>
            <React.Fragment >
                <Button color="primary" onClick={() => setOpen(true)}>
                    Past Color Chart
                </Button>
                <Transition in={open} timeout={100}>
                    {(state) => (
                        <Modal
                            keepMounted
                            open={!['exited', 'exiting'].includes(state)}
                            onClose={() => setOpen(false)}
                            slotProps={{
                                backdrop: {
                                    sx: {
                                        opacity: 0,
                                        backdropFilter: 'none',
                                        transition: `opacity 400ms, backdrop-filter 400ms`,
                                        ...{
                                            entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                            entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        }[state],
                                    },
                                },
                            }}
                            sx={{
                                visibility: state === 'exited' ? 'hidden' : 'visible',
                            }}
                        >
                            <ModalDialog
                                sx={{
                                    opacity: 0,
                                    width: '40vw',
                                    transition: `opacity 300ms`,
                                    ...{
                                        entering: { opacity: 1 },
                                        entered: { opacity: 1 },
                                    }[state],
                                }}
                            >
                                <DialogTitle>Past Color Result</DialogTitle>
                                <div style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'center' }}>

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
                                            {Array.from({ length: Math.floor((info?.colorArr?.length - 9 - 4) / 4) }).map((_, i) => (
                                                <tr>
                                                    <td>{prettifyDate(i, 4)}</td>
                                                    {Array.from({ length: 4 }).map((_, ind) => {
                                                        return (<td><Color colour={info?.colorArr?.slice(0, (info?.colorArr?.length - 9 - 4)).reverse()[i * 4 + ind]} /></td>)
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ModalDialog>
                        </Modal>
                    )}
                </Transition>
            </React.Fragment>
        </>
    )
}
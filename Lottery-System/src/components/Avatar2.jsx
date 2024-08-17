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
        const time = new Date().getTime() - parseInt(i / parts) * 3600 * 24 * 1000;
        const date = new Date(time)
        const options = { month: 'short', day: 'numeric' }
        return date.toLocaleString('en-US', options)
    }
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
                                    width: '40vw',
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
                                                <th scope="col">#</th>
                                                {Array.from({ length: 37 }).map((_, i) => (
                                                    <th scope="col" key={i}>{prettifyDate(i, 8)} ({time[i % 8]})</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Number </td>
                                                {info?.numberArr?.slice(0, 37).reverse().map((num, ind) => (
                                                    <td><strong>{num}</strong></td>
                                                ))}
                                            </tr>
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
                                                <th scope="col">#</th>
                                                {Array.from({ length: 33 }).map((_, i) => (
                                                    <th scope="col" key={i}>{prettifyDate(i, 4)} ({time2[i % 4]})</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Color </td>
                                                {info?.colorArr?.slice(0, 33).reverse().map((num) => (
                                                    <td><Color colour={num} /></td>
                                                ))}
                                            </tr>
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
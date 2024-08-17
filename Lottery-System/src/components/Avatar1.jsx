import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Color from './Color';

export default function Avatar1({ info }) {
    const [open, setOpen] = useState(false);
    const [val, setval] = useState(info.val)
    const [isGray, setisGray] = useState(false);
    const [isRed, setisRed] = useState(false);
    const [isBlue, setisBlue] = useState(false);
    const start = 29

    const handleSubmit = (value) => {
        const ind = localStorage.getItem('colorind') || 0
        info.editColor(ind, value);
    }

    if (!info.iscolor)
        return (
            <React.Fragment >
                <Button color="success" onClick={() => setOpen(true)}>
                    Edit value
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
                                <DialogTitle>Update value for {info.date}</DialogTitle>
                                <div style={{ height: '15vh', alignItems: 'center', display: 'flex' }}>
                                    <input type="range" id="val" name="val" min="1" style={{ width: '70%', marginRight: '2rem' }} max="100" value={val} step="1" onChange={(e) => setval(e.target.value)} />
                                    <label for="val">Value : {val} </label>
                                </div>

                                <DialogContent>
                                    <Button color="danger" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={() => { console.log(info.ind, val); info.editNumber(info.ind, val); setOpen(false) }}>
                                        Save
                                    </Button>
                                </DialogContent>

                            </ModalDialog>
                        </Modal>
                    )}
                </Transition>
            </React.Fragment>
        )
    else {
        const col = info.val
        useEffect(() => {
            console.log(col)
            // setisBlue(false); setisRed(false); setisGray(false);
            if (col == 'red') { setisRed(true); setisBlue(false); setisGray(false) }
            else if (col == 'blue') { setisBlue(true); setisGray(false); setisRed(false); }
            else { setisGray(true); setisBlue(false); setisRed(false); }
        }, []);
        return (
            <React.Fragment >
                <Button color="success" onClick={() => setOpen(true)}>
                    Edit color
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
                                    width: '30vw',
                                    transition: `opacity 300ms`,
                                    ...{
                                        entering: { opacity: 1 },
                                        entered: { opacity: 1 },
                                    }[state],
                                }}
                            >
                                <DialogTitle>Update value for {info.date}</DialogTitle>


                                <div class="radio-inputs" >
                                    <form
                                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}
                                        onChange={(e) => {
                                            localStorage.setItem('color', e.target.value);

                                            if (e.target.value === 'red') {
                                                setisRed(true);
                                                setisBlue(false);
                                                setisGray(false);
                                            } else if (e.target.value === 'blue') {
                                                setisBlue(true);
                                                setisGray(false);
                                                setisRed(false);
                                            } else {
                                                setisGray(true);
                                                setisBlue(false);
                                                setisRed(false);
                                            }

                                        }}
                                    >

                                        <label>
                                            <input
                                                class="radio-input"
                                                type="radio"
                                                id={`gray-${info.ind}`}
                                                name="color"
                                                value="gray"
                                                checked={isGray}
                                            />
                                            <span class="radio-tile">
                                                <span class="radio-label">
                                                    {/* <div style={{ backgroundColor: isGray ? 'black' : 'orange', borderRadius: '50%', width: '50px', height: '50px' }}> */}
                                                    <Color colour="gray" />
                                                    {/* </div> */}
                                                </span>
                                            </span>
                                        </label>

                                        <label>
                                            <input
                                                class="radio-input"
                                                type="radio"
                                                id={`red-${info.ind}`}
                                                name="color"
                                                value="red"
                                                checked={isRed}
                                            />
                                            <span class="radio-tile">
                                                <span class="radio-label">
                                                    {/* <div style={{ backgroundColor: isRed ? 'black' : 'orange', borderRadius: '50%', width: '50px', height: '50px' }}> */}
                                                    <Color colour="red" />
                                                    {/* </div> */}
                                                </span>
                                            </span>
                                        </label>

                                        <label>
                                            <input
                                                class="radio-input"
                                                type="radio"
                                                id={`blue-${info.ind}`}
                                                name="color"
                                                value="blue"
                                                checked={isBlue}
                                            />
                                            <span class="radio-tile">
                                                <span class="radio-label">
                                                    {/* <div style={{ backgroundColor: isBlue ? 'black' : 'orange', borderRadius: '50%', width: '50px', height: '50px' }}> */}
                                                    <Color colour="blue" />
                                                    {/* </div> */}
                                                </span>
                                            </span>
                                        </label>
                                    </form>
                                </div>
                                <DialogContent >
                                    <Button color="danger" onClick={() => setOpen(false)} style={{ width: '100%' }}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" style={{ width: '100%' }} onClick={() => { console.log(info.ind, val); info.editColor(info.ind, localStorage.getItem('color')); setOpen(false) }}>
                                        Save
                                    </Button>
                                </DialogContent>

                            </ModalDialog>
                        </Modal>
                    )}
                </Transition>
            </React.Fragment >
        )
    }
}
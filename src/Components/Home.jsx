import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { addUser, deleteUser, editUser } from "../redux/studentSlice";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Stack, Box, Typography, fabClasses } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
export default function Home() {
    const studentData = useSelector((state) => state.student.students);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [data, setData] = useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const student = {
            name,
            email,
            age,
        };
        dispatch(addUser(student));
        setName("");
        setEmail("");
        setAge("");
        setOpen(false);
    };
    const handleDelete = (index) => {
        dispatch(deleteUser(index));
    };

    const handleEdit = (index) => {
        setData({ ...studentData[index], index });
        setEdit(true);
    };

    const handleUpdate = () => {
        dispatch(editUser(data));
        setEdit(false);
    };

    return (
        <div>
            <Button
                sx={{ margin: 4 }}
                variant="outlined"
                onClick={handleClickOpen}
            >
                Add
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Student Form</DialogTitle>
                <DialogContent>
                    <Stack p={1} spacing={2}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <TextField
                            label="Email"
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            label="Age"
                            type="number"
                            name="age"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Save</Button>

                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Stack>
                {studentData.map((student, index) => {
                    return (
                        <Box m={2} key={index}>
                            <Typography>{student.name}</Typography>
                            <Button onClick={() => handleEdit(index)}>
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(index)}>
                                Delete
                            </Button>
                        </Box>
                    );
                })}
            </Stack>

            <Dialog
                open={edit}
                onClose={() => setEdit(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Edit Form</DialogTitle>
                <DialogContent>
                    <Stack p={1} spacing={2}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                            value={data.name}
                        />
                        <TextField
                            label="Email"
                            type="text"
                            name="email"
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            value={data.email}
                        />
                        <TextField
                            label="Age"
                            type="number"
                            name="age"
                            onChange={(e) =>
                                setData({ ...data, age: e.target.value })
                            }
                            value={data.age}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate}>Edit</Button>

                    <Button onClick={() => setEdit(false)} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

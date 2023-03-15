import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    students: [],
};
const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.students.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.students.splice(action.payload, 1);
        },
        editUser: (state, action) => {
            const { name, email, age, index } = action.payload;

            state.students[index].name = name;
            state.students[index].email = email;
            state.students[index].age = age;
        },
    },
});
export const { addUser, deleteUser, editUser } = studentSlice.actions;
export default studentSlice.reducer;

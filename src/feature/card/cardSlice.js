import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    card: []
}
export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.card.push(action.payload)
        },
        editCard: (state, action) => {

           state.card= state.card.map(item => {
                if (item.id === action.payload.id) {
                    return item = action.payload
                }
                return item
            })
        },
        deleteCard: (state, action) => {
            state.card = state.card.filter((item) => {
                if (item.id === action.payload) {
                    return false
                }
                return true
            })
        }
        ,
        retreiveCard: (state, action) => {
            state.card = action.payload
        }

    }
})
export const { addCard, deleteCard, retreiveCard, editCard } = cardSlice.actions;
export default cardSlice.reducer;
/*


*/
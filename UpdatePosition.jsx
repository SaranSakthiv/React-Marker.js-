import { createSlice } from "@reduxjs/toolkit";
//slice positions...
 export const UpdatePosition = createSlice({
    name:'updateData',
    initialState:{value:[{MarkerName:"",
    Top:0,
    Left:0,
    Height:0,
    Width:0,
    color:""
}]
},
reducers:{
    update:(state,action)=>{
        state.initialState= action.payload;
    }
}
})
export default UpdatePosition.reducer;
export const{update}=UpdatePosition.actions;
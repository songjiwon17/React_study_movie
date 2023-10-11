import { useState } from "react";

function FileInput({name, value, onChange}){
    const handleChange = (e)=>{
        const nextValue = e.target.files;
        onChange(name, nextValue);
    }

    return <input type="file" onChange={handleChange}/>
}
export default FileInput;
import { useRef, useState } from "react";

function FileInput({name, value, onChange}){
    const inputRef = useRef();

    const handleChange = (e)=>{
        const nextValue = e.target.files;
        onChange(name, nextValue);
    }

    const handleClearClick = ()=>{
        const inputNode = inputRef.current;
        if(!inputNode) return;

        inputNode.value = '';
        onChange(name, null);
    }

    return(
        <div>
            <input type="file" onChange={handleChange} ref={inputRef}/>
            {value && <button onClick={handleClearClick}>초기화</button>}
        </div>
    ) 
}
export default FileInput;
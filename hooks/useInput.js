import React, {useState} from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (text) =>{
        setValue(text);
        console.log("value:"+value);
    };
    return {value,onChange,setValue};
}

export default useInput;
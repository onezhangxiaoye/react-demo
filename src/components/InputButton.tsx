import React, {useState, useEffect} from 'react';

interface InputButtonProps {
    save: Function
    cleanInput: boolean
    editValue: string
}

export default function InputButton({save, cleanInput, editValue}: InputButtonProps) {
    const [inputValue, setInputValue] = useState('');

    function getInputValue(event: any) {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        setInputValue(editValue);
    }, [editValue])

    function saveValue() {
        save(inputValue);
        cleanInput && setInputValue('');
    }

    return (
        <>
            <input type="text" value={inputValue} onInput={getInputValue}/>
            <button onClick={saveValue}>保存</button>
        </>
    );
}

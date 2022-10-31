import { FC, useReducer } from 'react';
import { Props } from './Checkbox.types';
// import styles from './'


export const Checkbox: FC<Props> = (
    {
        disabled = false,
        form,
        id,
        name,
        required = false,
        value,
        label,
        isInitialChecked = false,
        onChange,
    }
) => {
    const [isChecked, toggleChecked] = useReducer(isChecked => !isChecked, isInitialChecked);

    const handleOnChange = () => {
        toggleChecked();
        if (onChange) {
            onChange();
        };
    };

    return (
        <>
            <label htmlFor={id} className='checkbox_label option'>
                <input
                    checked={isChecked}
                    className='checkbox_input'
                    disabled={disabled}
                    form={form}
                    id={id}
                    name={name}
                    required={required}
                    type='checkbox'
                    value={value}
                    onChange={handleOnChange}
                />
                {label}
            </label>
        </>
    )
};
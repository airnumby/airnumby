import React from 'react'
import { Controller } from 'react-hook-form';
import Select, { createFilter } from 'react-select'

interface Props {
    name: string
    control: any
    options: any[]
    onChange?: (valueObject: any) => void
}

export default function SearchSelect(props: Props) {
    return <Controller
        control={props.control}
        name={props.name}
        render={controlProps => {
            const { field: { onChange, onBlur } } = controlProps;
            const handleChange = (valueObject: any) => {
                if (props.onChange) {
                    props.onChange(valueObject)
                }
                onChange(valueObject.value);
            }

            return <Select options={props.options}
                filterOption={createFilter({ ignoreAccents: false })}
                isSearchable={true}
                className="flex-2 text-dark p-0"
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--bs-primary)'
                    }
                })}
                onChange={handleChange}
                onBlur={onBlur}
            />
        }} />
}

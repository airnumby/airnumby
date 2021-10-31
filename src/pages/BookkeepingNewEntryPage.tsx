import React from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select'
import SideNavbar from '../components/SideNavbar';
import { useCharts } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext';
import { getTodayInputValue } from '../utils/date';

interface AccountFormInput {
    account: string,
    credit: number,
    debit: number
}

interface FormInput {
    description: string,
    bookingDate: Date | string,
    accounts: AccountFormInput[]
}

export default function BookkeepingNewEntryPage() {
    const charts = useCharts();
    const text = useText();
    const { register, handleSubmit, control } = useForm<FormInput>({
        defaultValues: {
            bookingDate: getTodayInputValue(),
            accounts: [
                {}
            ]
        }
    });
    const { fields, append } = useFieldArray({
        control,
        name: 'accounts',
    });

    const accounts = Object.keys(charts.accounts);

    const onSubmit: SubmitHandler<FormInput> = data => {
        console.log('This should like safe stuff', data);
    }

    const options = accounts.map(accountNumber => ({
        value: accountNumber,
        label: `${accountNumber} - ${charts.accounts[accountNumber].name}`
    }))

    return (
        <div className="d-flex h-100 text-light">
            <SideNavbar />
            <div className="flex-1 d-flex flex-column container" >
                <h2 className="mt-3">{text.newEntry}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">{text.description}</label>
                        <input type="text" className="form-control" {...register('description')} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{text.bookingDate}</label>
                        <input type="date" className="form-control"
                            {...register('bookingDate', { valueAsDate: true })} />
                    </div>
                    <div>
                        <table className="text-light mb-3">
                            <tbody>
                                <tr>
                                    <th scope="col">{text.account}</th>
                                    <th scope="col">{text.debit}</th>
                                    <th scope="col">{text.credit}</th>
                                </tr>
                                {fields.map((field, index) => (
                                    <tr key={field.id} >
                                        <td>
                                            <Controller
                                                control={control}
                                                name={`accounts.${index}.account`}
                                                render={controlProps => {
                                                    const { field: { onChange, onBlur } } = controlProps;
                                                    const handleChange = (valueObject: any) => {
                                                        if (index === fields.length - 1) {
                                                            append({}, { shouldFocus: false });
                                                        }
                                                        onChange(valueObject.value);
                                                    }

                                                    return <Select options={options}
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
                                        </td>
                                        <td className="w-25">
                                            <input type="number" className="form-control flex-1 bg-ligth"
                                                min="0"
                                                {...register(`accounts.${index}.debit`, { valueAsNumber: true })} />
                                        </td>
                                        <td className="w-25">
                                            <input type="number" className="form-control flex-1 bg-ligth"
                                                min="0"
                                                {...register(`accounts.${index}.credit`, { valueAsNumber: true })} />
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td><input type="number" className="form-control flex-1 " disabled={true} /></td>
                                    <td className="w-25"><input type="number" className="form-control flex-1 " disabled={true} /></td>
                                    <td className="w-25"><input type="number" className="form-control flex-1" disabled={true} /></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <button type="submit" className="btn btn-primary">{text.save}</button>
                </form>
            </div>
        </div>
    )
}

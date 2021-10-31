import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select'
import SideNavbar from '../components/SideNavbar';
import { useCharts } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext';
import { getTodayInputValue } from '../utils/date';

interface FormInput {
    description: string,
    bookingDate: Date | string,
}

export default function BookkeepingNewEntryPage() {
    const charts = useCharts();
    const text = useText();
    const { register, handleSubmit } = useForm<FormInput>({
        defaultValues: {
            bookingDate: getTodayInputValue()
        }
    });

    const accounts = Object.keys(charts.accounts);

    const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

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
                        <div className="d-flex">
                            <label className="form-label flex-2">{text.account}</label>
                            <label className="form-label flex-1">{text.debit}</label>
                            <label className="form-label flex-1">{text.credit}</label>
                        </div>
                        <div className="d-flex">
                            <Select options={options}
                                filterOption={createFilter({ ignoreAccents: false })}
                                isSearchable={true}
                                className="flex-2 text-dark"
                                theme={theme => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'var(--bs-primary)'
                                    }
                                })}
                            />

                            <input type="number" className="form-control flex-1" />
                            <input type="number" className="form-control flex-1" />
                        </div>
                        <div className="d-flex">
                            <input type="number" className="form-control flex-2" disabled={true} />
                            <input type="number" className="form-control flex-1" disabled={true} />
                            <input type="number" className="form-control flex-1" disabled={true} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">{text.save}</button>
                </form>
            </div>
        </div>
    )
}

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
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

    const accounts = Array.from(charts.accounts.keys());

    const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

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
                        <div className="d-flex mb-3">
                            <select className="selectpicker flex-2">
                                <option>Mustard</option>
                                <option>Ketchup</option>
                                <option>Relish</option>
                            </select>

                            <input type="number flex-1" className="form-control" />
                            <input type="number flex-1" className="form-control" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">{text.save}</button>
                </form>
            </div>
        </div>
    )
}

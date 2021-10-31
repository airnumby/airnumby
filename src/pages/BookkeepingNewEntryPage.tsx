import { addDoc, collection } from '@firebase/firestore';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import SearchSelect from '../components/SearchSelect';
import SideNavbar from '../components/SideNavbar';
import { useCharts, useOrganization } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext';
import { useDb } from '../hooks/firebaseHooks';
import JournalEntry from '../models/JournalEntry';
import { getTodayInputValue } from '../utils/date';
import { toFirebaseDoc } from '../utils/firebase';

interface AccountFormInput {
    account: string,
    credit: number,
    debit: number
}

interface FormInput {
    description: string,
    bookingDate: Date | string,
    records: AccountFormInput[]
}

export default function BookkeepingNewEntryPage() {
    const charts = useCharts();
    const text = useText();
    const organization = useOrganization();
    const db = useDb();

    const { register, handleSubmit, control } = useForm<FormInput>({
        defaultValues: {
            bookingDate: getTodayInputValue(),
            records: [
                {}
            ]
        }
    });
    const { fields, append } = useFieldArray({
        control,
        name: 'records',
    });

    const accounts = Object.keys(charts.accounts);

    const onSubmit: SubmitHandler<FormInput> = async data => {
        const nonEmptyRecords = data.records.filter(record => record.credit || record.debit)

        const newEntry: JournalEntry = {
            description: data.description,
            created: new Date(),
            bookingDate: new Date(data.bookingDate),
            records: nonEmptyRecords.map(record => ({
                account: record.account,
                credit: record.credit || 0,
                debit: record.debit || 0
            }))
        }

        await addDoc(collection(db, 'organizations', organization?.id || '', 'journalEntries'), toFirebaseDoc(newEntry));
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
                                            <SearchSelect
                                                control={control}
                                                name={`records.${index}.account`}
                                                options={options}
                                                onChange={() => index === fields.length - 1 && append({}, { shouldFocus: false })}
                                            />
                                        </td>
                                        <td className="w-25">
                                            <input type="number" className="form-control flex-1 bg-ligth"
                                                min="0"
                                                {...register(`records.${index}.debit`, { valueAsNumber: true })} />
                                        </td>
                                        <td className="w-25">
                                            <input type="number" className="form-control flex-1 bg-ligth"
                                                min="0"
                                                {...register(`records.${index}.credit`, { valueAsNumber: true })} />
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

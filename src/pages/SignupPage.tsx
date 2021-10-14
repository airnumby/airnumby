import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useText } from '../contexts/TextContext'
import { useDb } from '../hooks/firebaseHooks';
import { Organization } from '../models/Organization';


export default function SignupPage() {
    const text = useText();
    const db = useDb();
    const currentUser = useAuth();
    const emptyOrganization: Organization = {
        owner: currentUser?.id || '',
        name: '',
        orgNum: '',
        country: 'se',
        chartOfAccount: 'bas-2021',
    }
    const [organization, setOrganization] = useState<Organization>(emptyOrganization);
    const [redirect, setRedirect] = useState('');

    const isValid = organization.name && organization.orgNum;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const colRef = collection(db, 'organizations')
        const addedOrg = await addDoc(colRef, organization);

        const userDocRef = doc(db, 'users', currentUser?.id || '');
        await updateDoc(userDocRef, { currentOrganization: addedOrg.id })
        setRedirect('/');
    }


    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div className="center flex-column container">
            <h2>{text.newOrganization}</h2>
            <p>{text.newOrganizationDescription}</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{text.name}</label>
                    <input type="text" className="form-control"
                        value={organization.name}
                        onChange={e => setOrganization({ ...organization, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>{text.orgNum}</label>
                    <input type="text" className="form-control"
                        onChange={e => setOrganization({ ...organization, orgNum: e.target.value })}
                        value={organization.orgNum}
                    />
                </div>

                <button className="btn btn-primary mt-3" disabled={!isValid}>{text.create}</button>
            </form>
        </div>
    )
}

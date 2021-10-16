import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useOrganization } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext'
import { useDb } from '../hooks/firebaseHooks';
import { Organization } from '../models/Organization';


export default function SignupPage() {
    const text = useText();
    const db = useDb();
    const currentUser = useAuth();
    const currentOrg = useOrganization();
    const emptyOrganization: Organization = {
        owner: currentUser?.id || '',
        name: '',
        orgNum: '',
        country: 'se',
        chartOfAccount: 'bas-2021',
    }
    const [organization, setOrganization] = useState<Organization>(emptyOrganization);
    const [redirect, setRedirect] = useState('');
    const [createdOrg, setCreatedOrg] = useState('');

    const isValid = organization.name && organization.orgNum;

    useEffect(() => {
        if (createdOrg && currentOrg?.id === createdOrg) {
            setRedirect('/')
        }
    }, [currentOrg?.id, createdOrg])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const colRef = collection(db, 'organizations')
        const addedOrg = await addDoc(colRef, organization);

        setCreatedOrg(addedOrg.id);
        const userDocRef = doc(db, 'users', currentUser?.id || '');
        await updateDoc(userDocRef, { currentOrganization: addedOrg.id })
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div className="center flex-column container text-light">
            <h2 className="mt-5">{text.newOrganization}</h2>
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

import fs from 'fs';
import { execSync } from 'child_process';
import { setDoc, doc, getFirestore  } from '@firebase/firestore';
// noinspection ES6UnusedImports: Used by the eval below
import * as firebase from '@firebase/app';

// This will run firebase.initializeApp({ ... })
eval(execSync('firebase apps:sdkconfig', {encoding: 'utf8'}))

const seedChart = async (chartId: string, name: string) => {
    const csvData = fs.readFileSync(`./assets/charts/${chartId}.csv`, 'utf8');

    const rows = csvData.split('\n')
    const header = rows.pop()?.split(',')

    console.assert(header?.[0] === 'AccountNumber', `Invalid first column name "${header?.[0]}"`)
    console.assert(header?.[1] === 'AccountName', `Invalid second column name "${header?.[0]}"`)

    const accounts = Object.fromEntries(rows.map(row => row.split(',')));

    await setDoc(doc(getFirestore(), "charts", chartId), {
        name,
        accounts,
    });
}

(async () => {
    await seedChart('bas-2021', 'BAS 2021');
})()


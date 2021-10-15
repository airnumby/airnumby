import fs from 'fs';
import admin from 'firebase-admin';
import { program } from 'commander';
import { exit } from 'process';

program
    .version('0.0.1')
    .description('Seeds firestore with charts of accounts using admin SDK')
    .parse(process.argv)

const keyPath = `${__dirname}/admin-key.json`;
if (!fs.existsSync(keyPath)) {
    console.error(`Admin key not found in path ${keyPath}`);
    exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(keyPath)
});

const seedChart = async (chartId: string, name: string) => {
    const csvData = fs.readFileSync(`./assets/charts/${chartId}.csv`, 'utf8');

    const rows = csvData.split('\n')
    const header = rows.shift()?.split(',');

    console.assert(header?.[0] === 'AccountNumber', `Invalid first column name "${header?.[0]}"`)
    console.assert(header?.[1] === 'AccountName', `Invalid second column name "${header?.[0]}"`)

    const accounts = Object.fromEntries(rows.map(row => {
        const [key, name] = row.split(',')
        const value = { name };
        return [key, value];
    }));

    await admin.firestore().doc(`charts/${chartId}`).set({
        name,
        accounts,
    });
    console.log(`Success! Chart ${chartId} uploaded.`)
}

(async () => {
    await seedChart('bas-2021', 'BAS 2021');
})()


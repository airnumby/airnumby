#!/usr/bin/node

const { program } = require('commander');
var admin = require('firebase-admin');

program.version('0.0.1');
program.arguments('<user_uid>')
program.option('--check', 'only list claims')
program.parse(process.argv)

const opts = program.opts();

if (!program.args.length) {
    program.help();
}

const keyName = 'admin-key.json';

var key = require(`${__dirname}/${keyName}`);
const uid = program.args[0];

admin.initializeApp({
    credential: admin.credential.cert(key)
});
var auth = admin.auth();
const firestore = admin.firestore();


const listClaims = async () => {
    const user = await auth.getUser(uid);

    console.log(user.customClaims)

}

const updateClaims = async () => {
    try {
        const user = await auth.getUser(uid);

        const orgDocs = await firestore.collection('organizations').where('owner', '==', uid).get();

        const orgs = orgDocs.docs;

        const ownedOrganizations = []
        for (const org of orgs) {
            ownedOrganizations.push(org.id);
        }

        await auth.setCustomUserClaims(uid, { ...user.customClaims, ownedOrganizations })

        await firestore.doc(`/users/${uid}`).update({ claimsUpdated: new Date() });
        console.log(`claims updated for user: '${uid}'`)
    } catch (e) {
        console.error(`Failed to update claims '${uid}'`, e)
    }
}

async function main() {
    if (!opts.check) {
        await updateClaims();
    }
    listClaims()
}

main();

import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();


const REGION = 'europe-west1';

exports.orgCreation = functions.region(REGION).firestore
    .document('organizations/{orgId}')
    .onCreate(async snap => {
        const owner = snap.data()?.owner;
        const id = snap.id;

        functions.logger.info(`Recording owner ${owner} for org ${id}`);

        const auth = admin.auth();

        try {
            const user = await auth.getUser(owner);

            const ownedOrganizations = (user.customClaims?.ownedOrganizations || []).concat([id]);
            await auth.setCustomUserClaims(owner, { ...user.customClaims, ownedOrganizations });

            await admin.firestore().doc(`/users/${owner}`).update({ claimsUpdated: new Date() });
            functions.logger.info('All set new orgs are', ownedOrganizations);
            return true;
        } catch (e) {
            functions.logger.error(`Failed to set orgs`, e);
            return false;
        }
    });

const config = {
    isStaging: process.env.REACT_APP_ENV === 'staging',
    isProduction: false,
    useEmulators: !!process.env.REACT_APP_EMULATORS,

    restaurantId: 'WQczfPZjHYCApPaC2xNv',

    firebaseEndpoint: 'https://europe-west1-johan-friends-dev.cloudfunctions.net/',
    swishEndpoint: 'https://mpc.getswish.net/qrg-swish/api',
}

config.isProduction = !config.isStaging && process.env.NODE_ENV === 'production';

if (config.useEmulators) {
    config.firebaseEndpoint = 'http://localhost:5001/johan-friends-dev/europe-west1';
}

if (config.isProduction) {
    // UPDATE to prod
}


export default config;
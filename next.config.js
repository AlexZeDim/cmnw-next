const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    if (phase === isDev) {
        return {
            distDir: '.next',
        }
    }

    return {
        distDir: '.next',
    }
}

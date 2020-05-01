module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{json,xml,ico,png,svg,html,js,txt,webmanifest,css}'],
    swDest: './build/service-worker.js',
    swSrc: './public/service-worker.js'
};

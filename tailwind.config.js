module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {},
    },
    variants: {
        darkMode: 'class',
        extend: {},
    },
    plugins: [],
}
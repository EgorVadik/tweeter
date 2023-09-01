/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                'primary-blue': '#2F80ED',
                'secondary-blue': '#2D9CDB',
                'light-red': '#EB5757',
                'light-green': '#27AE60',
                'lighter-gray': '#F2F2F2',
                'light-gray': '#828282',
                gray: '#BDBDBD',
                'dark-gray': '#4F4F4F',
                'darker-gray': '#333333',
            },
            letterSpacing: {
                base: '-0.49px',
            },
            boxShadow: {
                'card-shadow': '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
            },
            screens: {
                '2md': '830px',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

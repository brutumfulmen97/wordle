/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                spin: {
                    from: { transform: "rotateY(0deg)" },
                    to: { transform: "rotateY(180deg)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                "spin-slow": "spin 1s linear",
                "bounce-once": "wiggle 0.5s linear",
            },
        },
    },
    plugins: [],
};

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
            },
            animation: {
                "spin-slow": "spin 1s linear",
            },
        },
    },
    plugins: [],
};

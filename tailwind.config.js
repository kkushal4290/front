/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: "Poppins",
                inter: "Inter",
            },
            colors: {
                red: "#ec5747",
                pink: "#fe3e50",
                blue: "#184463",
                white: "#ffffff"
            },
        },
    },
    plugins: [

    ],
};

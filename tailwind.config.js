module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#32d583',
        dark: '#090b0f',
        card: '#121821',
        line: '#1f2a37'
      },
      boxShadow: {
        glow: '0 0 22px rgba(50, 213, 131, 0.18)'
      }
    }
  },
  plugins: []
};

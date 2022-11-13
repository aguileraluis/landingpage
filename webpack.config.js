const path = require("path");
module.exports = {
    entry: './src/scripts.js',
    mode: 'development',
    output: {
        filename: './public/js/build.js'
    },
    watch: true 
}
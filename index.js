// code away!
const server = require('./server');

const PORT = 5000;
server.listen(PORT, () => {
    console.log('\n* Server Running on http://localhost:5000 *\n');
});
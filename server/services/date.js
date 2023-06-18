
// Create a new date
const fecha = new Date();

// Get date like sql CURDATE() function
const fechaSQL = fecha.toISOString().slice(0, 19).replace('T', ' ');

export default fechaSQL;

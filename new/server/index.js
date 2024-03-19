require("dotenv").config();
const app = require("./app");

const PORT = 3000; // server hardcoded to run on port 3000. 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

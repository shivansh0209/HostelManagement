import connectDB from "./db/db.js";
import app from "./app.js";



connectDB()
.then(() => {
    app.on('error', (err) => {
        console.error('Error occurred in app.on', err);
    }); 

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('Error connecting to database in catch block', err);
});
import mongoose from "mongoose";

// connect db
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
}
await main();

// Schema definition 
const CatSchema = new mongoose.Schema({
    name: String,
});

CatSchema.methods.speak = function speak() {
    const greeting = this.name ? "Meow name is " + this.name : "I don't have a time";
    console.log(greeting);
}

const CatModel = mongoose.model('CatModel', CatSchema);

const silence = new CatModel({name: 'silence'});
console.log(silence.name);
silence.speak();
await silence.save();
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    console.log("Successfully connected...");
  } catch (error) {
    console.log(error);
  }
}

main();

const CatSchema = new mongoose.Schema({
  name: String,
});

// NOTE: Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
// Lets add a function 'meow' to CatSchema
CatSchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a time";
  console.log(greeting);
};

// A model is a class with which we can construct documents
const Cat = mongoose.model("CatModel", CatSchema);

// Let's create a document of Cat with name 'silence'
const silence = new Cat({ name: "Silence" });
console.log(silence.name);
silence.speak();
await silence.save();

const fluffy = new Cat({ name: "fluffy" });
fluffy.speak();

await fluffy.save();

const cats = await Cat.find();
console.log(cats);

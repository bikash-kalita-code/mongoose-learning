import mongoose from "mongoose";
const { Schema } = mongoose;

// Connecting to mongoose server
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
}
await main();

/**
 * The permitted SchemaTypes are:
 * 1. String
 * 2. Number
 * 3. Date
 * 4. Buffer
 * 5. Boolean
 * 6. Mixed
 * 7. ObjectId
 * 8. Array
 * 9. Decimal128
 * 10. Map
 * 11. UUID
 */

// Defining your schema
const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

// NOTE: You can add additional keys using `add()` method of `Schema`

// Creating a model
const Blog = mongoose.model("Blog", blogSchema);

// Ids : by default mongoose adds an '_id' property to your schema of type 'ObjectId'
// You can also overwrite Mongoose's default _id with your own _id.
// Just be careful: Mongoose will refuse to save a document that doesn't have an _id, so you're responsible for setting _id if you define your own _id path.
// const schema = new Schema({_id: Number});
// const Model = mongoose.model('Test', schema);
// const doc = new Model();
// await doc.save(); // Throws "document must have an _id before saving"
// doc._id = 1;
// await doc.save();

// Instance methods: Instances of Models are documents. Documents have many of their own built-in instance methods.
const animalSchema = new Schema(
  { name: String, type: String },
  {
    methods: {
      findSimilarTypes() {
        return mongoose.model("Animal").find({ type: this.type });
      },
    },
  }
);

// Or, assign a function to the 'methods" objet of our animalSchema
animalSchema.methods.findSimilarTypes = function () {
  return mongoose.model("Animal").find({ type: this.type });
};

const Animal = mongoose.model("Animal", animalSchema);
const dog = new Animal({ type: "dog" });
await dog.save();

const result = await dog.findSimilarTypes();
console.log(result);

console.log('End of Script');
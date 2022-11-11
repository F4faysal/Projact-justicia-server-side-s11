const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//medilware
app.use(cors());
app.use(express.json());

/**=======================================
              mongodb
  ======================================*/
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0t7ovhi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/**=======================================
                mongodb
  ======================================*/

async function run() {
  try {
    const serviceCollection = client.db("justicialower").collection("services");
    const reviewCollection = client.db("justicialower").collection("reviews");

    /**=======================================
                  Total service
      =======================================*/
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    /**=======================================
                  Post service
      =======================================*/
  
    app.post("/service", async (req, res) => {
      const service = req.body;
      const services = await serviceCollection.insertOne(service);
      res.send(services);
      console.log(service);
    });


    /**=======================================
                    3 service api
      =======================================*/
    app.get("/service/3", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });

    /**=======================================
                unick id service api
      =======================================*/
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    //=============================================================================================

    /**=======================================
                 post review api
      =======================================*/
    app.post("/review", async (req, res) => {
      const user = req.body;
      const result = await reviewCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });

    /**=======================================
                 get review api
      =======================================*/

    app.get("/review", async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    /**=======================================
                 get unik review api
      =======================================*/

    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await reviewCollection.findOne(query);
      res.send(service);
    });
    /**=======================================
                 PUT review api
      =======================================*/
    app.put("/review/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      console.log(user)
      const updatedUser = {
        $set: {
          review: user.review,
        },
      };
      const result = await reviewCollection.updateOne(
        filter,
        updatedUser,
        option
      );
      res.send(result);
    });

    /**=======================================
                 delete review api
      =======================================*/
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      console.log("trying to delete", id);
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

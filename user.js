const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

var ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017";
const dbName = "mydb";

async function get_users(filter={}) {
	try{
		let client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection("customers");
		let data = await collection.find(filter).toArray();
		client.close();
		return data
	}catch(err){
		throw err;
	}
}

async function add_user(user) {
	try{
		let client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection("customers");
		await collection.insertOne(user);
		client.close();
	}catch(err){
		throw err;
	}
}

async function remove_user(user) {
	try{
		let client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection("customers");
		let id = user.id;
		let filter = { _id: ObjectId(id) };
		await collection.remove(filter);
		client.close();
	}catch(err){
		throw err;
	}
}

async function update_user(user) {
	try{
		let client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection("customers");
		let id = user.id;
		let name = user.name;
		let addr = user.address;
		await collection.update(
			{ _id: ObjectId(id) },
			{
				$set: {
					name: `${name}`,
					address: `${addr}`
				}
		   }
   		);
		client.close();
	}catch(err){
		throw err;
	}
}

router.get("/", function (req, res) {
	let users = get_users({});
	users.then(d=>res.json(d));
});

router.get("/id/:id", function (req, res) {
	let users = get_users({_id:parseInt(req.params.id)});
	users.then(d=>res.json(d));
});

router.get("/name/:name", function (req, res) {
	let users = get_users({name:req.params.name});
	users.then(d=>res.json(d));
});

router.get("/add", function (req, res) {
	let user = req.query;
	add_user(user).then(()=>res.send("success")).catch(()=>res.send("fail"));
});

router.get("/update", function (req, res) {
	let user = req.query;
	update_user(user).then(()=>res.send("success")).catch(()=>res.send("fail"));
});

router.get("/remove", function (req, res) {
	let user = req.query;
	remove_user(user).then(()=>res.send("success")).catch(()=>res.send("fail"));
});


module.exports = router;
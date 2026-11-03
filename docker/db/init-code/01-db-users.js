const dbName = process.env.MONGO_APP_DB
const user = process.env.MONGO_APP_USER
const pwd = process.env.MONGO_APP_PASSWORD

if (!dbName || !user || !pwd) {
	throw new Error("Faltan MONGO_APP_DB, MONGO_APP_USER o MONGO_APP_PASSWORD")
}

db = db.getSiblingDB(dbName)

db.createUser({
	user,
	pwd,
	roles: [
		{ role: "readWrite", db: dbName },
		{ role: "dbAdmin", db: dbName }
	]
})

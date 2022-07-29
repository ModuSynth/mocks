const js = require('json-server')
const server = js.create();
const router = js.router("db.json");
const { uuids } = require('./middlewares/uuids')
const middlewares = js.defaults({ static: "db.json" });

// Add middlewares.
server.use(middlewares).use(js.bodyParser).use(uuids);

server.post("/nodes", require("./routes/nodes/create").route(router.db))
server.get("/tools", require("./routes/tools/list").list)

server.use(router)
    
server.listen(3000);
import config from "../config/config.js"
import connectDB from "../config/mongo.js"
import userAdmin from "../utils/userAdmin.js"

let UserDao
let CartsDao
let ProductsDao

switch (config.PERSISTENCE) {
    case "MONGO":
        connectDB()
        UserDao = await import("./mongo/user.mongo.dao.js").then(module => module.default)
        CartsDao = await import("./mongo/carts.mongo.dao.js").then(module => module.default)
        ProductsDao = await import("./mongo/products.mongo.dao.js").then(module => module.default)
        console.log("Using MONGO persistence")
        break;
    
    case "FS":
        UserDao = await import("./fs/user.fs.dao.js").then(module => module.default)
        CartsDao = await import("./fs/carts.fs.dao.js").then(module => module.default)
        ProductsDao = await import("./fs/products.fs.dao.js").then(module => module.default)
        console.log("Using FS persistence")
        break;
        
    case "MEMORY":
        UserDao = await import("./memory/user.mem.dao.js").then(module => module.default)
        CartsDao = await import("./memory/carts.mem.dao.js").then(module => module.default)
        ProductsDao = await import("./memory/products.mem.dao.js").then(module => module.default)
        console.log("Using MEMORY persistence")
        UserDao.create(userAdmin) // Create admin user in memory persistence
        break;
}

export {
    CartsDao,
    ProductsDao,
    UserDao
}
const session = require("express-session");
const MongoStore = require("connect-mongo");

const secretKey = "7Wa$5&3W4z9Z-gTs";
export class SessionsModule {
  constructor() {}

  public config(app: any) {
    app.use(
      session({
        secret: secretKey,
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({
          mongoUrl: "mongodb://renan:123456@localhost:27017/renandb",
          dbName: "renandb",
          ttl: 1 * 24 * 60 * 60,
          autoRemove: "native",
          touchAfter: 24 * 3600,
          secret: secretKey,
        }),
      })
    );
  }
}

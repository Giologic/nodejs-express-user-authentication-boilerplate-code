db.createUser(
  {
    user: "boilerplate_user",
    pwd: "password",
    roles: {
      role: "readWrite",
      db: "boilerplate_db",
    }
  }
)
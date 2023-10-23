module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": process.env.MYSQL_USER,
  "password": process.env.MYSQL_ROOT_PASSWORD,
  "database": process.env.MYSQL_DATABASE,
  "entities": ["src/entity/*.ts"],
  "migrations": ["src/migration/*.ts"],
  "migrationsTableName": "custom_migration_table",
  cli: {
    migrationsDir: "src/migration",
  }
}
module.exports = {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true,
      migrations: { directory: './data/migrations' },
      seeds: { directory: './data/seeds' },
      connection: {
        filename: './data/dogs.db3',
      },
    },
    //testing environment used so that we don't make changes to our dev db
    testing: {
      client: 'sqlite3',
      useNullAsDefault: true,
      migrations: { directory: './data/migrations' },
      seeds: { directory: './data/seeds' },
      connection: {
        filename: './data/test.db3',
      },
    },
    production: {
  
    },
  };
  
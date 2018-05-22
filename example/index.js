const SequelizeModels = require('./../lib/sequelize-models');

var seqModels = new SequelizeModels({
    // Database connection options
    connection: {
      host: '10.10.10.20',
      port: 5433,
      dialect: 'postgres',
      username: 'postgres',
      schema: 'template_postgis',
      password: 'postgres',
    },

    // Models loading options
    models: {
      autoLoad: true,
      path: '/models',
    },

    // Sequelize options passed directly to Sequelize constructor
    sequelizeOptions: {
      define: {
        // freezeTableName: true,
        // underscored: true,
      },
    },
  });

  seqModels
    .getSchema()
    .then(schema => {
      // schema.models and schema.db available here
      // Some Model
      schema.db.models.Layers.findAll().then(docs => {
        console.log('Layers', docs.length);
        docs[0].getFeatures().then(docs => {
            console.log('Features', docs.length);
        });
      });
    })
    .catch(err => {
      // throwing error out of the promise
      setTimeout(() => {
        throw err;
      });
    });

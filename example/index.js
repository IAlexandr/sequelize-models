const SequelizeModels = require('./../lib/sequelize-models');

var seqModels = new SequelizeModels({
    // Database connection options
    connection: {
      host: '10.10.10.20',
      port: 5433,
      dialect: 'postgres',
      username: 'postgres',
      schema: 'gis_snowplows',
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
    .getSchema({ exportTableNames: ['Layers', 'Logs']})
    .then(schema => {
      // schema.models and schema.db available here
      // Some Model
      schema.db.models.Layers.findOne().then(layer => {
        console.log('Layer', layer.properties);
        
        layer.getFeatures().then(docs => {
            console.log('Features', docs.length);
        });
        schema.db.models.Features.findOne()
        .then(feature => {
          layer.addFeature(feature)
          .then(result => {
            console.log('addFeature', result);
          });
        });
      });
    })
    .catch(err => {
      // throwing error out of the promise
      setTimeout(() => {
        throw err;
      });
    });

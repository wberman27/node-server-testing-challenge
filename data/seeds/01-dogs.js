exports.seed = function(knex, Promise) {
    //deletes all rows and resets ids (with truncate)
    return knex('dogs')
      .truncate()
      .then(function() {
        return knex('dogs').insert([
          { name: 'Scruffy' },
          { name: 'Basil' },
          { name: 'Max' },
          { name: 'Woof' },
          { name: 'Rocky' },
          { name: 'Toby' },
          { name: 'Kristy' },
          { name: 'Ebony' },
          { name: 'Spot' },
          { name: 'Clifford' }
        ]);
      });
  };
  
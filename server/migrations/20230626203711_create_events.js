/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('events', (table) => {
    table.uuid('id').primary()
    table.string('name')
    table.string('ownerUserId')
    table.string('description')
    table.string('image')
  })

  await knex.schema.createTable('eventUsers', (table) => {
    table.string('userId')
    table.string('eventId')
    table.primary(['userId', 'eventId'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}

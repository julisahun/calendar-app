/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('password').notNullable()
    })
    .createTable('userTokens', (table) => {
      table.uuid('userId').notNullable()
      table.string('token').notNullable()
      table.boolean('valid').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}

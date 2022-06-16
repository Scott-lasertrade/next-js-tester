import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("tester")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.unique())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`NOW()`))
    .execute();

  await db
    .insertInto("tester")
    .values([
      {
        name: "Scott",
      },
      {
        name: "Paul",
      },
    ])
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("tester").execute();
}

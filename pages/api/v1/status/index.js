import database from "infra/database.js";

async function staus(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName2 = request.query.databaseName;
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenConnections = await database.query({
    text: "SELECT COUNT(*)::int from pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const pgVersion = await database.query(`SHOW server_version;`);
  const databaseMaxConnections = await database.query(`SHOW max_connections;`);

  const maxPgConnection = parseInt(
    databaseMaxConnections.rows[0].max_connections,
  );
  const activePgConnections = databaseOpenConnections.rows[0].count;
  const version = pgVersion.rows[0].server_version;
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: maxPgConnection,
        active_connections: activePgConnections,
        version: version,
      },
    },
  });
}

export default staus;

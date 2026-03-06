test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const databaseBody = responseBody.dependencies.database;

  const maxConnections = databaseBody.max_connections;
  expect(maxConnections).toBeGreaterThan(1);

  const activeConnections = databaseBody.active_connections;
  expect(activeConnections).toBe(1);

  const version = databaseBody.version;
  expect(version).toBeDefined();
  expect(version).not.toBeNull();
  expect(version).toBe("16.8");
});

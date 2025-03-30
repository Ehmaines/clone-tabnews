import database from "../../../../infra/database.js";

async function staus(request, response) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows);
  response.status(200).json({ status: "teste do send á" });
}

export default staus;

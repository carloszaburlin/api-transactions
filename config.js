// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 8000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Base de Datos
// ============================

let userDB;
let passDB;
let urlDB;
let schemaDB;

if (process.env.NODE_ENV === "dev") {
  userDB = "dracing";
  passDB = "dwrac01";
  urlDB = "exa1-scan.claro.amx:1521/RAC8.WORLD";
  schemaDB = "racing";
} else {

  //* the DBCP_RAC8_RACING_XXX env variable may vary

  userDB = process.env.DBCP_RAC8_RACING_NODE_USERNAME;
  passDB = process.env.DBCP_RAC8_RACING_NODE_PASSWORD;
  urlDB = process.env.DBCP_RAC8_RACING_NODE_URL;
  schemaDB = process.env.DBCP_RAC8_RACING_NODE_SCHEMA;
}
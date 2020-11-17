let oracledb;
let connectionPool;

const toCamelCase = str => {
  return str.toLowerCase().replace(/(\_[a-z])/g, $1 => {
    return $1.toUpperCase().replace("_", "");
  });
};

//* to convert the default node-oracle dataset into an array of objects
const toArrOfObjects = (results, options = {}) => {
  if (results.metaData && results.rows) {
    let metaData = results.metaData,
      rows = results.rows,
      dataObject = {},
      outputArray = [],
      cc = options.camelCase;

    for (let i = 0; i < rows.length; i++) {
      dataObject = {};
      rows[i].forEach((column, idx) => {
        let key = cc ? toCamelCase(metaData[idx].name) : metaData[idx].name;
        dataObject[key] = column;
      });
      outputArray.push(dataObject);
    }

    return outputArray;
  } else {
    throw new Error("Not a valid node-oracle results dataset");
  }
};

//* create the connection pool with the proper credentials
const createPool = (credentials, callback) => {
  let username = credentials.username || "";
  let password = credentials.password || "";
  let connectString = credentials.connectString || "";

  if (username === "" || password === "" || connectString === "")
    return callback({
      msg:
        "Must provide database credentials and connection info to use this module"
    });

  oracledb = require("oracledb");

  oracledb.createPool(
    {
      user: username,
      password: password,
      connectString: connectString
    },
    (err, pool) => {
      if (err) {
        console.log("Error creating pool - SOW:42", err);
        return callback(err);
      } else {
        console.log("Connection Pool created successfully");
        connectionPool = pool;
        return callback();
      }
    }
  );
};

const getPool = () => {
  return connectionPool;
};

//* get the connection pool and execute the query + options
const select = async (query, options, callback) => {
  let pool = getPool();
  options = options || [];

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    } else {
      connection.execute(query, options, (err, result) => {
        if (err) {
          connection.release(err => {
            if (err) return callback(err);
          });
          return callback(err);
        } else {
          connection.release(err => {
            if (err) {
              return callback(err);
            } else {
              return callback(
                null,
                toArrOfObjects(result, { camelCase: true })
              );
            }
          });
        }
      });
    }
  });
};

module.exports = {
  createPool,
  getPool,
  select
};

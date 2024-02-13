const db = require("./db");
const helper = require("./helper");
const config = require("../config");

async function getMultiple(customQuery, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const query = `${customQuery} LIMIT ${offset}, ${config.listPerPage}`;
  const countQuery = `SELECT COUNT(*) AS total FROM (${customQuery}) AS count`;

  const rows = await db.query(query);
  const totalRows = await db.query(countQuery);
  const total = totalRows.length > 0 ? totalRows[0].total : 0;

  const data = helper.emptyOrRows(rows);
  const meta = { page, count: total };

  return {
    data,
    ...meta,
  };
}

async function getSingle(customQuery) {
  const row = await db.query(customQuery);
  return { data: row };
}

module.exports = {
  getMultiple,
  getSingle,
};

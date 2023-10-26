const pg = require("pg")


const isDbLocal = ((process.env.PGHOST || "localhost") === "localhost");

function getConfig() {
    if (isDbLocal) {
        return {
            max: 10
        };

    } else {
        return {
            max: 10,
            ssl: {
                rejectUnauthorized: false,
            }
        };
    }
}

const pool = new pg.Pool(getConfig);


async function query(text, params) {
    return await pool.query(text, params)
}

async function getClient() {
    return await pool.connect();
}


module.exports = { query: query, getClient: getClient };
const db = require('../db');

async function list() {
    result = await db.query('SELECT full_name, age FROM isono_family');
    return result.rows;
}


async function remove(name, age) {

    const client = await db.getClient();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'DELETE FROM isono_family WHERE full_name=$1 AND age=$2',
            [name, age]
        );

        if (result.rowCount != 1) {
            throw new Error(`エラー: 削除結果は1件であってほしいのに、${result.rowCount}件でした`)
        }

        await client.query('COMMIT');
        return `${name}さん ${age}才が去りました`;

    } catch (e) {
        await client.query('ROLLBACK');
        throw e;

    } finally {
        client.release();
    }
}



async function add(name, age) {

    const client = await db.getClient();
    try {
        await client.query('BEGIN');
        await client.query(
            'INSERT INTO isono_family VALUES ($1, $2)',
            [name, age]
        );

        const result = await client.query(
            'SELECT COUNT(*) FROM isono_family'
        );

        const numberOfPeaple = result.rows[0].count;
        if (numberOfPeaple >= 10) {
            throw new Error(`${numberOfPeaple}人も？ 家族はそんなにたくさん増やせません`)
        }

        await client.query('COMMIT');
        return `${name}さん ${age}才が家族に加わりました`;

    } catch (e) {
        await client.query('ROLLBACK');
        throw e;

    } finally {
        client.release();
    }
}


module.exports = {
    list: list,
    add: add,
    remove: remove
};

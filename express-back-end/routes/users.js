const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // retrieve data for specific user for Account page
  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = {};
    // return db.query(
    //   `SELECT first_name, last_name, email, avatar_url, followed_id AS following, SUM(score) AS total_score FROM users
    //   JOIN follows ON users.id = user_id
    //   JOIN guesses ON users.id = guesses.user_id
    //   WHERE users.id = $1
    //   GROUP BY first_name, last_name, email, avatar_url, followed_id;`, [userID])

    Promise.all([
      db.query('SELECT SUM(score) AS total_score, Count(*) AS games_played FROM guesses WHERE user_id = $1', [ userId ]),
      db.query(`SELECT first_name, last_name
                FROM users 
                WHERE id IN (
                  SELECT followed_id FROM follows WHERE user_id = $1
                );
              `, [ userId ])
    ])
      .then((data) => {
        console.log('data: ', data[0].rows)
        console.log('follows: ', data[1].rows)
        res.send({
          totals: data[0].rows,
          follows: data[1].rows
        });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });

  router.post('/', (req, res) => {
    const { email, password } = req.body;
    return db.query("SELECT * FROM users WHERE email = $1;", [email])
      .then((data) => {
        const user = data.rows[0];
        if (password !== user.password_digest) {
          return res.send({valid: false});
        }
        return res.send({valid: true, user});
      })
      .catch((err) => {
        console.log(err);
        if (err) return res.send({valid: false, error: err});
      });
  });

  
  return router;
};
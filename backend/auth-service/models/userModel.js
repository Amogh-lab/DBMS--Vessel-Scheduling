// import pool from "../config/postgres.js";

// export const findUserByUsername = async (username) => {
//   const res = await pool.query(
//     "SELECT * FROM users WHERE username = $1",
//     [username]
//   );
//   return res.rows[0];
// };

// export const createUser = async ({
//   user_id,
//   username,
//   password,
//   role,
//   vessel_id,
//   plant_id
// }) => {
//   const res = await pool.query(
//     `INSERT INTO users
//      (user_id, username, password, role, vessel_id, plant_id)
//      VALUES ($1,$2,$3,$4,$5,$6)
//      RETURNING user_id, username, role`,
//     [user_id, username, password, role, vessel_id || null, plant_id || null]
//   );

//   return res.rows[0];
// };

import pool from "../config/postgres.js";

export const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

export const createUser = async (user) => {
  const { user_id, username, password, role, vessel_id, plant_id } = user;

  const result = await pool.query(
    `INSERT INTO users (user_id, username, password, role, vessel_id, plant_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id, username, role, vessel_id, plant_id`,
    [user_id, username, password, role, vessel_id, plant_id]
  );

  return result.rows[0];
};

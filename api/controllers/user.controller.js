import User from "../models";
import pick from "../utils/pick";

/**
 * @route           api/users
 * @method          GET
 * @description     Get all users from DB
 */
const getAll = async (req, res, next) => {
  try {
    const filter = pick(req.query, ["name", "email", "age", "address"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const users = await User.paginate(filter, options);
    res.send(users);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

/**
 * @route           api/users
 * @method          POST
 * @description     Create new user
 */
const create = async (req, res, next) => {
  try {
    const data = pick(req.body, ["name", "email", "address", "age", "gender"]);
    let new_user = await User.create(data);
    res.json(new_user);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

/**
 * @route           api/users/:id
 * @method          GET
 * @description     Get a user
 */
const get = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(`User not found`);
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

/**
 * @route           api/users/:id
 * @method          PUT
 * @description     Update user
 */
const update = async (req, res, next) => {
  try {
    const data = pick(req.body, ["name", "email", "address", "age", "gender"]);
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(`User not found`);
    }
    Object.assign(user, data);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

/**
 * @route           api/users/:id
 * @method          DELETE
 * @description     Delete a user
 */
const remove = async (req, res, next) => {
    try {
      let user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send(`User not found`);
      }
      res.json('User has been removed');
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  };

export { getAll, create, update, get, remove};

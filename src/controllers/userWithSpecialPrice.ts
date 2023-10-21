import Users from "../models/Users";

const userWithSpecialPrice = (req: Request, res: any) => {
  Users.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default userWithSpecialPrice;

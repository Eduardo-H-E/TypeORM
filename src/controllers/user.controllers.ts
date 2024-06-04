import { Request, Response } from "express";
import { User } from "../entities/User";
import { parse } from "path";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email } = req.body;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    await user.save();

    console.log(user);

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json([users]);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname } = req.body;
    const { id } = req.params;

    const user = await User.findOneBy({ id: parseInt(req.params.id) });

    if (!user) return res.status(404).json({ message: "User does not exists" });
    /*user.firstname = firstname;
  user.lastname = lastname;
  */

    await User.update({ id: parseInt(id) }, req.body);

    //user.save();
    //return res.json("received");

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await User.delete({ id: parseInt(id) });

    if (result.affected === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOneBy({ id: parseInt(id) });
    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

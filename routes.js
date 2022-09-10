import express from "express";
import route from "./Config/Routes.js";

const router = express.Router();

router.get("/users", route.getUsers);
router.get("/users/:id", route.getUserById);
router.post("/users", route.createUser);
router.patch("/users/:id", route.updateUser);
router.delete("/users/:id", route.deleteUser);

export default router;

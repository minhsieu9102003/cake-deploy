import express from "express";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user ok");
});
userRouter.get("/:id", );
userRouter.post("/", );
userRouter.put("/:id", );
userRouter.delete("/:id", );

export default userRouter;
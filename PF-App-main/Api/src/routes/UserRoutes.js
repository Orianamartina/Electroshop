const express = require("express");
const {
  registerUser,
  confirm,
  getUsers,
  logInUser,
  banUser,
  unBanUser,
  setAdminRightsToUser,
  removeAdminRightsToUser,
  createAdmin,
  updateUser,
  deleteUser,
  loginGoogle,
  confirmPasswordChange,
  getUserByEmail,
  addToFavorite,
  getUserFavorites
} = require("../controlers/Users");
const router = express.Router();
router.use(express.json());

router.post("/", registerUser);
router.get("/", getUsers);
router.get("/:email", getUserByEmail)
router.put("/setadmin", setAdminRightsToUser);
router.put("/removeadmin", removeAdminRightsToUser);
router.post("/createadmin", createAdmin);
router.post("/login/log", logInUser);
router.post("/login/google", loginGoogle);
router.put("/ban/:id", banUser);
router.put("/unban/:id", unBanUser);
router.get("/confirm/:token", confirm);
router.put("/update", updateUser);
router.delete("/del", deleteUser);
router.get("/confirmchange/:token", confirmPasswordChange)

router.post("/fav/add", addToFavorite)
router.get("/fav/:userId", getUserFavorites)
module.exports = router;

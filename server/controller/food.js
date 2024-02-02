const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Food = require("../model/food");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// create food
router.post(
  "/create-food",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const foodData = req.body;
        foodData.images = imageUrls;
        foodData.shop = shop;

        const food = await Food.create(foodData);

        res.status(201).json({
          success: true,
          food,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all foods of a shop
router.get(
  "/get-all-foods-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const foods = await Food.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        foods,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete food of a shop
router.delete(
  "/delete-shop-food/:id",
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const foodId = req.params.id;

      const foodData = await Food.findById(foodId);

      foodData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const food = await Food.findByIdAndDelete(foodId);

      if (!food) {
        return next(new ErrorHandler("Food not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Food Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all foods
router.get(
  "/get-all-foods",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const foods = await Food.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        foods,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a food
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, foodId, orderId } = req.body;

      const food = await Food.findById(foodId);

      const review = {
        user,
        rating,
        comment,
        foodId,
      };

      const isReviewed = food.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        food.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        food.reviews.push(review);
      }

      let avg = 0;

      food.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      food.ratings = avg / food.reviews.length;

      await food.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": foodId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all foods --- for admin
router.get(
  "/admin-all-foods",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const foods = await Food.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        foods,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;

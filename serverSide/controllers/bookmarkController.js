const express = require("express");
const bookmarkController = express.Router();
const Bookmark = require("../models/bookmarkModels");
// Index

bookmarkController.get("/", async (req, res) => {
  try {
    // attempt to grab all Bookmarks from the db
    const foundBookmarks = await Bookmark.find({});
    res.status(200).json(foundBookmark);
  } catch (error) {
    // this is where we will handle the error if we get one
    res.status(400).json(error);
  }
});

// CREATE

bookmarkController.post("/", async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create(req.body);
    res.status(200).json(createdBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete Route

bookmarkController.delete("/:id", async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

bookmarkController.put("/:id", async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

bookmarkController.get("/:id", async (req, res) => {
  try {
    const showBookmark = await Bookmark.findById(req.params.id);
    res.status(200).json(showBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = bookmarkController;

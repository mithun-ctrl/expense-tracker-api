import {
    createTransaction,
    deleteTransactionByUserId,
    getTransactionByUserId,
    getTransactionSummary
} from "../controller/transactionController.js";
import express from "express";

const router = express.Router();

router.post("/transaction", createTransaction);
router.get("/transaction/:userId", getTransactionByUserId);
router.delete("/transaction/:id", deleteTransactionByUserId);
router.get("/transaction/summary/:userId", getTransactionSummary);

export default router;
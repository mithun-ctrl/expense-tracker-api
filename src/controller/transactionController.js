import { sql } from "../config/db.js";

const createTransaction = async (req, res) => {
    const { title, amount, category, description, payment_mode, user_id } = req.body;

    if (!title || !payment_mode || !category || !user_id || amount === undefined) {
        return res.status(401).json({ message: "All fields are required" });
    }

    try {

        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category, description, payment_mode)
            VALUES (${user_id}, ${title}, ${amount}, ${category}, ${description}, ${payment_mode})
            RETURNING *
        `;

        res.status(201).json(transaction[0]);
        console.log(transaction);

    } catch (error) {
        console.log("Error from transaction", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getTransactionByUserId = async (req, res) => {
    const {userId} = req.params;
   
    try {
        const transactions = await sql `
            SELECT * FROM transactions WHERE user_id= ${userId} ORDER BY created_at DESC;
        `;
        if(transactions.length===0)
            return res.status(404).json({ message: "No transactions found for this user" });
        res.status(200).json(transactions);

    } catch (error) {
        console.log("Error fetching transaction by userId ", error);
        return res.status(500).json({message: "Internal server error"});
        
    }
}

const deleteTransactionByUserId = async (req, res) => {
    const {id} = req.params;
    if(isNaN(parseInt(id))){
        return res.status(400).json({message: "Invalid transaction Id"});
    }
    try {
        
        const result =  await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *;
        `;
        if(result.length===0){
            res.status(404).json({message: "Transasction not found"});
        }
        res.status(200).json({message: "Transasction deleted successfully"});
        

    } catch (error) {
        console.log("Error deleting transaction", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getTransactionSummary = async (req, res) => {
    
    const {userId} = req.params;
    try {
        const totalBalance = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}; 
        `;

        const totalIncome = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0;
        `;

        const totalExpense = await sql`
            SELECT COALESCE(SUM(amount), 0) as expense FROM transactions WHERE user_id = ${userId} AND amount < 0;
        `;

        res.status(201).json({
            balance: totalBalance[0].balance,
            income: totalIncome[0].income,
            expense: totalExpense[0].expense,
        });

    } catch (error) {
        
    }
}

export { createTransaction, getTransactionByUserId, deleteTransactionByUserId, getTransactionSummary };
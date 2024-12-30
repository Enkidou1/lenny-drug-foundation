const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());  // Handles JSON requests
app.use(require('cors')());

const PORT = process.env.PORT || 3000;
const PAYSTACK_SECRET_KEY = process.env.pk_test_8911f76a81b1549a484a3a40667e7c674b2a030b;

app.post('/paystack/initialize', async (req, res) => {
    const { email, amount } = req.body;

    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            { email, amount },
            { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Payment initialization failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

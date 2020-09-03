import express from 'express';

import myBankController from '../controllers/myBankController.js';

const app = express();

// app.post('/myBank', () => {});

app.get('/myBank', myBankController.findAll);

app.patch('/myBank/accountDeposit/', myBankController.accountDeposit);

app.patch('/myBank/withdraw', myBankController.withdraw);

app.get('/myBank/checkBalance', myBankController.checkBalance);

app.delete('/myBank/deleteAccount', myBankController.deleteAccount);

app.patch('/myBank/transfer', myBankController.transfer);

app.get('/myBank/averageBalances/:agencia', myBankController.averageBalances);

export { app as myBankRouter };

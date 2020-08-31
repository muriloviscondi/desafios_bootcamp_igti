import mongoose from 'mongoose';

import myBankModel from './myBankModel.js';

const db = {};

db.url = 'mongodb://localhost:27017/igti';
db.mongoose = mongoose;
db.my_bank_api = myBankModel(mongoose);

export { db };

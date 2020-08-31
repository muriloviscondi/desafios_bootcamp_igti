import express from 'express';

import { myBankRouter } from './src/routes/myBankRouter.js';

import { db } from './src/models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('Conectado com o mongodb com sucesso');
  } catch (error) {
    console.log('Erro ao conectar no mongodb ' + error);
  }
})();
const app = express();

app.use(express.json());
app.use(myBankRouter);

app.listen(3333, () => {
  console.log('API Started');
});

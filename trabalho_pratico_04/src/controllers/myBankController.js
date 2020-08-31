import { db } from '../models/index.js';

const MyBank = db.my_bank_api;

const create = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).res.send('Erro ao salvar nova conta - ' + err);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await MyBank.find();

    res.send(data);
  } catch (err) {
    res.status(500).res.send('Erro ao buscar todas as contas - ' + err);
  }
};

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
const accountDeposit = async (req, res) => {
  try {
    const { name, agencia, balance } = req.body;

    const account = { name, agencia };
    const data = await MyBank.findOne(account);

    if (!data) {
      res.send('Conta inexistente!');
    }

    data.balance = balance + data.balance;

    const newDeposit = new MyBank(data);
    newDeposit.save();
    res.send(`Saldo atual: ${data.balance}`);
  } catch (err) {
    res.status(500).res.send('Erro ao buscar todos os podcast - ' + err);
  }
};

// Item 5 - Crie um endpoint para registrar um saque em uma conta
const withdraw = async (req, res) => {
  try {
    const { name, agencia, balance } = req.body;

    const account = { name, agencia };
    const data = await MyBank.findOne(account);

    if (!data) {
      res.send('Conta inexistente!');
    }

    if (balance + 1 <= data.balance) {
      data.balance = data.balance - balance - 1;

      const newWithdraw = new MyBank(data);
      newWithdraw.save();
      res.send(`Saque no valor de: ${balance}\nSaldo atual: ${data.balance}`);
    }
    res.send('Saldo Insuficiente');
  } catch (err) {
    res.status(500).res.send('Erro ao registrar depósito - ' + err);
  }
};

// Item 6 - Crie um endpoint para consultar o saldo da conta
const checkBalance = async (req, res) => {
  const account = req.body;

  const data = await MyBank.findOne(account);
  try {
    if (!data) {
      res.send('Conta inexistente!');
    }

    res.send(`balance: ${data.balance}`);
  } catch (err) {
    res.status(500).res.send('Erro ao mostrar balance - ' + err);
  }
};

// Item 7 - Crie um endpoint para excluir uma conta
const deleteAccount = async (req, res) => {
  try {
    const account = req.body;
    const data = await MyBank.findOne(account);

    if (data !== null) {
      const id = await data.id;
      const removeData = await MyBank.findByIdAndRemove({ _id: id });

      const { conta, agencia } = removeData;

      res.send(`Agência: ${agencia}, Conta: ${conta} - excluido com sucesso`);
    }

    res.send('Conta inexistente!');
  } catch (err) {
    res.status(500).res.send('Erro ao deletar conta - ' + err);
  }
};

export default {
  create,
  findAll,
  accountDeposit,
  withdraw,
  checkBalance,
  deleteAccount,
};

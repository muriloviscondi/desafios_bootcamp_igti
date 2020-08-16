import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//ITEM 01
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    next(err);
  }
});

// ITEM 02
router.put('/', async (req, res, next) => {
  try {
    const grade = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.grades.findIndex((i) => i.id === grade.id);

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    next(err);
  }
});

// ITEM 03
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    next(err);
  }
});

// ITEM 04
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    res.send(grade);
    req.params.id;
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

// ITEM 05
router.get('/consultGrade/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const { student, subject } = req.body;
    const { grades } = data;
    const grade = grades.filter((students) => {
      return students.student === student && students.subject === subject;
    });

    console.log(grade);

    const totalValue = grade.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    if (grade.length > 0) {
      res.send({ value: totalValue });
    } else {
      res.status(400).send({ error: 'Usuário não encontrado.' });
    }

    res.send(grade);
    req.params.student;
  } catch (err) {
    next(err);
  }
});

// ITEM 06
router.get('/', async (req, res, next) => {});

// ITEM 07
router.get('/', async (req, res, next) => {});

router.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

export default router;

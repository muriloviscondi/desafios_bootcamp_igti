import { promises as fs } from 'fs';

const statesAndCities = [];

init();

async function init() {
  try {
    const states = JSON.parse(await fs.readFile('./Estados.json'));
    const cities = JSON.parse(await fs.readFile('./Cidades.json'));

    // Juntando estados e cidades
    states.forEach((state) => {
      cities.forEach((city) => {
        if (state.ID === city.Estado) {
          statesAndCities.push({
            id: city.ID,
            city: city.Nome,
            uf: state.Sigla,
            state: state.Nome,
          });
        }
      });
    });

    // Criando arquivo completo
    fs.writeFile(`allFile.json`, JSON.stringify(statesAndCities, null, 2));

    // Criando arquivos JSON por estado
    states.forEach((state) => {
      const ufArchive = [];
      statesAndCities.forEach((item) => {
        if (state.Sigla === item.uf) {
          ufArchive.push(item);
        }
      });
      fs.writeFile(`${state.Sigla}.json`, JSON.stringify(ufArchive, null, 2));
    });
  } catch (err) {
    console.log(err);
  }
}

async function saveUf() {
  await fs.writeFile('times.json', JSON.stringify(times, null, 2));
}

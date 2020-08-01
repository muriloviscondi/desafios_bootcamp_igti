import { promises as fs } from 'fs';
import { Console } from 'console';

const totalCities = [];
const biggerFromState = [];
const smallerFromState = [];

init();

async function init() {
  try {
    const states = JSON.parse(await fs.readFile('./Estados.json'));
    const allFiles = JSON.parse(await fs.readFile('./allFile.json'));

    // Contando por estado
    states.forEach((state) => {
      const includeCity = [];
      const biggerCity = [];
      const smallerCity = [];
      let countState = 0;
      allFiles.forEach((item) => {
        if (state.Sigla === item.uf) {
          countState++;
          includeCity.push({ city: item.city, uf: item.uf });
        }
      });
      includeCity.sort((a, b) => {
        return a.city.length - b.city.length;
      });
      totalCities.push({ uf: state.Sigla, totalCities: countState });
      console.log(includeCity.slice(0, 1));
    });

    totalCities.sort((a, b) => {
      return a.totalCities - b.totalCities;
    });

    allFiles.sort((a, b) => {
      return a.city.length - b.city.length;
    });

    const fiveCityBigger = totalCities
      .slice(0, 5)
      .reduce((accumulator, current) => {
        return accumulator + current.totalCities;
      }, 0);
  } catch (err) {
    console.log(err);
  }
}

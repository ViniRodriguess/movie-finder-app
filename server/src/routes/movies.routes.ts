/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import api from '../services/api';

const routes = Router();

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}
routes.get('/', async (req, res) => {
  const { movieName } = req.query;
  let startPage = 1;
  let finalData: { [x: number]: any }[] = [];
  const years: any[] = [];
  let noOccurrences: any[] = [];

  const initialData = await api
    .get(`/movies/search/?Title=${movieName}&page=${startPage}`)
    .catch((err: Error) => {
      console.log(err);
    });

  while (startPage <= initialData.data.total_pages) {
    const result = await api
      .get(`/movies/search/?Title=${movieName}&page=${startPage}`)
      .catch((err: Error) => {
        console.log(err);
      });

    startPage += 1;

    const currentData = result.data.data;

    currentData.forEach(movie => {
      years.find(year => movie.Year === year);
      years.push(movie.Year);
    });

    const yearsOccurrences = function (arr, val) {
      return arr.reduce((acc: number, elem: number) => {
        return val === elem ? acc + 1 : acc;
      }, 0);
    };

    const yearsOcurrencesReduced = years.map(year => {
      const movies = yearsOccurrences(years, year);
      return {
        year,
        movies,
      };
    });

    const orderedData = yearsOcurrencesReduced.sort((a, b) => {
      if (a.year > b.year) {
        return 1;
      }
      if (a.year < b.year) {
        return -1;
      }
      return 0;
    });
    noOccurrences = getUniqueListBy(orderedData, 'year');

    finalData = noOccurrences;
  }

  const somaFinal = noOccurrences.reduce((a, b) => a + b.movies, 0);

  finalData.push({ total: somaFinal });
  return res.json(finalData);
});

export default routes;

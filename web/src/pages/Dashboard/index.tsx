import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import LogoImg from '../../assets/teste.png';

import { Title, Form, Movies } from './styles';

interface Movie {
  year: number;
  movies: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleAddMovie(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get(`?movieName=${movieName}`);

    const newMovies = response.data;

    setMovies(oldMovies => [...oldMovies, ...newMovies]);
    setMovieName('');
  }

  return (
    <>
      <img src={LogoImg} alt="Movie-Finder" />
      <Title>Explore filmes em suas datas</Title>
      <Form onSubmit={handleAddMovie}>
        <input
          value={movieName}
          onChange={e => setMovieName(e.target.value)}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Movies>
        {movies &&
          movies.map(movie => (
            <a key={movie.year} href="/">
              <div>
                <strong>{movie.year}</strong>
                <p>{movie.movies}</p>
                <strong>{movie.total}</strong>
              </div>
            </a>
          ))}
      </Movies>
    </>
  );
};

export default Dashboard;

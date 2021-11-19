import { useEffect, useState } from 'react';

import { MovieCard } from './components/MovieCard';

// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { GenreMovieProvider } from './GenreMovieContext'

export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenreMovieProvider>
        <SideBar />
        <Content />
      </GenreMovieProvider>
    </div>
  )
}
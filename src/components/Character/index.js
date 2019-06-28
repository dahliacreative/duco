import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./styles.module.sass";
import api from "../../api";
import moment from "moment";

const titleCase = string => string.replace(/^\w/, c => c.toUpperCase());

const Character = ({ history, match }) => {
  const [isLoading, setLoading] = useState(true);
  const [character, setCharacter] = useState();
  const [films, setFilms] = useState([]);
  const [closing, close] = useState(false);

  const storeCharacter = useCallback(
    char => {
      setCharacter({ ...char, lastFetched: Date.now() });
      localStorage.setItem(`people_${match.params.id}`, JSON.stringify(char));
    },
    [setCharacter, match.params.id]
  );

  const storeFilm = useCallback((film, title) => {
    localStorage.setItem(
      film,
      JSON.stringify({ title, lastFetched: Date.now() })
    );
  }, []);

  useEffect(() => {
    const cachedChar = localStorage.getItem(`people_${match.params.id}`);
    const character = cachedChar ? JSON.parse(cachedChar) : null;
    if (character && moment() < moment(character.lastFetched).add(1, "d")) {
      setCharacter({ ...character });
    } else {
      api
        .get(`people/${match.params.id}/`)
        .then(res => storeCharacter(res.data));
    }
  }, [match.params.id, storeCharacter]);

  useEffect(() => {
    if (character) {
      const promises = character.films.map(film => {
        const cachedFilm = localStorage.getItem(film);
        const parsedFilm = cachedFilm ? JSON.parse(cachedFilm) : null;
        if (
          parsedFilm &&
          moment() < moment(parsedFilm.lastFetched).add(1, "d")
        ) {
          return parsedFilm.title;
        } else {
          return api
            .get(film.replace("https://swapi.co/api/", ""))
            .then(res => {
              storeFilm(film, res.data.title);
              return res.data.title;
            });
        }
      });
      Promise.all(promises).then(films => {
        setFilms(films);
        setLoading(false);
      });
    }
  }, [character, storeFilm]);

  useEffect(() => {
    if (closing) {
      setTimeout(() => {
        history.goBack();
      }, 500);
    }
  }, [closing, history]);

  return (
    <div className={cx([styles.wrapper, closing && styles.closeModal])}>
      <div className={styles.container}>
        <button
          className={cx([styles.closeButton, !isLoading && styles.show])}
          onClick={() => close(true)}
        />
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          <div className={cx([styles.panel, closing && styles.closePanel])}>
            <h1 className={styles.title}>{character.name}</h1>
            <div className={styles.grid}>
              <dl className={styles.list}>
                <dt>Gender</dt>
                <dd>{titleCase(character.gender)}</dd>
                <dt>Birth Year</dt>
                <dd>{character.birth_year}</dd>
                <dt>Eye Color</dt>
                <dd>{titleCase(character.eye_color)}</dd>
                <dt>Hair Color</dt>
                <dd>{titleCase(character.hair_color)}</dd>
                <dt>Skink Color</dt>
                <dd>{titleCase(character.skin_color)}</dd>
                <dt>Mass</dt>
                <dd>{character.mass}</dd>
                <dt>Height</dt>
                <dd>{character.height}</dd>
              </dl>
              <dl className={styles.list}>
                <dt>Films</dt>
                {films.map(film => (
                  <dd key={film}>{film}</dd>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Character.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Character;

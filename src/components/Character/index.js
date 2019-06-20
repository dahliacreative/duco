import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./styles.module.sass";
import api from "../../api";

const titleCase = string => string.replace(/^\w/, c => c.toUpperCase());

const Character = ({ history, match }) => {
  const [isLoading, setLoading] = useState(true);
  const [character, setCharacter] = useState();
  const [films, setFilms] = useState([]);
  const [closing, close] = useState(false);

  useEffect(() => {
    api.get(`people/${match.params.id}/`).then(res => setCharacter(res.data));
  }, [match.params.id]);

  useEffect(() => {
    if (character) {
      const promises = character.films.map(film =>
        api
          .get(film.replace("https://swapi.co/api/", ""))
          .then(res => res.data.title)
      );
      Promise.all(promises).then(films => {
        setFilms(films);
        setLoading(false);
      });
    }
  }, [character]);

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

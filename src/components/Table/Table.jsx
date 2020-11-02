import React, { useContext, useState, useEffect } from 'react';
import './Table.scss';
import Favourite from '../../assets/images/icons/favourite.svg';
import Store from '../../store';
import { apiPath } from 'services/api';

const Table = ({ title, playlist, dense, hideImage }) => {
  const { state, setState } = useContext(Store);
  console.log(playlist);
  const { FavouriteItem, setFavorite } = useState([])

  const setPlaylist = (index) => {
    console.log(state);
    setState('player', {
      playlist: [...playlist],
      title: title,
      index: index,
      play: true,
    });
  };

  const handleFavorite = async (value) => {
    const FavouriteItem = await api.post('music/favorite',{value})
  };  

  const hadleFavoriteSubmit = async (e) => {
    e.preventDefault();

    const favorites = await handleFavorite(FavouriteItem);
    setState('favorites', {
      FavoriteItem,
      favorites
    });

  }

  if (!playlist || !playlist[0] || !playlist[0].artist.name) return <></>;
  return (
    <div>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {!dense && <th></th>}
            {!dense || !hideImage && <th></th>}
            <th>Song</th>
            {!dense && <th>Artist</th>}
            {!dense && <th>Time</th>}
          </tr>
        </thead>
        <tbody>
          {playlist.map((item, index) => {
            return (
              <tr
                onClick={() => {
                  setPlaylist(index);
                }}
                key={item.id}
              >
                <td>{index + 1}</td>
                {!dense && (
                  <td>
                  <button className="favoritesbutton"
                      value={item.id}
                      onChange={(e) => {
                      setFavorite(e.target.value);
                  }}><img src={Favourite} />
                    </button>
                    
                  </td>
                )}
                {!dense || !hideImage && (
                  <td>
                    <img src={item.album.cover_small} alt="favourite" />
                  </td>
                )}

                <td>{item.title}</td>
                {!dense && <td>{item.artist.name}</td>}
                {!dense && <td>{item.duration}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

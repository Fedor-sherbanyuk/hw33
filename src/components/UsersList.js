import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

const API_URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_URL_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
const API_URL_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

const Albums = () => {
    const { userId } = useParams();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`${API_URL_ALBUMS}?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch albums');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, [userId]);

    return (
        <div>
            <h2>Альбоми</h2>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.title}
                        <Link to={`/photos/${album.id}`}>Фото</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

const Photos = () => {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${API_URL_PHOTOS}?albumId=${albumId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photos');
                }
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
        fetchPhotos();
    }, [albumId]);

    return (
        <div>
            <h3>Фото</h3>
            <ul>
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL_USERS);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Router>
            <div>
                <h1>Список користувачів</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name}
                            <Link to={`/albums/${user.id}`}>Альбоми</Link>
                        </li>
                    ))}
                </ul>
                <Routes>
                    <Route path="/albums/:userId" element={<Albums />} />
                    <Route path="/photos/:albumId" element={<Photos />} />
                </Routes>
            </div>
        </Router>
    );
};

export default UsersList;

import React from 'react';
import { useState, useEffect } from 'react'
import { fireDb } from '../firebase';
import { ref, onValue, remove } from 'firebase/database'
import { toast } from 'react-toastify';

const Home = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        const collectionContacts = ref(fireDb, "contacts")
        onValue(collectionContacts, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
            } else {
                setData({})
            }
        })
    })

    const supprimer = (id) => {
        if (window.confirm('Etes vous sûre de vouloir supprimer ?')) {
            const collectionContacts = ref(fireDb, `contacts/${id}`)
            remove(collectionContacts, (err) => {
                if (err) {
                    toast.error(err)
                } else {
                    toast.success("Le contact a été supprimer")
                }
            })
        }
    }

    return (
        <div>
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1} </th>
                                    <td>{data[id].name} </td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].contact}</td>
                                    <td>
                                        <button type="button" class="btn btn-secondary">Voir</button>
                                        <button type="button" class="btn btn-warning">Modifier</button>
                                        <button type="button" class="btn btn-danger" onClick={() => supprimer(id)}>Supprimer</button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Home;
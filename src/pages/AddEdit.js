import React, { useState, useEffect } from 'react';
import { fireDb } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { push, ref, onValue } from 'firebase/database';





const initialState = { name: "", email: "", contact: "" }
const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const contactsRef = ref(fireDb, 'contacts');
        onValue(contactsRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initialState })
        }

        return () => {
            setState({ ...initialState })
        };

    }, [id, data])
    const changerValeurInput = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    const soumettreFormulaire = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("S'il vous plait veuillez entrer les valeurs de chaques champs")
        } else {
            console.log("avant")
            push(ref(fireDb, "contacts"), state, (err) => {
                if (err) {
                    toast.error(err.message)
                } else {
                    toast.success("Le contact a été crée")
                }
            })
            setTimeout(() => navigate("/"), 700);
        }

    }
    return (
        <div>
            <form onSubmit={soumettreFormulaire}>
                <div class="mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" name='name' onChange={changerValeurInput} class="form-control" id="name" aria-describedby="emailHelp" />

                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name='email' onChange={changerValeurInput} class="form-control" id="email" aria-describedby="emailHelp" />

                </div>

                <div class="mb-3">
                    <label for="contact" class="form-label">Numéro</label>
                    <input type="number" name='contact' onChange={changerValeurInput} class="form-control" id="contact" aria-describedby="emailHelp" />

                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddEdit;
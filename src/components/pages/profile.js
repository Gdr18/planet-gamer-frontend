import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

import Navigation from '../navigation/navigation';
import Footer from '../footer';

import { TbEdit } from 'react-icons/tb';

import { useLoginContext } from '../../contexts/login-context';
import { useCartContext } from '../../contexts/cart-context';

export default function Profile() {
    const { loggedUser, handleLogout } = useLoginContext()
    const { cleaningBasket } = useCartContext()

    const history = useHistory();

    const [editUser, setEditUser] = useState(true)
    const [editAddress, setEditAddress] = useState(true)

    const [addressForm, setAddressForm] = useState({
        street: "",
        second_line_street: "",
        postal_code: "",
        city: ""
    });

    const [userForm, setUserForm] = useState({
        name: loggedUser.name,
        surnames: loggedUser.surnames,
        email: loggedUser.email,
        password: "",
        phone_number: loggedUser.phone_number,
        admin: loggedUser.admin
    })

    const [ordersUser, setOrdersUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/address-user/${loggedUser.id}`, { withCredentials: true })
            .then(response => {
                if (Object.keys(response.data).length > 0) {
                    setAddressForm(response.data);
                }
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${loggedUser.id}`, { withCredentials: true })
            .then(response => {
                if (response.data.length) {
                    setOrdersUser(response.data);
                }
            })
    }, [])

    const handleSubmitUser = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/user/${loggedUser.id}`, userForm, { withCredentials: true })
            .then(response => {
                setEditUser(!editUser);
                setUserForm({ ...response.data, password: "" });
            })
            .catch(error => {
                console.log(error, "algo ha salido mal con el putting del user")
            })
    }

    const handleChangeUser = (event) => {
        setUserForm({
            ...userForm,
            [event.target.name]: event.target.value
        });
    }

    const handleChangeAddress = (event) => {
        setAddressForm({
            ...addressForm,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmitAddress = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:5000/address/${loggedUser.id}`, addressForm, { withCredentials: true })
            .then(response => {
                setEditAddress(!editAddress);
                setAddressForm(response.data);
            })
            .catch(error => {
                console.log(error, "algo ha salido mal con posting address")
            })
    }

    const deletingUser = () => {
        let confirmDelete = confirm("Estás segurx de que quieres salir de nuestra órbita para siempre? 😔")

        if (confirmDelete) {
            handleLogout();
            cleaningBasket();
            axios.delete(`http://localhost:5000/user/${loggedUser.id}`, { withCredentials: true })
                .then(response => {
                    history.push('/');
                })
                .catch(error => {
                    console.log(error, "Algo ha salido mal borrando al usuario")
                })
        } else {
            alert("Gracias por continuar con nosotrxs!!🤗")
        }
    }

    return (
        <div>
            <Navigation />
            <div className='profile-wrapper'>
                <div className='profile-container'>
                    <div className='profile-title-wrapper'>
                        <div className='profile-title'>Perfil</div>
                        {loggedUser.admin ? (
                            <div className='admin-wrapper'>
                                <div>Admin User</div>
                                <Link to={`/game-manager/${loggedUser.password}`}><div>Game Manager <TbEdit className='icon-edit'/></div></Link>
                            </div>
                        ) : null}
                    </div>
                    <div className='form-wrapper'>
                        <div className='form-title-wrapper'>
                            <div className='universal-title'>Datos Personales</div>
                            <TbEdit className='edit-icon' onClick={() => setEditUser(!editUser)} />
                        </div>
                        <form onSubmit={handleSubmitUser}>
                            <div className='two-column'>
                                <input disabled={editUser} type='text' name='name' value={userForm.name} onChange={handleChangeUser} placeholder='Nombre' required />
                                <input disabled={editUser} type='text' name='phone_number' value={userForm.phone_number} onChange={handleChangeUser} placeholder='Teléfono' />
                            </div>
                            <div className='one-column'>
                                <input disabled={editUser} type='text' name='surnames' value={userForm.surnames} onChange={handleChangeUser} placeholder='Apellidos' />
                            </div>
                            <div className='two-column'>
                                <input disabled={editUser} type='email' name='email' value={userForm.email} onChange={handleChangeUser} placeholder='Email' required />
                                <input disabled={editUser} type='password' name='password' value={userForm.password} onChange={handleChangeUser} placeholder="••••••••••" />
                            </div>
                            <div className='button-wrapper'>
                                <button disabled={editUser} type='submit'>Guardar</button>
                                <div className='unsubscribe' onClick={deletingUser}>Darse de baja</div>
                            </div>
                        </form>
                    </div>
                    <div className='form-wrapper'>
                        <div className='form-title-wrapper'>
                            <div className='universal-title'>Dirección</div>
                            <TbEdit className='edit-icon' onClick={() => setEditAddress(!editAddress)} />
                        </div>
                        <form onSubmit={handleSubmitAddress}>
                            <div className='one-column'>
                                <input disabled={editAddress} type='text' name='street' value={addressForm.street} onChange={handleChangeAddress} placeholder='Dirección Línea 1' required />
                            </div>
                            <div className='one-column'>
                                <input disabled={editAddress} type='text' name='second_line_street' value={addressForm.second_line_street} onChange={handleChangeAddress} placeholder='Dirección Línea 2' required />
                            </div>
                            <div className='two-column'>
                                <input disabled={editAddress} type='number' maxLength='5' name='postal_code' value={addressForm.postal_code} onChange={handleChangeAddress} placeholder='Código Postal' required />
                                <input disabled={editAddress} type='text' name='city' value={addressForm.city} onChange={handleChangeAddress} placeholder='Ciudad' required />
                            </div>
                            <div className='button-wrapper'>
                                <button disabled={editAddress} type='submit'>Guardar</button>
                            </div>
                        </form>
                    </div>
                    {ordersUser.length ? (
                        <div className='form-wrapper'>
                            <div className='universal-title'>Pedidos</div>
                            <div className='orders-wrapper'>{
                                ordersUser.map(order => {
                                    let date = order.date
                                    return (
                                        <div key={order.id} className='order-item'>
                                            <span>{`#${order.id}`}</span>
                                            <div className='divs'>Fecha: <span>{date}</span></div>
                                            <div className='divs'>Artículos: <span>{order.qty}</span></div>
                                            <div className='divs'>Importe: <span>{order.total}</span>€</div>
                                        </div>
                                    )
                                })
                            }</div>
                        </div>
                    ) : null}
                </div>
            </div>
            <Footer />
        </div>
    )
}
import React, { useEffect } from 'react';
import axios from 'axios';

export default function FormAddress({ setSteps, user, setUser, address, setAddress, loggedUser }) {

    useEffect(() => {
        axios.get(`http://localhost:5000/address-user/${loggedUser.id}`, { withCredentials: true })
            .then(response => {
                if (Object.keys(response.data).length > 0) {
                    setAddress(response.data)
                }
            })
            .catch(error => {
                console.log(error, "algo ha salido mal con el posting de address")
            })
    }, [])

    const puttingUser = () => {
        axios.put(`http://localhost:5000/user/${loggedUser.id}`, user, { withCredentials: true })
            .then(response => {
            })
            .catch(error => {
                console.log(error, "algo ha salido mal con el posting de address")
            });
    }

    const postingAddress = () => {
        axios.post(`http://localhost:5000/address/${loggedUser.id}`, address, { withCredentials: true })
            .then(response => {
            })
            .catch(error => {
                console.log(error, "algo ha salido mal con el posting de address")
            });
    }

    const handleChangeAddress = (event) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        });
    }

    const handleChangeUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSteps(2);
        postingAddress();
        puttingUser();
    }

    return (
        <div className='address-container'>
            <div className='title-checkout'>Datos Envío</div>
            <form className='form-address-wrapper' onSubmit={handleSubmit}>
                <div className='one-column'>
                    <input name='name' value={user.name} type='text' placeholder='Name' onChange={handleChangeUser} required />
                </div>
                <div className='one-column'>
                    <input name='surnames' value={user.surnames} type='text' placeholder='Apellidos' onChange={handleChangeUser} required />
                </div>
                <div className='one-column'>
                    <input name='street' value={address.street} type='text' placeholder='Dirección Línea 1' onChange={handleChangeAddress} required />
                </div>
                <div className='two-column'>
                    <input name='second_line_street' value={address.second_line_street} type='text' placeholder='Dirección Línea 2' onChange={handleChangeAddress} />
                    <input name='phone_number' value={user.phone_number} type='text' maxLength={9} placeholder='Teléfono' onChange={handleChangeUser} required/>
                </div>
                <div className='two-column'>
                    <input name='postal_code' value={address.postal_code} type='text' maxLength={5} placeholder='Código Postal' onChange={handleChangeAddress} required />
                    <input name='city' value={address.city} type='text' placeholder='Ciudad' onChange={handleChangeAddress} required />
                </div>
                <div className='button-direction'>
                    <button>Siguiente</button>
                </div>
            </form>
        </div>
    )
}
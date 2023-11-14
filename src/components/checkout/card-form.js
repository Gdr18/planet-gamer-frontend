import React, { useState } from 'react';
import axios from 'axios';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useCartContext } from '../../contexts/cart-context';

export default function CardForm({ setSteps, loggedUser, setOrder, order }) {
    const stripe = useStripe();
    const elements = useElements();

    const { cleaningBasket, setCheckingCheckout } = useCartContext()

    const [errorText, setErrorText] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);

    const CARD_ELEMENT_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
            base: {
                iconColor: "#995099",
                color: "#cbcbcb",
                fontSize: "18px",
                "::placeholder": {
                    color: "#777777",
                },
            },
            invalid: {
                color: "#e5424d",
                ":focus": {
                    color: "#e5424d",
                },
            },
        },
    };    

    const handleSubmitCard = async (event) => {
        event.preventDefault();
        setDisabledButton(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })

        if (error) {;
            setErrorText(error.message);
            setDisabledButton(false);
        } else {
            axios.post(`https://planet-gamer-backend-a5283f6df278.herokuapp.com/order/${loggedUser.id}`, order, { withCredentials: true })
            .then(response => {
                setCheckingCheckout(true);
                cleaningBasket();
                setSteps(3);
                setOrder(response.data);
            })
            .catch(error => {
                console.log(error, "error en el posteo de la orden")
            })
        }
    }
    
    return (
        <form className='card-wrapper' onSubmit={handleSubmitCard}>
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
            {errorText !== "" ? (
            <div className='error-text'>{`Error: ${errorText}`}</div>
            ) : null}
            <div className='buttons-wrapper'>
                <button onClick={(event) => {
                    setSteps(1);
                    event.preventDefault();
                }}>Atrás</button>
                <button disabled={disabledButton} type='submit' variant='contained'>Pagar</button>
            </div>
        </form>
    )
}
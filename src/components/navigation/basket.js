import React from "react";
import { useHistory } from "react-router-dom";

import { VscClose } from 'react-icons/vsc';

import { useCartContext } from '../../contexts/cart-context';
import { useLoginContext } from '../../contexts/login-context';

export default function Basket({ handleIconLogin, setMessageRegister, handleIconBasket }) {
    const { deleteGame, total, basketItems } = useCartContext()
    const { loggedUser } = useLoginContext()

    const history = useHistory();
    
    const handlePurchaseBotton = () => {
        if (loggedUser !== "") {
            setMessageRegister(false);
            history.push(`/checkout/${loggedUser.id}`);
            handleIconBasket();
        } else {
            setMessageRegister(true);
            handleIconLogin();
        }
    }

    return(
        <div>
            <div className="items-basket-wrapper">
                {basketItems.length ? (<div className="basket-title">Cesta</div>) : null}
                {basketItems.map(game => { 
                return(
                    <div key={game.id} className='item-wrapper'>
                        <div className="item-container">
                            <img src={game.img} />
                            <div className="title-item">{game.qty}</div>
                            <div className='title-item'>{game.title}</div>
                            <div className='title-item'>{`${game.price}€`}</div>
                            <VscClose className='delete-icon' onClick={() => deleteGame(game)}/>
                        </div>
                    </div>
                )})}
                {basketItems.length ? (
                <div className="total-wrapper">
                    <div>{`Total: ${Math.floor(total * 100) / 100}€`}</div>
                    <button onClick={() => handlePurchaseBotton()}>Tramitar pedido</button>
                </div>
                ) : null}
                {!basketItems.length ? (
                <div className='empty-basket'>La cesta está vacía</div>
                ) : null}
                
            </div>
        </div>
    )
}
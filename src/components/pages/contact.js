import React from 'react';
import { Link } from "react-router-dom";

import Navigation from '../navigation/navigation';

import SaturnoIcon from '../icons/saturno-icon';
import { TfiInstagram, TfiTwitter, TfiLinkedin } from 'react-icons/tfi'

export default function Contact() {
    return (
        <div>
            <Navigation />
            <div className='home-wrapper'>
                <div className='boxes'>
                    <div className='text universal'>
                        <p>Siendo una empresa pequeña, tenemos un largo recorrido. Empezamos en una tienda física en 1997 y ahora seguimos nuestra andanza con la venta online. En Planet Gamer queremos ofrecerte la mejor de las experiencias y el mejor de los servicios. Por eso siempre estaremos disponibles para ti, para escucharte.</p>
                    </div>

                    <div className='complet-brand universal'>
                        <div>Planet Gamer</div>
                        <div>Videogames</div>      
                    </div>

                    <div className='logo universal'>
                        <SaturnoIcon fill='#92e678' width={200} height={200} />
                    </div>

                    <div className='contact universal'>
                        <div>Contacta con nosotros</div>
                        <p>666444222</p>
                        <p>contact@planetgamer.com</p>
                        <div className='icons-rrss-wrapper'>
                            <Link to="#"><TfiInstagram className='icons-rrss'/></Link>
                            <Link to="#"><TfiTwitter className='icons-rrss'/></Link>
                            <Link to="#"><TfiLinkedin className='icons-rrss'/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
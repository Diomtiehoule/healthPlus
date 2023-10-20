import React from 'react';
import '../composant/css/navbarhome.css'

function NavBarHome() {
    return (
        <div className='body_home'>
            <nav>
               <h1>Health<span>+</span></h1>
               <ul>
                <li>Accueil</li>
                <li>Hôpital</li>
                <li>Conseil</li>
                <li>En cas d'urgence</li>
               </ul>

               <p>Connexion</p>
            </nav>
        </div>
    );
}

export default NavBarHome;
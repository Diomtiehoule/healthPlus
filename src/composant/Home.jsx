import React from 'react';
import '../composant/css/home.css'
import photo from '../media/image3.jpg'
import photo1 from '../media/image5.jpg'
import photo2 from '../media/image12.jpg'


function Home() {
    return (
        <div>
            <div className="main_image">
                <h1>Les Hôpitaux et services de sante sont nos heros du quotidien ,  rejoignez-nous  pour maximiser les sauvetage d’urgence</h1>
                <div className="zone_register">
                    <button>Hôpital</button>
                    <button>Service d'urgence</button>
                </div>
            </div>

            <div className="presentation">

            <h1>Health+</h1>
            <p>Health+ est une structure qui mets aux service des urgence une liste des hôpital disponible les plus proche pour préparer et accueillir une urgence de façon éfficace afin de maximiser le taux de sauvetage</p>

            </div>

            <h1 className='relation'>La relation hôpital et service d'urgence , comment sa fonctionne ?</h1>
            <div className="carte-acc">
        <div className="form-acc">
          <h4>Hôpitaux</h4>
          <img src={photo1} alt="" />
          <p>
            Nous nous chargeons d'enregistrer les meilleurs service de sante disponible  pour toute les urgence afin de faire les meilleurs propositions d'acceuil possible lors des urgence.
          </p>
        </div>
        <div className="form-acc">
          <h4>Service d'urgence</h4>
          <img src={photo} alt="" />
          <p>Nous fournissons toutes les informations à propos des hôpitaux  qui seront les plus prompt selon les informations des ambulanciers sur place pour une prise de decision simple.</p>
        </div>
        <div className="form-acc">
          <h4>Intervention</h4>
          <img src={photo2} alt="" />
          <p>Une fois la communication établit entre les ambulanciers et les hôpitaux receptrices , celles-ci sont préparer à recevoir l'urgence pour une prise en charge rapide et éfficace.</p>
        </div>
      </div>
            

        </div>
    );
}

export default Home;
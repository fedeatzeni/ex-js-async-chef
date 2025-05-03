/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). 
Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef

Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch
*/

/* 
Bonus 1
Attualmente, se la prima richiesta non trova una ricetta,
 la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.
*/

/*
Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
Esempio di output atteso con formattazione
Data di nascita dello chef: 15/06/1990
*/

const dayjs = require('dayjs')

const getChefBirthday = async (id) => {

    let ricetta;
    try {
        const ricettaResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricetta = await ricettaResponse.json();
    } catch (error) {
        throw new Error(`Non posso recuperare la ricetta con id: ${id}`)
    }

    let userId;
    try {
        const userIdResponse = await fetch(`https://dummyjson.com/users/${ricetta.userId}`)
        userId = await userIdResponse.json();
    } catch (error) {
        throw new Error(`Non posso recuperare lo chef con id: ${ricetta.userId}`)
    }

    // console.log(ricetta);
    // console.log(userId);

    return userId.birthDate
}

getChefBirthday(1)
    .then(birthday => console.log("Data di nascita dello chef:", dayjs(birthday).format('DD/MM/YYYY')))
    .catch(error => console.error("Errore:", error.message));
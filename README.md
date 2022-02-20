# Backend del progetto SUSHI

Idea del progetto: 
senza utilizzare un backend, per avere dei dati temporanei che permettono di creare una lista di ordini, gli ordini vengono creati in un file temporaneo dalla durata di un certo tempo 
Per questo utilizzo il package:
- node-persist: JSON documents are stored in the file system for persistence. - stessa logica del session storage di un browser
- ogni tavolo avra un ttl di 4 ore

idea: 
cliente: chiedi tavolo(portate,numero persone,)
server: crea un entry con ({#portate,nomi persone},{,persone che si sono loggate}) esempio
                         "otp":{chiavetavolo:({portate:150,{matteo:"",gianni:"",alex:""},{loggati:1/5}})}
        restituisci("otp") + cookie con dentro la chiave del tavolo
cliente: mostra l'otp alle persone al tavolo, ognuno fa la sua richiesta con l' "otp"
server:  conta quante persone si sono loggate, se si sono loggate tutte e 5 non accetta piu login.




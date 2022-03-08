# Backend del progetto SUSHI

---
- npm install
- npm run start  -per avviare il server
---

## API CALLS 

| **METHOD** 	| **ENDPOINT**  	| **DESCRIZIONE**                       	|
|------------	|---------------	|---------------------------------------	|
| POST       	| /createTable  	| [crea un nuovo tavolo](#crea-nuovo-tavolo)    |
| POST       	| /newUser      	| [aggiungi un nuovo utente al tavolo](#aggiungi-nuovo-utente)   	|
| POST       	| /newOrder     	| [utente crea un nuovo ordine](#crea-ordine)           	|
| GET        	| /complete/:id 	| [visualizza ordine completo del tavolo](#visualizza-ordine-completo) 	|
| GET           | /thisTable/:id    | [visualizza tavolo](#visualizza-tavolo) |
|DELETE         | /clearOrders/:id  | [svuota tutte le ordinazioni del tavolo](#svuota-tutti-gli-ordini) |

- Nel caso la richiesta non vada a buon fine, ricevi un response con un errorCode non nullo, se l'errorCode non è nullo vuol dire che c'è anche un messaggio. in ogni caso se ricevi uno status > 400 dal server vuol dire che c'è stato un errore

## Esempio di richiesta e risposta:

### Crea nuovo tavolo

- #### Request Body
- 
```json
{"portate":500,"coperti":4,"nome":"MATTEO"}
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": {
        "infoTavolo": {
            "coperti": 4,
            "portate": 500,
            "utenti": [
                {
                    "nome": "MATTEO",
                    "ordinazione": [],
                    "id": "E8XH6H"
                }
            ],
            "codiceTavolo": "UCTBU"
        },
        "utente": {
            "nome": "MATTEO",
            "ordinazione": [],
            "id": "E8XH6H"
        }
    }
}
```
### Aggiungi nuovo utente

- #### Request Body
- 
```json
{"idTavolo":"UCTBU","nome":"GIANLUCA"}
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": {
        "infoTavolo": {
            "coperti": 4,
            "portate": 500,
            "utenti": [
                {
                    "nome": "MATTEO",
                    "ordinazione": [],
                    "id": "E8XH6H"
                },
                {
                    "nome": "GIANLUCA",
                    "ordinazione": [],
                    "id": "RHNTHI"
                }
            ],
            "codiceTavolo": "UCTBU"
        },
        "utente": {
            "nome": "GIANLUCA",
            "ordinazione": [],
            "id": "RHNTHI"
        }
    }
}
```
### Crea ordine

- #### Request Body
- 
```json
{"idUtente":"RHNTHI","idTavolo":"UCTBU","piatti":[{"id":11,"qnt":3},{"id":111,"qnt":11},{"id":122,"qnt":33}]}
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": {
        "coperti": 4,
        "portate": 500,
        "utenti": [
            {
                "nome": "MATTEO",
                "ordinazione": [],
                "id": "E8XH6H"
            },
            {
                "nome": "GIANLUCA",
                "ordinazione": [
                    {
                        "id": 11,
                        "qnt": 3
                    },
                    {
                        "id": 111,
                        "qnt": 11
                    },
                    {
                        "id": 122,
                        "qnt": 33
                    }
                ],
                "id": "RHNTHI"
            }
        ]
    }
}
```
### Visualizza ordine completo

l'endpoint in questo esempio è: 
- /complete/UCTBU
- #### Request Body
- 
```json
//nessun body per questa richiesta get
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": [
        {
            "id": "11",
            "qnt": 3
        },
        {
            "id": "111",
            "qnt": 11
        },
        {
            "id": "122",
            "qnt": 33
        }
    ]
}
```

### Svuota tutti gli ordini

l'endpoint in questo esempio è:
- /clearOrders/UCTBU


- #### Request Body
- 
```json
nessun body per questa richiesta
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": {
        "coperti": 4,
        "portate": 500,
        "utenti": [
            {
                "nome": "MATTEO",
                "ordinazione": [],
                "id": "E8XH6H"
            },
            {
                "nome": "GIANLUCA",
                "ordinazione": [],
                "id": "RHNTHI"
            }
        ]
    }
}
```
### Visualizza Tavolo
endpoint in questo esempio è 
/thisTable/UCTBU
```json
nessun body per questa richiesta
```
- #### Response Body

```json
{
    "errorCode": null,
    "errorDescription": null,
    "payload": {
        "coperti": 4,
        "portate": 500,
        "utenti": [
            {
                "nome": "MATTEO",
                "ordinazione": [],
                "id": "E8XH6H"
            },
            {
                "nome": "GIANLUCA",
                "ordinazione": [],
                "id": "RHNTHI"
            }
        ]
    }
}
```



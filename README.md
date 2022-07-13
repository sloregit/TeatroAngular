## Progetto per l' Esame di Sviluppo di Servizi Web, anno 2021/22.

#### L'applicazione gestisce le prenotazioni per tutte le sale inserite all'interno del database. Ad ogni sala è associata una chiave univoca.

### 4 component, 1 Service, 1 file classiComuni.ts per le classi comuni:

#### classiComuni.ts

Contiene le classi utilizzate in più component, ho preferito utilizzare un file separato per semplificare il ritrovamento e la gestione di eventuali problemi.

#### TeatroDBservice(2 classi):

##### TeatroDBservice

setPrenotazioni: richiede i dati al database

getPrenotazioni: invia i dati al database

getNewKey: richiede una nuova chiave

##### GeneraTeatro

Genera un nuovo teatro e lo imposta con i valori ricevuti

#### App.component

Gestisce tutte le comunicazioni con TeatroDBservice che servono per recuperare o aggiornare i dati del Teatro.

Le prenotazioni in ingresso vengono ricevute, parsate ed inviate come Observable a TeatroComponent. I dati ricevuti vengono memorizzati in 'teatro$'.

Quando viene ricevuta una prenotazione, essa contiene il nome, la zona, la fila e il posto da aggiornare. Con questi, teatro$ viene aggiornato e il tutto viene inviato al database come stringa json.

#### Teatro.component

Il teatro vero e proprio, i dati vengono raccolti ed elaborati nella funzione OnInit, invocata subito dopo la creazione del component.

Quando viene effettuata una prenotazione, rapida o normale, si innesca (prenotazione Emitter) che, inviando la nuova prenotazione al parent fa aggiornare il teatro.

Ogni nuova prenotazione è istanza della classe Prenotazione:

```
Prenotazione(nomePrenotazione, zona, fila, posto)
```

#### Login.component

La pagina di login.
Passa al parent la chiave utente e il tipo di prenotazione nel momento in cui si decide di procedere con la prenotazione

#### Gestione.component

Permette di creare una nuova sala e di inserirla in corrispondenza della chiave posseduta. Al bisogno, è possibile richiedere una nuova chiave.

Gestione svolge un compito diverso rispetto agli altri e non ha a che fare con le prenotazioni, perciò è stato pensato come un component a sé stante ed ho preferito renderlo indipendente per quanto riguarda le comunicazioni con il server.

Gli array fileMax,postiMax erano necessari per utilizzare i select + option.
Ho preferito questa soluzione perchè, oltre alla questione estetica, mi sembrava migliore dal punto di vista della sicurezza, evitandomi di utilizzare troppi campi Input.

Una volta inseriti tutti i campi è possibile generare un nuovo teatro, l'operazione viene gestita con la classe @injectable GeneraTeatro che crea un nuovo teatro vuoto delle dimensioni indicate.

## angular-ivy-xzskob

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-xzskob)

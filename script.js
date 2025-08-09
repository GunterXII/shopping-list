// Prendo gli elementi del DOM
const lista = document.querySelector("#shopping-list"); // Elemento ul dove verranno aggiunti i prodotti
const form = document.querySelector("#shopping-form"); // Form per aggiungere nuovi prodotti
const totalItemsEl = document.querySelector("#total-items"); // Elemento per visualizzare il totale prodotti
const totalAmountEl = document.querySelector("#total-amount"); // Elemento per visualizzare il totale spesa
const calculateBtn = document.querySelector("#calculate-total"); // Bottone per calcolare il totale

// Array per memorizzare i prodotti
let prodotti = []; // Ogni prodotto sarà un oggetto con {nome, prezzo, completato}

// Aggiungo event listener al form per gestire l'invio
form.addEventListener("submit", aggiungiProdotto);

// Aggiungo event listener al bottone per calcolare il totale
calculateBtn.addEventListener("click", calcolaTotale);

// Funzione per aggiungere un prodotto alla lista
function aggiungiProdotto(e) {
  e.preventDefault(); // Previene il comportamento predefinito del form (ricaricamento pagina)
  
  // Prendo i valori dagli input
  const nomeProdotto = document.querySelector("#product-name").value.trim(); // Nome prodotto (rimuovo spazi bianchi)
  const prezzoProdotto = parseFloat(document.querySelector("#product-price").value); // Prezzo convertito in numero
  
  // Validazione: controlla se il nome è vuoto
  if (nomeProdotto === "") {
    alert("Per favore, inserisci il nome del prodotto");
    return; // Esce dalla funzione senza aggiungere
  }
  
  // Validazione: controlla se il prezzo è un numero valido
  if (isNaN(prezzoProdotto)) {
    alert("Per favore, inserisci un prezzo valido");
    return; // Esce dalla funzione senza aggiungere
  }
  
  // Aggiungo il prodotto all'array 'prodotti'
  prodotti.push({
    nome: nomeProdotto,
    prezzo: prezzoProdotto,
    completato: false // Inizialmente non completato
  });
  
  // Creo l'elemento <li> per la lista
  const li = document.createElement("li");
  li.classList.add("li"); // Aggiungo classe per stili CSS
  
  // Creo la checkbox per segnare il prodotto come completato
  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("check");
  
  // Aggiungo event listener per il cambiamento della checkbox
  check.addEventListener("change", () => {
    // Aggiunge/rimuove la classe 'completato' all'elemento li
    li.classList.toggle("completato", check.checked);
    
    // Aggiorno lo stato nel nostro array
    const index = Array.from(lista.children).indexOf(li); // Trovo l'indice dell'elemento
    if (index !== -1) {
      prodotti[index].completato = check.checked; // Aggiorno lo stato di completamento
    }
  });
  
  // Creo il div per i dettagli del prodotto (nome e prezzo)
  const card = document.createElement("div");
  card.classList.add("card"); // Classe per stili CSS
  
  // Creo lo span per il nome del prodotto
  const nomeSpan = document.createElement("span");
  nomeSpan.classList.add("product-name");
  nomeSpan.textContent = nomeProdotto; // Imposto il testo
  
  // Creo lo span per il prezzo del prodotto
  const prezzoSpan = document.createElement("span");
  prezzoSpan.classList.add("product-price");
  // Formatto il prezzo con 2 decimali e aggiungo il simbolo €
  prezzoSpan.textContent = prezzoProdotto.toFixed(2) + " €";
  
  // Aggiungo nome e prezzo alla card
  card.appendChild(nomeSpan);
  card.appendChild(prezzoSpan);
  
  // Creo il bottone per eliminare il prodotto
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;"; // Simbolo X
  
  // Evento per eliminare il prodotto
  deleteBtn.addEventListener("click", () => {
    li.remove(); // Rimuovo l'elemento dalla lista
    
    // Rimuovo il prodotto dall'array
    const index = Array.from(lista.children).indexOf(li); // Trovo l'indice
    if (index !== -1) {
      prodotti.splice(index, 1); // Rimuovo 1 elemento a partire da index
    }
    
    aggiornaConteggio(); // Aggiorno il conteggio prodotti
  });
  
  // Creo un div per contenere i controlli (checkbox e bottone elimina)
  const controlsDiv = document.createElement("div");
  controlsDiv.classList.add("controls");
  controlsDiv.appendChild(check); // Aggiungo la checkbox
  controlsDiv.appendChild(deleteBtn); // Aggiungo il bottone elimina
  
  // Aggiungo la card e i controlli all'elemento li
  li.appendChild(card);
  li.appendChild(controlsDiv);
  
  // Aggiungo il li alla lista nel DOM
  lista.appendChild(li);
  
  // Resetto il form per pulire gli input
  form.reset();
  
  // Aggiorno il conteggio dei prodotti
  aggiornaConteggio();
  
  // Animazione per l'elemento appena aggiunto
  li.style.opacity = "0"; // Inizio invisibile
  li.style.transform = "translateY(20px)"; // Spostato verso il basso
  
  // Dopo un breve ritardo, applico le transizioni per animare
  setTimeout(() => {
    li.style.transition = "all 0.3s ease"; // Imposto transizione
    li.style.opacity = "1"; // Diventa visibile
    li.style.transform = "translateY(0)"; // Torna in posizione
  }, 10);
}

// Funzione per calcolare il totale della spesa
function calcolaTotale() {
  let totale = 0; // Inizializzo il totale
  
  // Itero su tutti i prodotti nell'array
  prodotti.forEach(prodotto => {
    // Se il prodotto non è completato, aggiungo il suo prezzo al totale
    if (!prodotto.completato) {
      totale += prodotto.prezzo;
    }
  });
  
  // Aggiorno l'elemento nel DOM con il totale formattato
  totalAmountEl.textContent = totale.toFixed(2) + " €";
  
  // Animazione per evidenziare l'aggiornamento
  totalAmountEl.style.transform = "scale(1.2)"; // Ingrandisco
  totalAmountEl.style.color = "#d9534f"; // Cambio colore
  
  // Dopo 300ms, ripristino lo stato normale
  setTimeout(() => {
    totalAmountEl.style.transform = "scale(1)"; // Torna dimensione normale
  }, 300);
}

// Funzione per aggiornare il conteggio dei prodotti
function aggiornaConteggio() {
  // Aggiorno l'elemento con il numero di prodotti
  totalItemsEl.textContent = prodotti.length;
  
  // Animazione per evidenziare l'aggiornamento
  totalItemsEl.style.transform = "scale(1.2)"; // Ingrandisco
  totalItemsEl.style.color = "#5cb85c"; // Cambio colore temporaneamente
  
  // Dopo 300ms, ripristino lo stato normale
  setTimeout(() => {
    totalItemsEl.style.transform = "scale(1)"; // Torna dimensione normale
    totalItemsEl.style.color = "#555"; // Rimetto colore originale
  }, 300);
}

// Chiamo aggiornaConteggio all'inizio per inizializzare il conteggio a zero
aggiornaConteggio();
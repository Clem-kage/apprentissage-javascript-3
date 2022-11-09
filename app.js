// const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`


let searchBarre = document.querySelector('form input')
let resultArea = document.querySelector('.results-display')
let liste = document.createElement("ul");
resultArea.appendChild(liste);
    // let liste = document.querySelector('ul');

let suppList = () =>{
    console.log('supp')
    // let liste = document.querySelector('ul');
    if(liste){
        while (liste.hasChildNodes()) {
            liste.removeChild(liste.firstChild);
          }
    }
     
    // resultArea.remove()
}
let createList = (el)=>{
    let element = document.createElement('li');
    let link = document.createElement('a');
    link.href = `https://fr.wikipedia.org/wiki/${el.title}`;
    link.textContent = el.title;
    // element.textContent = el.title
    resultArea.appendChild(liste);
    liste.appendChild(element);
    element.appendChild(link);
}

let affichage = (tab)=>{
    console.log('affi')
      tab.forEach(el => {
        console.log("fctaffi")
          createList(el)
      });
}

let appelApi = (value)=>{
    let searchInput = value.target.value;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.query.search)
        let result = data.query.search;
        if(result){
        suppList()
        affichage(result)
        }
    })
 // .then((data) => console.log(data));
}

let action = (e)=>{
   e.preventDefault()
   appelApi(e)
}

searchBarre.addEventListener('input', action)
// const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

// appel su DOM------------------------------
let searchBarre = document.querySelector('form input');
let resultArea = document.querySelector('.results-display');
let liste = document.createElement("ul");
resultArea.appendChild(liste);
let loader = document.querySelector('.loader');
let errorSpace = document.querySelector('.error-msg')
//-----------------------------------------


let suppList = () =>{
    console.log('supp')
    if(liste){
        while (liste.hasChildNodes()) {
            liste.removeChild(liste.firstChild);
          }
    }
}

let createList = (el)=>{
    let element = document.createElement('li');
    let link = document.createElement('a');
    link.href = `https://fr.wikipedia.org/wiki/${el.title}`;
    link.textContent = el.title;
    resultArea.appendChild(liste);
    liste.appendChild(element);
    element.appendChild(link);
    element.style.listStyle = "none"
}

let affichage = (tab)=>{
    let newTab = []
    console.log('affi')
      tab.forEach(el => {
          newTab.push(el);
          createList(el)
      });
     console.log(newTab.length) 
     if(newTab.length < 1){
        errorSpace.textContent = 'aucun résultat'
     }
     else{
        errorSpace.textContent = ''
     }
}

let  appelApi  = async (value)=>{
    let searchInput = value.target.value;
    loading()
     await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.query.search)
        let result = data.query.search;
        if(result){
        suppList()
        affichage(result)
        endLoading()
        }
    })
    .catch((err)=>{
        // errorsituation()
        endLoading()
        suppList()
        errorSpace.textContent = 'problème de réseau'
    })
}

let action = (e)=>{
   e.preventDefault()
   appelApi(e)
}

let loading = ()=>{
      loader.style.display ='flex'
 }
let endLoading = ()=>{
      loader.style.display ='none'
      console.log('endloading')
}


let errorsituation = ()=>{
    alert("problème de connexion");
    // loading()
}

searchBarre.addEventListener('input', action)
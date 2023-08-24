const promise = fetch("http://localhost:5678/api/works")
promise.then((reponse) =>{
  console.log(reponse)
});

const gallery = document.querySelector (".gallery")
const project = document.createElement ("figure")
const img = document.createElement ("img")
const imgTitle = document.createElement ("figcaption")

gallery.appendChild(project);
project.appendChild(img);
project.appendChild(imgTitle);


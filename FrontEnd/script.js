/* afficher dynamiquement les projets*/

fetch("http://localhost:5678/api/works")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de requête réseau');
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let elements = data[i]

      const gallery = document.querySelector(".gallery")


      /* Creation des elements */
      const project = document.createElement("figure")
      const img = document.createElement("img")
      img.src = elements.imageUrl
      const imgTitle = document.createElement("figcaption")
      imgTitle.innerText = elements.title

      gallery.appendChild(project)

      project.appendChild(img)
      project.appendChild(imgTitle)

      project.classList.add("project");
      project.setAttribute("data-category", elements.category.name);

    }
  })

/* Filtrage des projets */

fetch("http://localhost:5678/api/categories")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de requête réseau');
    }
    return response.json();
  })
  .then(dataCategory => {
    // Récupérez la liste des filtres
    const filters = document.querySelectorAll('.filtres div');

    // Écoutez les clics sur les boutons de filtre
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Récupérez le nom de la catégorie du filtre cliqué
        const filterName = filter.textContent.trim(); // Utilisez le contenu textuel du filtre comme catégorie

        // Filtrage des projets en fonction du nom de la catégorie
        const projects = document.querySelectorAll('.project');

        projects.forEach(project => {
          const projectCategory = project.getAttribute('data-category');

          if (filterName !== 'Tous' && filterName !== projectCategory) {
            project.style.display = 'none';
          } else {
            project.style.display = 'block';
          }
        });
      });
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des catégories : ', error);
  });

//Affichage de la modale au clic des bouton modif

const buttonModif1 = document.querySelector('.modif_button');
const buttonModif2 = document.querySelector('.modif_button2');

buttonModif1.addEventListener('click', () => {
  const modale = document.querySelector('.bground');
  modale.style.display = 'block';
})

buttonModif2.addEventListener('click', () => {
  const modale = document.querySelector('.bground');
  modale.style.display = 'block';
})

//Fermeture de la modale au clic de la croix

const xmark = document.querySelector('.fa-xmark')

xmark.addEventListener('click', () => {
  location.reload(true);
})

//Affichage des projets dans la modale

fetch("http://localhost:5678/api/works")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de requête réseau');
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let elements = data[i]

      const galleryModale = document.querySelector(".project-modale")

      // Creation des elements 
      const projectModale = document.createElement("figure")
      const img = document.createElement("img")
      img.src = elements.imageUrl
      const imgTitle = document.createElement("figcaption")
      imgTitle.innerText = elements.title

      galleryModale.appendChild(projectModale)
      projectModale.appendChild(img)
      projectModale.appendChild(imgTitle)

      projectModale.classList.add("project");
      projectModale.setAttribute("data-category", elements.category.name);

      // Suppression des projets
      const corbeille = document.createElement("i");
      const contentCorbeille = document.createElement("div");
      corbeille.classList.add("fa-solid", "fa-trash-can");
      contentCorbeille.appendChild(corbeille);
      projectModale.appendChild(contentCorbeille);

      contentCorbeille.addEventListener("click", () => {
        fetch(`http://localhost:5678/api/works/1`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erreur de requête réseau");
            }
            return response.json(); 
          })
          .then((data) => {
            projectModale.remove();
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  })

// Gestion du mode "connecté" 

function isConnected() {
  if (sessionStorage.getItem("token")) return true;
  else return false;
}

function EditionMode() {

  const modifbarre = document.querySelector(".barre_modification");
  const login_Logout = document.querySelector(".login_logout");
  const modifBtn2 = document.querySelector(".modif_button2");
  const filters = document.querySelector(".filtres");

  if (isConnected() === true) {
    login_Logout.innerText = "logout";
    login_Logout.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.replace("index.html");
    });
    modifbarre.style.display = 'block';
    modifBtn2.style.display = 'block';
    filters.style.display = 'none';
  }
}

EditionMode()

// affichage de la modale2

const boutonAjouter = document.querySelector(".button1")

boutonAjouter.addEventListener('click', () => {
  const modale = document.querySelector('.bground');
  const modale2 = document.querySelector('.bground2');
  modale.style.display = 'none';
  modale2.style.display = 'block';
})

// Retour en arriere modale2
const leftArrow = document.querySelector(".fa-arrow-left")

leftArrow.addEventListener('click', () => {
  const modale = document.querySelector('.bground');
  const modale2 = document.querySelector('.bground2');
  modale2.style.display = 'none';
  modale.style.display = 'block';
})

// Fermeture de la seconde modale avec la seconde croix

const xmark2 = document.querySelector('.xmark2')

xmark2.addEventListener('click', () => {
  location.reload(true);
})





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
    
        const gallery = document.querySelector (".gallery")
        
        /* Creation des elements */
        const project = document.createElement ("figure")
        const img = document.createElement ("img")
        img.src = elements.imageUrl
        const imgTitle = document.createElement ("figcaption")
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

        

        // Mettre en surbrillance le filtre actif
        filters.forEach(f => {
          f.classList.remove('active');
        });
        filter.classList.add('active');
      });
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des catégories : ', error);
  });

  /* Login */

  fetch("http://localhost:5678/api/users/login")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de requête réseau');
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
        let elements = data[i]
    

    } 
  })


  
  




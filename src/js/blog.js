const jsonPath = "../json/posts.json";

const postContainer = document.getElementById("post-container");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao carregar o JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        if (postId) {
            const post = posts.find(p => p.id == postId);
            if (post) { // Foco em um único post
                const thumbnailPath = `../img/thumbnails/${post.id}.png`;
                postContainer.innerHTML = `
                    <style>
                        #post-container{
                            display: block;
                            margin-left: 5%;
                        }

                        .grid-side img{
                            width: 300px;
                            height: 150px;
                        }
                    </style>
                    <div id=grid-container>
                        <div class="grid-post">
                            <h2>${post.title}</h2>
                            <p class="author">Por ${post.author} em ${post.date}</p>
                            <img class="thumbnail" src="${thumbnailPath}" alt="Thumbnail ${post.title}">
                            <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
                            <p class="post-text">${post.content}</p>
                        </div>

                        <div class="grid-side-container"></div>

                    </div>
                `;
            } else {
                postContainer.innerHTML = `<p>Postagem não encontrada.</p>`;
            }
        } else {
            posts.forEach(post => { // Lista de posts na página central do blog
                const thumbnailPath = `../img/thumbnails/${post.id}.png`;
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.innerHTML = `
                <style>
                    #post-container{
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        margin-left: -4vmin;
                    }
                </style>
                    <a href="?id=${post.id}"><img class="img-zoom" src="${thumbnailPath}" alt="Thumbnail ${post.title}"></a>
                    <h2><a href="?id=${post.id}">${post.title}</a></h2>
                    <p class="author">Por ${post.author} em ${post.date}</p>
                    <p>${post.content.substring(0, 100)}...</p>
                `;
                postContainer.appendChild(postElement);
            });
        }
    })
    .catch(error => {
        console.error("Erro ao processar o JSON:", error);
        postContainer.innerHTML = `<p>Erro ao carregar os posts.</p>`;
    });


    async function loadPosts() {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error("Erro ao carregar os posts.");
    
            const posts = await response.json();
    
            const sortedPosts = posts.sort((a, b) => b.id - a.id);
    
            const recentPosts = sortedPosts.slice(0, 3);
    
            const gridSideContainer = document.querySelector('.grid-side-container');
    
            recentPosts.forEach(post => {
                const thumbnailPath = `../img/thumbnails/${post.id}.png`;
                const postHTML = `
                    <div class="grid-side">
                        <a href="?id=${post.id}">
                            <img class="img-zoom" src="${thumbnailPath}" alt="Thumbnail ${post.title}">
                        </a>
                        <h2><a href="?id=${post.id}">${post.title}</a></h2>
                        <p class="author">Por ${post.author} em ${post.date}</p>
                    </div>
                `;
                gridSideContainer.innerHTML += postHTML;
            });
        } catch (error) {
            console.error("Erro ao carregar os posts:", error);
        }
    }

    loadPosts();
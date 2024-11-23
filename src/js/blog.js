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
                    </style>
                    <h2>${post.title}</h2>
                    <p class="author">Por ${post.author} em ${post.date}</p>
                    <img class="thumbnail" src="${thumbnailPath}" alt="Thumbnail ${post.title}">
                    <p>${post.content}</p>
                    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
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

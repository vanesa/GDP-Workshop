var list = document.getElementById("list-of-repositories")

function createParagraph(content){
  var paragraph = document.createElement("p");
  paragraph.innerHTML = content;

  return paragraph;
}

function addRepoToList(name, url){

  var repoContainer = document.createElement("div");
  repoContainer.classList.add("repo-container");

  // Name / URL
  var a = document.createElement("a");
  a.innerHTML = name;
  a.setAttribute("href", url)
  repoContainer.appendChild(a);

  // Add our repo to the list of repos
  list.appendChild(repoContainer);
}
function processResponse(response){
  var edges = response.data.viewer.repositories.edges;
  for(var i = 0; i < 5; i++){
    var edge = edges[i];
    var node = edge.node;
    var name = node.name;
    var url = node.url;

    addRepoToList(name, url);
  }
}

var query = `query {
    viewer {
     repositories(first:5, privacy:PUBLIC, orderBy:{field:CREATED_AT, direction: ASC}) {
       edges {
         node {
           owner {
             login
           }
           name
           url
           stargazers{
             totalCount
           }
           issues{
             totalCount
           }
           pullRequests{
             totalCount
          }
        }
      }
     }
   }
 }
`;

Client.query(query, processResponse)

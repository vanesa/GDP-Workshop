var list = document.getElementById("list-of-repositories")

function addRepoToList(name){
  var p = document.createElement("p");
  p.innerHTML = name;
  list.appendChild(p);
}
function processResponse(response){
  var edges = response.data.viewer.repositories.edges;
  for(var i = 0; i < 5; i++){
    var edge = edges[i];
    var node = edge.node;
    var name = node.name;

    addRepoToList(name);
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
         }
      }
     }
   }
 }
`;

Client.query(query, processResponse)

let username;
$(document).ready(function(){
  $('form').on('submit', function(event){
    event.preventDefault()
    getRepositories()

  })
})

function getRepositories(){
  username = $('#username').val()
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  req.open("GET", 'https://api.github.com/users/'+ username + '/repos')
  req.send()
}

function showRepositories(){
  $('#username').val("")
  let response = this.responseText
  let repositories = JSON.parse(response)
  repositories.forEach(function(repository){
    $('#repositories').append(`<div>${repository.name}<p><a href="#" onClick="getCommits(this)" id="${repository.name}">Get Commits</a></p><p><a href="#" onClick="getBranches(this)" id="${repository.name}">Get Branches</a></p></div>`)
  })
}

function getCommits(context){
  let repositoryName = context.id
  const req = new XMLHttpRequest();
  req.addEventListener("load", processCommitData)
  req.open("GET", 'https://api.github.com/'+ 'repos/'+ username +'/' + repositoryName + '/commits' )
  req.send()
}

function processCommitData(){
  response = this.responseText;
  displayCommits(response)
}

function displayCommits(response){
  data = JSON.parse(response)
  let commits = data.map(function(commit){
    return commit.commit
  })
  $('#details').empty()
  commits.forEach(function(commit){
    $('#details').append(`<div><strong><p>Github Name: ${commit.author.name}</p></strong>
      <p>Commit Message: ${commit.message}</p><p>Email: ${commit.author.email}</p></div>`)

  })
}

function getBranches(context){
  let repositoryName = context.id
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/'+ 'repos/'+ username +'/' + repositoryName + '/branches' )
  req.send()
}

function displayBranches(){
  data = JSON.parse(this.responseText)
  $('#details').empty()
  data.forEach(function(branch){
    $('#details').append(`<p>${branch.name}</p>`)
  })
}

var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');

(function(){

$.ajax('https://api.github.com/users/brownkm5').then(displayUserInfo)
$.ajax('https://api.github.com/users/brownkm5/orgs').then(displayOrgs);
$.ajax('https://api.github.com/users/brownkm5/repos').then(displayUserRepo);

function displayUserRepo(data){
  //console.log(data);
  var repos = data;
  var $repoContainer = $('#repo-list'); //ul that holds the list of repos

  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);
  _.each(repos, function(repo){
    $repoContainer.append(template(repo));
  });
}

//inserts the organization info into the aside
function displayOrgs(data){
  var orgs = data;
  _.each(orgs, function(org){
    var org = org;
    var $orgContainer = $('.org-container');

    var source = $('#org-template').html();
    var template = Handlebars.compile(source);

    $orgContainer.append(template(org));
  })
};

//inserts my info into the aside
function displayUserInfo(data){
  console.log(data);
  var user = data;
  var $profileContainer = $('.profile-container');

  var source = $('#aside-template').html();
  var template = Handlebars.compile(source);

  $profileContainer.append(template(user));

  $('.repository-number').append(data.public_repos);
  $('.followers-num').append(data.followers);
  $('.following-num').append(data.following);
};


}());

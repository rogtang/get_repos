'use strict';

function getRepos(username) {
  console.log(`getting ${username}`);
  const url = `https://api.github.com/users/${username}/repos`;

  const options = {
    headers: new Headers({
      Accept: "application/vnd.github.nebula-preview+json"
    })
  };


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  responseJson.forEach(obj =>
    $('#results-list').append(
      `<li><h3><a href="${obj.html_url}" target="_blank">${obj.name}</a></h3>
      </li>`)
    );
  $('.username').text(`${username}`);
    
  $('#results').removeClass('hidden');
};



  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    $('#js-search-term').val("");
    getRepos(username);
  });
}

$(watchForm);
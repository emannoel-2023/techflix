//função que verifica cada letra digitada e retorna os dados de filmes
$('#pesquisa').keyup(function () {
  //armazena o valor digitado no campo de pesquisa
  const filmesPesquisados = document.getElementById('pesquisa').value
  let exibirFilme = ''
  $('#verMais').val(`2`)
  //verifica se o texto digitado no campo pesquisa tem pelo menos 3 caracteres antes de realizar uma requisição para a api
  if (filmesPesquisados.length > 2) {
    //faz uma requisição para api omdb no modo busca que devolve uma array de 10 objetos de filmes
    $.getJSON(`https://www.omdbapi.com/?`, { s: filmesPesquisados, apikey: 'eef5e1d2', type: 'movie' }, function (filmesInfo, statusText, xhr) {
      //verifica e o status da requisição é 200(ok)
      console.log(filmesInfo.Response)
      if (filmesInfo.Response == "False") {
        exibirFilme += `<h2 class="col-md-auto">FIlme não encontrado!</h2>`
        $('.img-container').html(exibirFilme)
        $( "#verMais" ).hide();
      }
      //compara se o valor devolvido não é undefined antes de executar o proximo passo
      else if (xhr.status === 200 && filmesInfo.Search !== undefined) {
        //percorre o array de objetos devolvidos pela requisição filmes info
        $.each(filmesInfo.Search, function (index, movie) {
          if (movie.Poster !== "N/A" && index < 10) {
            exibirFilme += `<figure class="col-sm-6 col-md-4 col-lg-3" onclick="retorna(id)" id="${movie.imdbID}"data-bs-toggle="modal" data-bs-target="#exampleModal">`
            exibirFilme += `<img src="${movie.Poster}" class="col-12 movies" value="${movie.imdbID}" style="max-height: 380px;" alt="">`
            exibirFilme += `<figcaption>${movie.Title}<br>Ano: ${movie.Year}</figcaption>`
            exibirFilme += `</figure>`
            $('.img-container').html(exibirFilme)
            $( "#verMais" ).show();
          }
        }
        )
      }
    }
    )
  }
})

$('#verMais').click(function () {
  let page = document.getElementById('verMais').value
  const filmesPesquisado = document.getElementById('pesquisa').value
  let exibirFilm = ''
  $.getJSON(`https://www.omdbapi.com/?`, { s: filmesPesquisado, apikey: 'eef5e1d2', type: 'movie', page: `${page}` }, function (filmesInf, statusText, xhr) {
    if(filmesInf.Response==="False"){
      alert('Todos Filmes já foram mostrados!')
    }
    //verifica e o status da requisição é 200(ok)
    console.log(filmesInf)
    //compara se o valor devolvido não é undefined antes de executar o proximo passo
    if (xhr.status === 200 && filmesInf.Search !== undefined) {
      //percorre o array de objetos devolvidos pela requisição filmes info
      $.each(filmesInf.Search, function (index, movi) {
        exibirFilm += `<figure class="col-sm-6 col-md-4 col-lg-3" onclick="retorna(id)" id="${movi.imdbID}"data-bs-toggle="modal" data-bs-target="#exampleModal">`
        if(movi.Poster==="N/A"){
          exibirFilm += `<img src="imagens-pesquisa/posterNA.jpg" class="col-12 movies" value="${movi.imdbID}"  style="max-height: 380px;"alt="">`
        }
        else{
        exibirFilm += `<img src="${movi.Poster}" class="col-12 movies" value="${movi.imdbID}"  style="max-height: 380px;" alt="">`
        }
        //exibirFilm += `<img src="${movi.Poster}" class="col-12 movies" value="${movi.imdbID}" style="max-height: 380px;" alt="">`
        exibirFilm += `<figcaption>${movi.Title}<br>Ano: ${movi.Year}</figcaption>`
        exibirFilm += `</figure>`
      })
      $('.img-container').append(exibirFilm)
      page++
      $('#verMais').val(`${page}`)
      console.log(page)
    }
  }
  )
})


$('#btn-search').click(function () {
  let exibirFilme = ''
  const filmesPesquisados = document.getElementById('pesquisa').value
  console.log(filmesPesquisados)
  $.getJSON(`https://www.omdbapi.com/?`, { t: filmesPesquisados, apikey: 'eef5e1d2', type: 'movie' }, function (filmeInfo) {
    exibirFilme += `<figure class="col-md-auto" onclick="retorna(id)" id="${filmeInfo.imdbID}"data-bs-toggle="modal" data-bs-target="#exampleModal">`
    exibirFilme += `<img src="${filmeInfo.Poster}" class="col-12 movies" value="${filmeInfo.imdbID}"  " alt="">`
    exibirFilme += `<figcaption>${filmeInfo.Title}<br>Ano: ${filmeInfo.Year}</figcaption>`
    exibirFilme += `</figure>`
    $('.img-container').html(exibirFilme)
    $( "#verMais" ).hide();
  })
})


function retorna(id) {
  $.getJSON(`https://www.omdbapi.com/?`, { apikey: 'eef5e1d2', i: id, }, function (dadosFilmes) {
    console.log(dadosFilmes)
    document.getElementById('exampleModalLabel').textContent = `${dadosFilmes.Title}`
    let detalhesFilmes = `<div class="card mb-3" style="max-width: 540px;">
        <div class="row">
          <div class="col-md-6" id="card-img">
            <img src="${dadosFilmes.Poster}" class="img-fluid rounded-start" alt="${dadosFilmes.Title}.jpg">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">Detalhes</h5>
              <p class="card-text">Sinopse: ${dadosFilmes.Plot}</p>
              <p class="card-text"><small class="text-muted">Ano: ${dadosFilmes.Year}</small></p>
              <p class="card-text"><small class="text-muted">
              Nota imdb: ${dadosFilmes.imdbRating}</small></p>
              <p class="card-text"><small class="text-muted">Bilheteria: ${dadosFilmes.BoxOffice}</small></p>
              <p class="card-text"><small class="text-muted">Duração: ${dadosFilmes.Runtime}</small></p>
              <p class="card-text"><small class="text-muted"></small></p>
              <p class="card-text"><small class="text-muted"></small></p>
            </div>
          </div>
        </div>
      </div>`
    $('.modal-body').html(detalhesFilmes)
  })
}

$(document).on({
  ajaxStart: function () {
    $("body").delay(10000).addClass("loading");
  },
  ajaxStop: function () {
    $("body").removeClass("loading");
  }
});





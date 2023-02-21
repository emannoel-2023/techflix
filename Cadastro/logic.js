
let senha = document.getElementById('psw')
let repetir = document.getElementById('psw-repeat')

function validar() {
  if (senha.value != repetir.value) {
    repetir.setCustomValidity("Senhas diferentes!")
    repetir.reportValidity()
    return false
  } else {
    repetir.setCustomValidity("")
    return true
  }
}

repetir.addEventListener('input', validar)

function limpa_formulário_cep() {
    
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");

}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
   
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);

} 
else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

var cep = valor.replace(/\D/g, '');

if (cep != "") {

    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {

        
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";


        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function validaRg (){
    var rg= /[^0-9]/
    var dadoRg = document.getElementById("identidade")

    if(dadoRg.value != rg.test){
        dadoRg.setCustomValidity("Insira apenas números")
        dadoRg.reportValidity()
        return false
    }
    else{
        dadoRg.reportValidity(" ")
        return true
    }
}

function onlyNumberKey(evt) {
          
   
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
'use strict';

export function searchCep (val) {
  const rua = document.getElementById('rua');
  const bairro = document.getElementById('bairro');
  const cidade = document.getElementById('cidade');
  const uf = document.getElementById('uf');
  const ibge = document.getElementById('ibge');

  limpa_formulário_cep();

  if (val) {
    fetchCep().then(cep => {
      console.log(cep);

      if (!cep.erro) {
        rua.value = cep.logradouro;
        bairro.value = cep.bairro;
        cidade.value = cep.localidade;
        uf.value = cep.uf;
        ibge.value = cep.ibge;
      } else {
        limpa_formulário_cep();
        alert('CEP não encontrado.');
      }
    })
    .catch(error => {
      console.error(error);
      limpa_formulário_cep();
    
      //CEP não Encontrado.
      alert('CEP não encontrado.');
    });
  }

  async function fetchCep () {
    const response = await fetch(`https://viacep.com.br/ws/${val}/json`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  }
  
  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    rua.value = '';
    bairro.value = '';
    cidade.value = '';
    uf.value = '';
    ibge.value = '';
  }
};
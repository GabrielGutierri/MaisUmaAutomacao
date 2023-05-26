var dadosSessaoObj;
let vConstanteGanhoFinal = 0;
let objects1 = [];

document.addEventListener('DOMContentLoaded', function() {
    const orderSelect = document.getElementById('orderSelect');
    const htmlContent = document.getElementById('htmlContent');
    const plotButton = document.getElementById('plotButton');
    const hiddenContent = document.getElementById('hiddenContent');

    orderSelect.addEventListener('change', function() {
      const selectedOption = orderSelect.options[orderSelect.selectedIndex].value;
  
      if (selectedOption === '1') {
        const html = `

        <div class="funcao">
          <p>Função de Primeira Ordem</p>
          <div class="numerador">
            <input class ="input-field" id="numerador1" type="text"/>
          </div>
          <hr/>
          <div class="denominador d-flex justify-content-center">
            <input class ="input-field mr-2" id="denominador1" type="text"/>
              * S + 1
          </div>
        </div>
        <br>
        `;
        htmlContent.innerHTML = html;
        plotButton.disabled = false; // Habilita o botão
      } else if (selectedOption === '2') {
        const html = `

      <div class="funcao">
        <p>Função de Segunda Ordem</p>
        <div class="numerador">
          <input class ="input-field" id="numerador2" type="text"/>
        </div>
        <hr/>
        <div class="denominador d-flex justify-content-center">
            s² + 2 *  
          <input class ="input-field mr-2" id="denominador2" type="text"/>
          *
          <input class ="input-field mr-2" id="denominador3" type="text"/>
          * s + 
          <input class ="input-field mr-2" id="denominador4" type="text"/>
        </div>
      </div>
      <br>
        `;
        htmlContent.innerHTML = html;
        plotButton.disabled = false; // Habilita o botão
      } else {
        htmlContent.innerHTML = '';
        plotButton.disabled = true; // Desabilita o botão
      }
    });
  
    plotButton.addEventListener('click', function() {
        const radioMalhaFechada = document.querySelector('#malhaFechada').checked;
        const radioMalhaAberta = document.querySelector('#malhaAberta').checked;
        const selectedOption = orderSelect.options[orderSelect.selectedIndex].value;
        
        if(selectedOption === '1' && radioMalhaAberta){
            let num = document.querySelector('#numerador1').value;
            let den = document.querySelector('#denominador1').value;
            let dadosSessao = { numerador: num, denominador: den, ordem: 'primeira-ordem', tipo: 'malha-aberta'}
            $.ajax({
                url: '/api/grafico/primeira-ordem',
                type: 'GET',
                data: {
                    numerador: num,
                    denominador: den
                },
                success: function(data) {
                    let divResultado = document.querySelector('#resultado');
                    divResultado.innerHTML = data;
                    localStorage.setItem('dadosSessao', JSON.stringify(dadosSessao));
			              let dadosSessaoString = localStorage.getItem('dadosSessao');
			              dadosSessaoObj = (JSON.parse(dadosSessaoString));
			              objects1.push(dadosSessaoObj);
                }
            });
        }
        else if(selectedOption === '1' && radioMalhaFechada){
            let num = document.querySelector('#numerador1').value;
            let den = document.querySelector('#denominador1').value;
            let dadosSessao = { numerador: num, denominador: den, ordem: 'primeira-ordem', tipo: 'malha-fechada'}
            $.ajax({
                url: '/api/grafico/primeira-ordem/malha-fechada',
                type: 'GET',
                data: {
                    numerador: num,
                    denominador: den
                },
                success: function(data) {
                    let divResultado = document.querySelector('#resultado');
                    divResultado.innerHTML = data;
                    localStorage.setItem('dadosSessao', JSON.stringify(dadosSessao));
			              let dadosSessaoString = localStorage.getItem('dadosSessao');
			              dadosSessaoObj = (JSON.parse(dadosSessaoString));
			              objects1.push(dadosSessaoObj);
                }
            });
        }
        else if(selectedOption === '2' && radioMalhaAberta){
          let num = document.querySelector('#numerador2').value;
          let den1 = document.querySelector('#denominador2').value;
          let den2 = document.querySelector('#denominador3').value;
          let den3 = document.querySelector('#denominador4').value;
          let dadosSessao = { numerador: num, denominador1: den1, denominador2: den2, denominador3: den3, ordem: 'segunda-ordem', tipo: 'malha-aberta'}
            $.ajax({
                url: '/api/grafico/segunda-ordem',
                type: 'GET',
                data: {
                    numerador: num,
                    denominador1: den1,
                    denominador2: den2,
                    denominador3: den3
                },
                success: function(data) {
                    let divResultado = document.querySelector('#resultado');
                    divResultado.innerHTML = data;
                    localStorage.setItem('dadosSessao', JSON.stringify(dadosSessao));
			              let dadosSessaoString = localStorage.getItem('dadosSessao');
			              dadosSessaoObj = (JSON.parse(dadosSessaoString));
			              objects1.push(dadosSessaoObj);
                }
            });
        }
        else if(selectedOption === '2' && radioMalhaFechada){
          let num = document.querySelector('#numerador2').value;
          let den1 = document.querySelector('#denominador2').value;
          let den2 = document.querySelector('#denominador3').value;
          let den3 = document.querySelector('#denominador4').value;
          let dadosSessao = { numerador: num, denominador1: den1, denominador2: den2, denominador3: den3, ordem: 'segunda-ordem', tipo: 'malha-fechada'}
            $.ajax({
                url: '/api/grafico/segunda-ordem/malha-fechada',
                type: 'GET',
                data: {
                    numerador: num,
                    denominador1: den1,
                    denominador2: den2,
                    denominador3: den3
                },
                success: function(data) {
                    let divResultado = document.querySelector('#resultado');
                    divResultado.innerHTML = data;
                    localStorage.setItem('dadosSessao', JSON.stringify(dadosSessao));
			              let dadosSessaoString = localStorage.getItem('dadosSessao');
			              dadosSessaoObj = (JSON.parse(dadosSessaoString));
			              objects1.push(dadosSessaoObj);
                }
            });
        }
        insereDadosCombo();
    }
    
    );
  });
  
  function insereDadosCombo() {
    var comboBox = document.getElementById('previousSelect');
    comboBox.innerHTML = "";
    objects1.forEach(obj => {
      let option = document.createElement('option');
        if(obj.ordem == 'primeira-ordem'){
          if(obj.tipo == 'malha-aberta'){
            option.text = `${obj.numerador} / ${obj.denominador} * S + 1 - Primeira Ordem - Malha Aberta`;
          }
          if(obj.tipo == 'malha-fechada'){
            option.text = `${obj.numerador} / ${obj.denominador} * S + 1 - Primeira Ordem - Malha Aberta`;
          }
          option.dataset.numerador = obj.numerador;
          option.dataset.denominador = obj.denominador;
          option.dataset.ordem = obj.ordem;
          option.dataset.tipo = obj.tipo;
        }

        if(obj.ordem == 'segunda-ordem'){
          if(obj.tipo == 'malha-aberta'){
            option.text = `${obj.numerador} / S² + 2 * ${obj.denominador1}S * ${obj.denominador2} + ${obj.denominador3} - Segunda Ordem - Malha Aberta`;
          }
          if(obj.tipo == 'malha-fechada'){
            option.text = `${obj.numerador} / S² + 2 * ${obj.denominador1}S * ${obj.denominador2} + ${obj.denominador3} - Segunda Ordem - Malha Fechada`;
          }
          option.dataset.numerador = obj.numerador;
          option.dataset.denominador1 = obj.denominador1;
          option.dataset.denominador2 = obj.denominador2;
          option.dataset.denominador3 = obj.denominador3;
          option.dataset.ordem = obj.ordem;
          option.dataset.tipo = obj.tipo;
        }
        comboBox.appendChild(option);
      }
      );
      
    };
    
    // Itera sobre as propriedades do objeto e cria as opções da combobox
async function compararGrafico(){
	  let selectValoresPassado = document.querySelector('#previousSelect');
	  let option = selectValoresPassado.options[selectValoresPassado.selectedIndex];
    const resultado = document.querySelector('#resultado');
    const resultadoAntigo = document.querySelector('#resultadoComparacao');
    
    const divResultado = document.createElement('div');
    divResultado.textContent = 'Resultado Atual';
    resultado.appendChild(divResultado);

    if(option.getAttribute("data-ordem") == "primeira-ordem" && option.getAttribute("data-tipo") == "malha-aberta"){
      let num = option.getAttribute("data-numerador");
      let den = option.getAttribute("data-denominador");
      await $.ajax({
          url: '/api/grafico/primeira-ordem',
          type: 'GET',
          data: {
              numerador: num,
              denominador: den
          },
          success: function(data) {
              let divResultado = document.querySelector('#resultadoComparacao');
              divResultado.innerHTML += data;
          }
      });
  }
  else if(option.getAttribute("data-tipo") == "primeira-ordem" && option.getAttribute("data-tipo") == "malha-fechada"){
    let num = option.getAttribute("data-numerador");
    let den = option.getAttribute("data-denominador");
      await $.ajax({
          url: '/api/grafico/primeira-ordem/malha-fechada',
          type: 'GET',
          data: {
              numerador: num,
              denominador: den
          },
          success: function(data) {
            let divResultado = document.querySelector('#resultadoComparacao');
            divResultado.innerHTML += data;
          }
      });
  }
  else if(option.getAttribute("data-ordem") == "segunda-ordem" && option.getAttribute("data-tipo") == "malha-aberta"){
    let num = option.getAttribute("data-numerador");
    let den1 = option.getAttribute("data-denominador1");
    let den2 = option.getAttribute("data-denominador2");
    let den3 = option.getAttribute("data-denominador3");
    await $.ajax({
        url: '/api/grafico/segunda-ordem',
        type: 'GET',
        data: {
            numerador: num,
            denominador1: den1,
            denominador2: den2,
            denominador3: den3
        },
        success: function(data) {
          let divResultado = document.querySelector('#resultadoComparacao');
          divResultado.innerHTML += data;
        }
    });
  }
  else if(option.getAttribute("data-ordem") == "segunda-ordem" && option.getAttribute("data-tipo") == "malha-fechada"){
    let num = option.getAttribute("data-numerador");
    let den1 = option.getAttribute("data-denominador1");
    let den2 = option.getAttribute("data-denominador2");
    let den3 = option.getAttribute("data-denominador3");
    
      await $.ajax({
          url: '/api/grafico/segunda-ordem/malha-fechada',
          type: 'GET',
          data: {
              numerador: num,
              denominador1: den1,
              denominador2: den2,
              denominador3: den3
          },
          success: function(data) {
            let divResultado = document.querySelector('#resultadoComparacao');
            divResultado.innerHTML += data;
          }
      });
    }
    const divResultadoAntigo = document.createElement('div');
    divResultadoAntigo.textContent = 'Resultado Antigo';
    resultadoAntigo.appendChild(divResultadoAntigo);
	}

  const button = document.querySelector('#buttonClick');
  button.addEventListener('click', ()=>{
    const imgElement = document.querySelector('img');
    console.log(imgElement);
    const url = imgElement.src;;
    const nomeArquivo = 'grafico-atual.jpg';

    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;

    const eventoClique = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });

    link.dispatchEvent(eventoClique);
  });

  function baixarImagem(){
    const url = 'https://caminho-da-imagem/imagem.jpg';
    const nomeArquivo = 'imagem.jpg';

    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;

    const eventoClique = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    link.dispatchEvent(eventoClique);
  }
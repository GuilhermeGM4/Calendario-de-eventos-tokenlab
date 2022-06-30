function adicionar(email_usuario){
    console.log(email_usuario);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./eventos.json");
    xhr.onload = function(){
        console.log(xhr.responseText);
        console.log(email_usuario);
        var eventos = JSON.parse(xhr.responseText);
        console.log(eventos);
        document.getElementById("testes").innerHTML = eventos[0];
        eventos = eventos.email_usuario;
        console.log(eventos);

        //input do usuário
        var data_inicio = document.getElementById("d_inicio").value;
        var hora_inicio = document.getElementById("h_inicio").value;
        var data_fim = document.getElementById("d_fim").value;
        var hora_fim = document.getElementById("h_fim").value;
        var descricao = document.getElementById("descricao").value;

        //verifica se algum campo obrigatorio esta em branco e da notificaçao de erro caso esteja
        if (data_inicio === "" || hora_inicio === "" || data_fim === "" || hora_fim === "") 
            return document.getElementById("mensagem").innerHTML = '<div class="alert alert-danger alert-dismissible"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong> Você deve preencher todos os dados de inicio e fim.</div>';
        
        //conteudo do calendario que esta renderizado
        var tabela = document.getElementById("calendario").innerHTML;

        //cria a nova linha
        tabela = `${tabela}<tr><td>${data_inicio}</td> <td>${hora_inicio}</td> <td>${data_fim}</td> <td>${hora_fim}</td> <td>${descricao}</td></tr>`;

        for (const elemento of eventos){
        //for (let i = 0; i < eventos.length; i++){
            if (elemento.data_inicio === data_inicio && elemento.data_fim === data_fim && elemento.hora_inicio === hora_inicio && elemento.hora_fim === hora_fim)
                return document.getElementById("mensagem").innerHTML = '<div class="alert alert-danger alert-dismissible"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong> O evento já existe, modifique ou remova o evento já existente.</div>';
        }

        document.getElementById("calendario").innerHTML = tabela;
        eventos[eventos.length] = {
            "data_inicio" : data_inicio, 
            "hora_inicio" : hora_inicio, 
            "data_fim" : data_fim, 
            "hora_fim" : hora_fim, 
            "descricao" : descricao, 
            "id" : eventos.length
        };

        document.getElementById("mensagem").innerHTML = '<div class="alert alert-success alert-dismissible"><button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Sucesso!</strong> O seu novo evento foi adicionado!</div>';
    };
    xhr.send();

    
}

function modificar(id_elemento, email){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "eventos.json");
    xhr.onload = function(){
        var eventos = JSON.parse(xhr.responseText);
        eventos = eventos.email;
        //input do usuário
        const inicio = document.getElementById("inicio").value;
        const fim = document.getElementById("fim").value;
        var descricao = document.getElementById("descricao").value;

        eventos[id_elemento] = {"inicio" : inicio, "fim" : fim, "descricao" : descricao, "id" : id_elemento};
    };
    xhr.send();
}
function adicionar(email_usuario){
    var URL = "https://guilhermegm4.github.io/Calendario-de-eventos-tokenlab"; //url do site

    $.getJSON(URL+"/eventos.json", function(eventos){
        if (eventos[email_usuario] === undefined) eventos[email_usuario] = [];

        eventos = eventos[email_usuario];

        //input do usuário
        var data_inicio = document.getElementById("d_inicio").value;
        var hora_inicio = document.getElementById("h_inicio").value;
        var data_fim = document.getElementById("d_fim").value;
        var hora_fim = document.getElementById("h_fim").value;
        var descricao = document.getElementById("descricao").value;

        //verifica se algum campo obrigatorio esta em branco e da notificaçao de erro caso esteja
        if (data_inicio === "" || hora_inicio === "" || data_fim === "" || hora_fim === "") 
            return document.getElementById("mensagem").innerHTML = '<div class="alert alert-danger alert-dismissible"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong> Você deve preencher todos os dados de inicio e fim.</div>';
        else if((data_inicio > data_fim) || (data_inicio >= data_fim && hora_inicio >= hora_fim))
            return document.getElementById("mensagem").innerHTML = '<div class="alert alert-danger alert-dismissible"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong> O fim vem depois do inicio.</div>';
        
        //conteudo do calendario que esta renderizado
        var tabela = document.getElementById("calendario").innerHTML;

        //cria a nova linha
        tabela = `${tabela}<tr id="${eventos.length}"><td>${data_inicio}</td> <td>${hora_inicio}</td> <td>${data_fim}</td> <td>${hora_fim}</td> <td>${descricao}</td> <td><button type="button" class="btn btn-primary" onclick="modificar('${i.id}, email')">Modificar</button></td></tr>`;

        for (const elemento of eventos){
            console.log(elemento);
            if (elemento.data_inicio === data_inicio && elemento.data_fim === data_fim && elemento.hora_inicio === hora_inicio && elemento.hora_fim === hora_fim)
                return document.getElementById("mensagem").innerHTML = '<div class="alert alert-danger alert-dismissible fade show"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong> O evento já existe, modifique ou remova o evento já existente.</div>';
        }

        //modifica json (erro)
        $.ajax({
            url : "./eventos.json",
            type : "POST",
            data : {
                data_inicio : data_inicio, 
                hora_inicio : hora_inicio, 
                data_fim : data_fim, 
                hora_fim : hora_fim, 
                descricao : descricao, 
                id : eventos.length
            },
            success : function (msg){
                if (msg.status == "erro"){
                    alert(msg.msg);
                    document.getElementById("mensagem").innerHTML = `<div class="alert alert-danger alert-dismissible"> <button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Erro!</strong>${msg.msg}</div>`;
                }
                else {
                    alert("Sucesso");
                }
            }
        });
        //coloca nova linha na tabela
        document.getElementById("calendario").innerHTML = tabela;
        document.getElementById("mensagem").innerHTML = '<div class="alert alert-success alert-dismissible"><button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Sucesso!</strong> O seu novo evento foi adicionado!</div>';
    });

    //old
    //var xhr = new XMLHttpRequest();
    //xhr.open("GET", URL+"/eventos.json");
    //xhr.onload = function(){
        //pega json e coloca em variavel
        //var eventos = JSON.parse(xhr.responseText);
        
    //};
    //xhr.send();

    
}

function modificar(id_elemento, email_usuario){
    $.getJSON("./eventos.json", function(eventos){
        eventos = eventos[email_usuario];
        //input do usuário
        var data_inicio = document.getElementById("d_inicio").value;
        var hora_inicio = document.getElementById("h_inicio").value;
        var data_fim = document.getElementById("d_fim").value;
        var hora_fim = document.getElementById("h_fim").value;
        var descricao = document.getElementById("descricao").value;
        //var id_elemento = document.getElementsByTagName("id_evento").id;

        eventos[id_elemento] = {
            "data_inicio" : data_inicio,
            "hora_inicio" : hora_inicio,
            "data_fim" : data_fim,
            "hora_fim" : hora_fim,
            "descricao" : descricao,
            "id" : id_elemento
        };
        console.log(eventos[id_elemento]);
    });
}
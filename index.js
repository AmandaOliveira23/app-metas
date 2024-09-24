const {select, input, checkbox} = require('@inquirer/prompts')

let mensagem = "Bem vindo ao App de Metas"

const meta = {
    value: "tomar 2 litros de água",
    checked: false,
}

const metas =[meta]

const cadastrarMeta = async () =>{
    const meta = await input({message:"Digite a meta:"})

    if(meta.length == 0){
        mensagem = "A meta náo pode ser vazia"
        return
    }

    metas.push({
        value: meta,
        checked: false,
    })
    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () =>{
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices:[...metas],
        instructions: false,
    })


    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    

    respostas.forEach((resposta)=>{
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)"
}

const metasRealizadas = async () =>{
    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Nao existem metas realizadas!"
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: realizadas.map(meta => ({ name: meta.value, value: meta.value }))

    })

}

const metasAbertas = async () =>{
    const abertas = metas.filter((meta)=>{
        return !meta.checked
    })

    if(abertas.length == 0){
        mensagem = "Nao existe metas abertas!"
        return
    }

    await select({
        message:"Metas Abertas: " + abertas.length,
        choices: abertas.map(meta => ({ name: meta.value, value: meta.value }))

    })
}

const deletarMetas = async () => {
    // Mapear as metas para criar opções para o checkbox
    const desmarcarMetas = metas.map((meta) => ({
        name: meta.value, 
        value: meta.value, 
        checked: false
    }));

    // Perguntar quais metas o usuário deseja deletar
    const itensADeletar = await checkbox({
        message: "Selecione item para deletar:",
        choices: desmarcarMetas,
        instructions: false,
    });

    // Verificar se o usuário não selecionou nenhum item
    if (itensADeletar.length == 0) {
        mensagem = "Nenhum item à deletar!";
        return;
    }

    // Atualizar o array metas removendo os itens selecionados
    metas.forEach((meta, index) => {
        if (itensADeletar.includes(meta.value)) {
            metas.splice(index, 1); // Remover item pelo índice
        }
    });

    mensagem = "Meta(s) deletada(s) com sucesso!";
};


const mostrarMensagem = () =>{
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () =>{
    while(true){

        mostrarMensagem()
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"

                },

                {
                    name: "Listar metas",
                    value: "listar"

                },

                {
                    name: "Metas realizadas",
                    value: "realizadas"

                },

                {
                    name: "Metas abertas",
                    value: "abertas"

                },

                {
                    name: "Deletar Metas",
                    value: "deletar"

                },

                {
                    name: "Sair",
                    value: "sair"

                },
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()
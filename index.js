const {select, input, checkbox} = require('@inquirer/prompts')


const meta = {
    value: "tomar 2 litros de água",
    checked: "false"
}

const metas =[meta]

const cadastrarMeta = async () =>{
    const meta = await input({message:"Digite a meta:"})

    if(meta.length == 0){
        console.log("A meta náo pode ser vazia")
        return
    }

    metas.push({
        value: meta,
        checked: "false"
    })

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

    if(respostas.lenght == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    
   

    respostas.forEach((resposta)=>{
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')
}

const metasRealizadas = async () =>{
    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Nao existem metas realizadas!')
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [... realizadas]
    })

}

const metasAbertas = async () =>{
    const abertas = metas.filter((meta)=>{
        return !meta.checked
    })

    if(abertas.lenght == 0){
        console.log("Nao existe metas abertas!")
        return
    }

    await select({
        message:"Metas Abertas: " + abertas.length,
        choices:[...abertas]
    })
}

const deletarMetas = async () =>{
    const desmarcarMetas = metas.map((meta)=>{
        return {value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message:"Selecione item para deletar:",
        choices: [...desmarcarMetas],
        instructions: false,

        
    })

    if(itensADeletar == 0){
        console.console.log("Nenhum item à deletar!");
        return 
    }


    itensADeletar.forEach((item)=>{
        metas = metas.filter((meta)=>{
            return meta.value != item
        })
    })

    console.log("Meta(s) deleta(s) com sucesso!")

}

const start = async () =>{
    while(true){
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
                console.log(metas)
                console.log("vamos cadastrar")
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
            case "sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()
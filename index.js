const {select, input} = require('@inquirer/prompts')


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
        value: metas,
        checked: "false"
    })

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
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()
const form = document.querySelector('#novoItem')

const lista = document.getElementById('lista')

const itens = JSON.parse(localStorage.getItem('itens')) || []

console.log(itens)

itens.forEach((elemento) => {
        criaElemento(elemento)
})

form.addEventListener('submit',(event) => {
        event.preventDefault()
       
        const nome = event.target.elements['nome']
        const quantidade = event.target.elements['quantidade']

        const existe = itens.find( elemento => elemento.nome === nome.value)

        console.log(existe)

        const itemAtual = ({
                'nome': nome.value,
                'quantidade': quantidade.value,
        })
        
        if (existe){
                itemAtual.id = existe.id
                atualizaElemento(itemAtual)

                itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        }else{

                itemAtual.id = itens[itens.lenght-1] ? (itens[itens.lenght-1].id + 1) :0

                criaElemento(itemAtual)

                itens.push(itemAtual)


        }

        
        
        nome.value = ""
        
        quantidade.value = ""
        
        
})




function criaElemento(item){
        console.log(item)
        if( item.nome === "" || item.quantidade === ""){
                
        }else{

                        // <li class="item"><strong>7</strong>Camisas</li>
                        
                        const novoItem = document.createElement('li')
                        novoItem.classList.add('item')
                        
                        const numeroItem = document.createElement('strong')
                        numeroItem.innerHTML = item.quantidade
                        numeroItem.dataset.id = item.id
                        
                        novoItem.appendChild(numeroItem) 
                        
                        novoItem.innerHTML += item.nome
                        
                        novoItem.appendChild(botaoDelet())
                        
                        lista.appendChild(novoItem)
                        
                        
                        
                }
                
                
                
        }
        
        
        function atualizaElemento (item){
                
                document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
        }
        
        
        function botaoDelet (id) {
                const elementoBotao = document.createElement('button')
                elementoBotao.innerText = 'x'
                
                elementoBotao.addEventListener('click', function(){
                        deletaElemento(this.parentNode, id)
                })

                
                return elementoBotao
        }
        
        
        function deletaElemento (tag,id) {
                tag.remove()
                 
                itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
                
                localStorage.setItem("itens", JSON.stringify(itens))
        }
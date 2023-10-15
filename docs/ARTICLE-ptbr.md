


# Criando um jogo em Javascript em apenas 13Kb

Como um aficcionado por games e programador, vez por outra, eu busco estudar um
pouco sobre desenvolvimento de games. Há algum tempo atras, estava eu estudando como
criar uma cena de jogo 2D utilizando apenas C e openGL, o que resultou em um projeto POC
(prova de conceito) interessante.

Esse projeto fez-me interessar um pouco mais por processamento de imagens 2D e entender 
melhor como formatos como o PNG funcionam. Um tempo depois, eu me deparo com o anúncio de
uma competição de desenvolvimento de games em Javascript, a [js13kgames](https://js13kgames.com/).
Nessa competição, os participantes têm de desenvolver o melhor jogo em javascript utilizando apenas
13kb em seu código fonte, o que inclui script, bibliotecas, sons e imagens! Tudo isso deve ser empacotado
em apenas 13 kilobytes! O game deveria ser desenvolvido em um mês. Em Agosto, o tema do game em questão 
seria revelado. Em Setembro seria a entrega e em Outubro sairia os resultados.

O jogo poderia ser comprimido com zip e o javascript minimizado.
Criar scripts em apenas 13kb não é realmente um problema dado que temos ```javascript minifiers``` muito
eficientes a nossa disposição. Os sons em formato MIDI não são nada pesados. Tão pouco textos. A barreira
está mesmo na criação dos gráficos. 

Empolgado com o desafio, eu decidi fazer algo novo e inusitado em termos técnicos. Se eu decicisse por 
utilizar um [sprite](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)) em png, para que este 
ocupasse pouco espaço, teria de ser de resolução MUITO baixa (foi o que muitos competidores utilizaram).
Criar gráficos vetoriais como SVG é outra solução óbvia. Todavia, a estética de "jogo de flash" seria quase
que inevitável, além de as imagens todas ficarem parecendo recortes de papel (por incrível que pareça, o vencedor
utilizou essa abordagem, com todos os seus defeitos).

## Imagens matriciais em poucos kilobytes

A abordagem que eu resolvi utilizar foi criar gráficos com [imagens matriciais](https://edisciplinas.usp.br/pluginfile.php/6543522/mod_resource/content/3/Aula2.Ex2.%20Imagens%20Matriciais%20vs%20Imagens%20Vetoriais.html) animadas. 
Estas seriam inseridas em um vetor javascript e não em um asset em binário.
Para desenhar as imagens, eu utilizei uma ferramenta open source de criação de mapas, o [Tiled](https://www.mapeditor.org/).
Esse mapa, poderia ter apenas três variações: transparente, cinza e preto como exemplificado na imagem abaixo:

![Tiled](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/image-format.png?raw=true)

A imagem abaixo pode ser exportada em json pelo Tiled. Uma das propriedades desse json é o vetor contendo a imagem, algo como:

```
/* Imagem do ícone de âncora no inicio do game */
[1, 1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1]
```

Esse vetor representaria uma imagem. O número 1 seria o pixel transparente. O número 2, o pixel cinza e o número 3, o pixel preto. 
As imagens, por padrão, seriam em preto e branco. Na hora de renderizá-las, pode-se trocar a paleta de cores e uma imgem pode ser "azul forte"
e "azul claro" no lugar de cinza e preto.

A imagem acima é uma imagem com a dimensão 16x16. Nesse caso, a cada 16 pixels, a função que realiza a renderização deve avançar uma linha a cada
16 posições do vetor.

Isso por sí só já ajuda muito na compressão gzip, mas pode ficar muito menor! Por isso, a cada imagem dessa, eu passei por um script que diminuia 1 
a cada número do vetor, utilizando apenas 0, 1 e 2. Depois disso, eu utilizo um número de 8 bits para representar 4 posições desse vetor. Por exemplo:

Para representar o vetor:

```[2, 2, 1, 2]```

Pode-se apenas usar o número 116.

```116 em binário = 10100110```

10 = 2 em binário
10 = 2 em binário
01 = 1 em binário
10 = 2 em binário

Se estivéssemos trabalhando com uma linguagem de baixo nível, isso não faria sentido, Mas como em um arquivo Javascript tudo é string,
o texto ```116``` ocupa menos espaço em disco do que o texto ```[2,2,1,2]```.

Além disso, o script que faz essa compressão também cuida das repetições de zero. Como toda a parte transparente da imagem é ```0```,
várias sequências de zero são adicionadas em um vetor. Isso pode ser substituído por apenas um número negativo representando a quantidade
que se segue de zeros. Exemplo:

```[1,0,0,0,0,0,0,0,0,0,0,0,0,2]```

trocando por:

```[1,-12,2]```

Assim, temos uma string MUITO menor, quando a função de "descompactar" a imagem encontraro um número negativo, ela apenas adiciona
```x*-1``` zeros no vetor.

O script que realiza essa compressão é esse abaixo:

(funciona tanto no console do browser quanto em um runtime como o NodeJS ou Bun)

```
const image = [1, 1, 3, ....];

const leftPad = (str, length) => {
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

const IMAGE_ARRAY_NUMBER_LENGTH = 8;


function compressImage(image) {
    let byteBuffer = '';
    return image.reduce((acc, pixel) => {
        let pixelVal = pixel - 1;
        pixelVal = pixelVal > 2 ? 0 : pixelVal; /* Sometimes tiled exports wrong map tiles */
        pixelVal = pixelVal < 0 ? 1 : pixelVal; /* Sometimes tiled exports wrong map tiles */
        byteBuffer += leftPad(pixelVal.toString(2)+'', 2);
        if (byteBuffer.length === IMAGE_ARRAY_NUMBER_LENGTH) {
            const val = parseInt(byteBuffer, 2);
            acc.push(val);
            byteBuffer = '';
        }
        return acc;
    }, []);
}

function uncompressImage(compressed) {
    return compressed.reduce((acc, byte) => {
        let binaryNumber = leftPad((+byte).toString(2), IMAGE_ARRAY_NUMBER_LENGTH);
        while (binaryNumber.length) {
            const twoBits = binaryNumber.substring(0, 2);
            const twoBitsInInt = parseInt(twoBits, 2);
            acc.push(twoBitsInInt);
            binaryNumber = binaryNumber.substring(2, binaryNumber.length);
        }
        return acc;
    }, []);
}

function compressMore(compressed) {
    let buffer = 0;
    const compressedMore = compressed.reduce((acc, current) => {
        if (current === 0) {
            buffer += 1;
            return acc;
        }
        if (buffer) {
            acc.push(buffer * -1);
            buffer = 0;
        }
        acc.push(current);
        return acc;
    }, []);
    if (buffer) {
        compressedMore.push(buffer * -1);
    }
    return compressedMore;
}


const compressed = compressImage(image);
console.log(JSON.stringify(compressMore(compressed)));
const uncompressed = uncompressImage(compressed);
```

## O Resultado

### Death Sea XIII

O game Death Sea XIII foi criado na abordagem mencionada. Para jogá-lo, basta acessar o link:

[JOGAR](https://death-sea-xiii.vercel.app/)

![Death Sea XIII](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/title.png?raw=true)
![Gameplay](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/gameplay.gif?raw=true)

Eu optei por criar um shooter 2d pelo fato de que é rápido programar esse tipo de game, tanto em suas
mecânicas quanto no balanceamento de dificuldade e jogabilidade. O nome death sea (mar mortífero) foi
escolhido por razões óbvias e o 13 (XIII em algarismo romano) se refere ao século onde a sua estória
acontece e uma referência a competição.


### A Competição

A [js13kgames](https://js13kgames.com/) acontece todo o ano e é dividida em modalidades. Esse projeto 
foi inserido na modalidade de games desktop. Durante o desenvolvimento do Death Sea, eu acompanhei no
Slack da competição os projetos que estavam sendo criados. Muitos deles são realmente impressionantes.
Eu recomendo o leitor interessado no assunto a dar uma olhada nesses projetos:

 - [Terror of Mongolia](https://dev.js13kgames.com/2023/games/the-terror-of-mongolia)
 - [Battle Commander: Middle ages](https://dev.js13kgames.com/2023/games/battle-commander-middle-ages) 
 - [Fort Knight](https://dev.js13kgames.com/2023/games/fort-knight)
 - [The Knighting of Sr. Isaac](https://dev.js13kgames.com/2023/games/the-knighting-of-sr-isaac)
 - [Exit The Castle](https://dev.js13kgames.com/2023/games/exit-the-castle)
 - [Moai Alley](https://dev.js13kgames.com/2023/games/moai-alley)

Eu recomendo checkar essa lista em vez de verificar os vencedores. Infelizmente, nenhum desses chegou 
ao TOP 10 na categoria Desktop. Os vencedores foram os games com a melhor interface gráfica. É um pouco
desapontador que essa seja mais uma competição de webdesign do que de games em sí. Por algum milagre, o 
meu game ficou entre os 100 primeiros (90º de 146) pois, dentre outros defeitos, a interface gráfica dele 
deixou realmente a desejar.
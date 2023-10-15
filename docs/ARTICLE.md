# Creating a Game in JavaScript in Just 13Kb

**This article was automatically translated from Portuguese by ChatGPT, the original article could be found [here](https://dev.to/justaguyfrombr/criando-um-jogo-em-javascript-em-apenas-13kb-5320).

As a game enthusiast and programmer, from time to time, I seek to study game development. Some time ago, I was studying how to create a 2D game scene using only C and OpenGL, which resulted in an interesting proof of concept (POC) project.

This project sparked my interest in 2D image processing and a better understanding of how formats like PNG work. Some time later, I came across an announcement of a game development competition in JavaScript called js13kgames. In this competition, participants had to develop the best JavaScript game using only 13kb in their source code, including scripts, libraries, sounds, and images! All of this had to be packaged into just 13 kilobytes. The game had to be developed in one month. In August, the theme for the game would be revealed. Delivery was in September, and the results would be announced in October.

The game could be compressed with ZIP, and JavaScript could be minimized. Creating scripts within 13kb was not really a problem, as we have very efficient JavaScript minifiers at our disposal. MIDI format sounds are not very heavy, nor are texts. The real challenge lies in creating graphics.

Excited by the challenge, I decided to do something new and technically unusual. If I were to use a sprite in PNG format to keep it small, it would have to be of VERY low resolution (as many competitors did). Creating vector graphics like SVG is another obvious solution. However, the "flash game" aesthetic would be almost inevitable, and all the images would look like paper cutouts (surprisingly, the winner used this approach, despite its flaws).

## Matrix Images in a Few Kilobytes

The approach I chose was to create graphics with animated matrix images. These would be inserted into a JavaScript array, not as binary assets. To draw the images, I used an open-source map creation tool called Tiled. This map could have only three variations: transparent, gray, and black, as exemplified in the image below:

![Tiled](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/image-format.png?raw=true)

The image above could be exported as JSON by Tiled. One of the properties of this JSON is the array containing the image, something like:

```
/* Anchor icon of the game title */
[1, 1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1]
```

This array would represent an image. The number 1 would be the transparent pixel, the number 2 the gray pixel, and the number 3 the black pixel. The images, by default, would be in black and white. When rendering them, you can change the color palette, so an image can be "strong blue" and "light blue" instead of gray and black.

The image above is a 16x16 resolution image. In this case, every 16 pixels, the function that performs rendering must advance one row for every 16 positions in the array.

This alone helps a lot with gzip compression, but it can be made even smaller! So, for each of these images, I ran a script that reduced every number in the array by 1, using only 0, 1, and 2. After that, I used an 8-bit number to represent 4 positions of that array. For example:

To represent the array:

```[2, 2, 1, 2]```

You can simply use the number 116.

```116 in binary = 10100110```

10 = 2 in binary
10 = 2 in binary
01 = 1 in binary
10 = 2 in binary

If we were working with a low-level language, this wouldn't make sense. But since everything in a JavaScript file is a string, the text "116" takes up less disk space than the text "[2,2,1,2]".

Additionally, the script that performs this compression also handles sequences of zeros. As all the transparent parts of the image are "0", several sequences of zeros are added to an array. This can be replaced by just one negative number representing the number of consecutive zeros. For example:

```[1,0,0,0,0,0,0,0,0,0,0,0,0,2]```

Replaced by:

```[1,-12,2]```

This way, we have a much smaller string. When the "unpacking" function of the image encounters a negative number, it simply adds "x*-1" zeros to the array.

The script that performs this compression is as follows:

(It works both in the browser console and in a runtime environment like NodeJS or BUN)

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

## The Result

### Death Sea XIII
The game "Death Sea XIII" was created using the approach mentioned above. To play it, simply access the link:

[JOGAR](https://death-sea-xiii.vercel.app/)
![Death Sea XIII](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/title.png?raw=true)
![Gameplay](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/gameplay.gif?raw=true)

I have chosed to create a 2D shooter game because it is quick to program, both in terms of mechanics and balancing difficulty and gameplay. The name "Death Sea" was chosen for obvious reasons, and the "13" (XIII in Roman numerals) refers to the century in which its story takes place and a reference to the competition.

The Competition
The [js13kgames](https://js13kgames.com/) competition happens every year and is divided into categories. This project was entered in the desktop games category. During the development of Death Sea, I followed the projects being created on the competition's Slack channel. Many of them are truly impressive. I recommend that readers interested in the subject take a look at these projects:


 - [Terror of Mongolia](https://dev.js13kgames.com/2023/games/the-terror-of-mongolia)
 - [Battle Commander: Middle ages](https://dev.js13kgames.com/2023/games/battle-commander-middle-ages) 
 - [Fort Knight](https://dev.js13kgames.com/2023/games/fort-knight)
 - [The Knighting of Sr. Isaac](https://dev.js13kgames.com/2023/games/the-knighting-of-sr-isaac)
 - [Exit The Castle](https://dev.js13kgames.com/2023/games/exit-the-castle)
 - [Moai Alley](https://dev.js13kgames.com/2023/games/moai-alley)


I recommend checking out this list instead of just looking at the winners. Unfortunately, none of these made it to the top 10 in the desktop category. The winners were games with the best user interface. It's a bit disappointing that this is more of a web design competition than a game competition. By some miracle, my game made it among the top 100 (90th out of 146) because, among other flaws, its graphic interface was lacking.
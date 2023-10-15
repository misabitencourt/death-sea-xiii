# Creating a Game in JavaScript with Only 13KB

As a game enthusiast and a programmer, from time to time, I seek to study a bit about game development. Some time ago, I was studying how to create a 2D game scene using only C and OpenGL, which resulted in an interesting proof of concept (POC) project.

This project sparked my interest in 2D image processing and a better understanding of formats like PNG. A while later, I came across an announcement for a JavaScript game development competition, [js13kgames](https://js13kgames.com/). In this competition, participants are required to develop the best game in JavaScript using only 13KB in their source code, including scripts, libraries, sounds, and images! All of this must be packed into just 13 kilobytes. The game had to be developed within a month. In August, the theme of the game would be revealed. In September, the submission deadline, and in October, the results would be announced.

The game could be compressed with ZIP, and JavaScript could be minimized. Creating scripts in just 13KB is not really a problem, as we have very efficient JavaScript minifiers at our disposal. MIDI sounds are not heavy either, nor are texts. The real challenge lies in creating graphics.

Excited by the challenge, I decided to do something new and technically unusual. If I were to use a [sprite](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)) in PNG format to keep it small, it would have to be of very low resolution (which is what many competitors used). Creating vector graphics like SVG is another obvious solution. However, the "flash game" aesthetics would be almost inevitable, and all the images would look like paper cutouts (amazingly, the winner used this approach despite its flaws).

## Matricial Images in a Few Kilobytes

The approach I chose was to create graphics with animated [matricial images](https://edisciplinas.usp.br/pluginfile.php/6543522/mod_resource/content/3/Aula2.Ex2.%20Imagens%20Matriciais%20vs%20Imagens%20Vetoriais.html). These would be inserted into a JavaScript array, not a binary asset. To draw the images, I used an open-source map creation tool, [Tiled](https://www.mapeditor.org/). This map could have only three variations: transparent, gray, and black, as exemplified in the image below:

![Tiled](https://github.com/misabitencourt/death-sea-xiii/blob/master/docs/image-format.png?raw=true)

The image above could be exported in JSON by Tiled. One of the properties of this JSON is the array containing the image, something like:

```
/* Anchor icon of the title screen */
[1, 1, 1, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 2, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1]
```

This array would represent an image. The number 1 would be the transparent pixel, the number 2 the gray pixel, and the number 3 the black pixel. The images, by default, would be in black and white. When rendering them, you can change the color palette, so an image can be "strong blue" and "light blue" instead of gray and black.

The image above is a 16x16 image. In this case, for every 16 pixels, the rendering function must advance one line every 16 positions in the array.

This alone helps a lot with GZIP compression, but it can get even smaller! Therefore, for each of these images, I passed it through a script that reduced each number in...

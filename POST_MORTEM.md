
# Death Sea Post Mortem

## JS 13 what?

This game was my first entry on the JS13Games competition. Some days ago, i had been scrolling
my Github home feed (it was "For you beta") and i had figured out about this competition. My interest 
on that was because of a P.O.C. (proof of concept) i went to do.

### I needed to finish a game

Some months before of that i had been watching some youtube videos about old consoles game development.
Old consoles like the first Game Boy and NES have a very primitive processors and resources to provide
that gems we played on old times. On Youtube, we could found awesome people that teaches us how these
are made, some hacks and some well known glitches explanations. I have learned some things with it and
i had not have a motive to use these technics on practice because i am working as a backend programmer.

Besides this, i have never finished a game development before. All i had done were just POCs and simple
game scenes like [this unfinished racing game](https://github.com/misabitencourt/outrun-like-game) i 
made with GCC last year. It is just a empty scene made with "almost bare metal code" (with no engine).

### No engine, bare metal

As the last test i had done, i went to create something with no complex libraries or engines in order to
comprehend better the programming language itself. With that silly racing game, i have got some good skills
with C++ wich i used on my own serious job.

Although, i have went to start a project to that competition for the good challange of create a 13k javascript
game using some nice techniques and no libs.

## JS resources built in

You really dont want so many libraries to do something basic in Javascript. I am always said that to my programmer
colleagues and they strikes me like they forget it every day. With "vanilla javascript" you can create a entire 
application. It was not true in the year of 2013 but now, 10 years after that, we dont need Jqueries, ajaxes and
megabytes of pollyfills anymore.

Talking about games, since the major browsers got canvas and audio support for Javascript (it is more than 10 years now), we
have all we need to create 2d games. These resources are our [SDL](https://www.libsdl.org/) for javascript built in.

On that last racing game i have worked in, i had to use a lib for canvas drawing, sound reproduction and font files. On javascript
it all built in!

## Mastering compressing

The competition challenge is about to create a game in only 13kb. It is 100 times less than the size of the last selfie i took.
These 13 kilobytes must contains all the game images, texts, sounds and scripts. 

 - How to compress the script code? Easy peasy, using a minifier.
 - How to compress sounds? Lets use midi samples, the game sound whould like a microwave, but ok. Let's do it for science.
 - How to compress texts? It is not a real challenge, its just not to write a bible on it.

Okay, sounds simple. But how to compress the images? PNG sounds not enough for 13k. The competitions before projects i have seen
used math drawing like vectorial graphics, extremally low resolution PNGs and some of them used workarrounds like ASCII drawing and
emojis (no! god, please, no!). So, i have got an ideia to create matrixial drawings like PNGs but using less bytes to represent each
pixels.

About 4 years ago, i was studing how to create 2d drawings with just OpenGL [here is what i've made](https://github.com/misabitencourt/opengl-2d-game-scene). I felt forced to use libpng to load the bitmap of images. Studing how the png format works behind the scenes, i 
could figured out that ordinary pngs uses a lot of bytes to represent each pixel. With that thoughts on mind, i decided to create a 
specific matrixial image format to use on javascript for the project.

The results are satisfactory. I was able to create a game with a big cover image, a lot of animations, explosions and 3 kind of enemies
using 13kb. How it was made can be found [here](docs/REF.md#images).

### Improvements

Only 3 types of colors were used to draw all the game sprites and images. Using a compression strategy like mentioned above, 4 types of colors
could be available for that. So, the images could be more detailed.

For a better compression, a single image array with all the games images and sprites together could be way more efficient for compression.

## I am not Kojima

The 2023 competition theme was about medieval environment (13th century to be more precise) and the deadline had finishing in a month.

The last but not less important task was create a game system design. I have felt terrible on that. Every one of ideas of mine are terrible!
It makes Miyamoto and Kojima more and more genial for me. But i was needing to try.

The first decision was about the game genre. My favorite "dark age" games are RPGs, Hack and slash (fighting action games) and RTS (games like Age of Empires). It is impossible to create a good RPG game using 13kb and with 1 month deadline. A simple hack and slash seemed to be a good fit but 
i would lose a lot of time with fighting mechanics and difficulty balance. A simple RTS would like a generic "Sim City". My last resort was create 
something like hack and slash but without any complex mechanics, so i have decided to create a shooter (some hack and slash games have a shooter mechanics like Nier Replicant).

My first prototype was a witch shooting dragons. I dont like that, the "witch" topview on low resolution was unrecogniseble. And i dont like 
Harry Potter (i am sorry, HP fans). The second prototype was an Airplane Fighter F-16 that travels through time and shoots dragons to save the 
future. As i am wrote before, i am really no Miyamoto. I may be as mad as Kojima, but I'm not a genius like him.

Finally, my last and less insane idea was to transform the Fighter into a ancient Ship to create a decent medieval plot.

## "English, motherF***! Do u speak it?!"

Another challange i found was about the game texts and documentations. English is not my native language. I have born in Brazil and we speak
portuguese here (NOT SPANISH!). As i have some english vocabulary and i can keep some simple conversations, i wrote the game plot in portuguese and then i translated it manually (translators does not work well). I had my English Teacher help to fix my typos and review my texts.

Some generative I.A. tool have helped me to create somethings like the Captain name and rewrite the letter to the King (part of the story). 
I can not write in too formal english yet.



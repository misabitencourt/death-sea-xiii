
# WIP

# Death Sea Post Mortem

## JS 13 what?

This game was my first entry on the JS13Games competition. Some days ago, i had been scrolling
my Github home feed (it was "For you beta") and i had figured out this competition. My interest 
on that was because of a P.O.C. (proof of concept) i went to do.

### I must finish a game

Some months before of that i had been watching some youtube videos about old consoles game development.
Old consoles like the first Game Boy and NES have a very primitive processors and resources to provide
that gems we played on old times. On Youtube, we could found awesome people that teaches us how these
are made, some hacks and some well know glitches explanations. I have learned some things with it and
i had not have a motive to use these technics on practice because i am working as a backend programmer.

Beside of this, i have never finished a game development before. All of i had done were just POCs and simple
game scenes like [this unfinished racing game](https://github.com/misabitencourt/outrun-like-game) i 
made with GCC last year. It is just a empty scene made with "almost bare metal code" (with no engine).

### No engine, bare metal

As the last test i had done, i went to create something with no complex libraries or engines in order to
compregend better the programming language itself. With that silly racing game, i have got some good skills
with C++ wich i used on my own serious job.

Although, i have went to start a project to that competition for the good challange of create a 13k javascript
game using some nice techniques and no libs.

## JS resources built in

You really dont want so many libraries to do something basic in Javascript. I am always said that to my programmer
collegues and they strikes me like they forget it every day. With "vanilla javascript" you can create a entire 
application. It was not true in the year of 2013 but now, 10 years after that, we dont need Jqueries, ajaxes and
megabytes of pollyfills anymore.

Talking about games, since the major browsers got canvas and audio support for Javascript (it is more than 10 years now), we
have all we need to create 2d games. These resources are our [SDL](https://www.libsdl.org/) for javascript built in.

On that last racing game i have worked in, i had to import a font file and use the a SDL specific lib for fonts. On javascript,
it all built in!

## Mastering compressing

The competition challenge is about to create a game in only 13kb. It is 100 times less than the size of the last selfie i took.
These 13 kilobytes must contains all the game images, texts, sounds and scripts. 

 - How to compress the script code? Easy peasy, using a minifier.
 - How to compress sounds? Lets use midi samples, the game sound whould like a microwave, but ok. Lets do it for the science.
 - How to compress texts? It is not a real challenge, its just not to write a bible in it.

Okay, sounds simple. But how to compress the images? PNG sounds not enough for 13k.
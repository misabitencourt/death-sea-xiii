
(() => {

    /**
     * 
     *                                    DEATH SEA XII
     *  
     *  This game have been made for a https://js13kgames.com/ Contest! It must be 13Kb zipped! 
     * 
     *  This is all the game source code. Please, keep all the code in this scope to safetly and easily mangle the var names 
     *  on the distribution version.
     * 
     *  All of this code will be mangled, minified, compressed in the final version like other Javascript projects in 2023.
     * 
     *  The sound-player lib is the only thing that is appart of this file, but it is optional to the execution.
     */


    /**
     *                                    GAME ASSETS
     * 
     * Here it is all game assets like images, sound effects, music and shapes.
     *
     * The images are compressed in Javascript arrays. To comprehend thease are created, see TODO
     * 
     */
    const createSound = type => {
        const isSong = type.indexOf('song') === 0;

        return {
            songData: [
              { // Instrument 0
                i: [
                1, // OSC1_WAVEFORM
                192, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                1, // OSC2_WAVEFORM
                191, // OSC2_VOL
                116, // OSC2_SEMI
                9, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                6, // ENV_ATTACK
                22, // ENV_SUSTAIN
                34, // ENV_RELEASE
                0, // ENV_EXP_DECAY
                0, // ARP_CHORD
                isSong ? 0 : 25, // ARP_SPEED
                0, // LFO_WAVEFORM
                69, // LFO_AMT
                isSong ? 3 : 90, // LFO_FREQ
                1, // LFO_FX_FREQ
                1, // FX_FILTER
                23, // FX_FREQ
                167, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                77, // FX_PAN_AMT
                isSong ? 2 : 90, // FX_PAN_FREQ
                isSong ? 25 : 3, // FX_DELAY_AMT
                isSong ? 1 : 2 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1],
                // Columns
                c: [
                  {n: (() => {
                    if (type === 'song-intro') {
                        return [137,137,,137,137,137,137,,142,,137,137,137,137,,142,142,,142,,144,144,144,144,,144,144,144,144,144];
                    }
                    if (type === 'song-scores') {
                        return [139,139,139,142,142,142,142,142,142,142,142,137,137,137,142,142,142,142,142,142,142,142];
                    }
                    if (type === 'bonus') {
                        return [147,149,151,152];
                    }
                    if (type === 'explosion') {
                        return [135];
                    }
                    if (type === 'damage') {
                        return [149];
                    }
                    return [];
                  })(),
                   f: []}
                ]
              },
            ],
            rowLen: 5513,   // In sample lengths
            patternLen: 32,  // Rows per pattern
            endPattern: 0,  // End pattern
            numChannels: 1  // Number of channels
        };
    }; 

    const GAME_ASSETS = {
        IMAGES: {
            COVER_SHIP: {
                res: { w: 90, h: 81 },
                compressed: [-15,80,-16,2,64,-3,9,64,-16,41,-3,2,128,-16,2,164,-3,40,-17,32,-3,2,-17,2,-4,128,-17,32,-3,8,-17,10,-4,128,-16,10,170,-3,8,-16,2,170,168,-2,2,168,-16,2,170,-3,170,164,-16,10,170,-2,18,168,16,-15,2,169,96,-1,4,10,-1,64,-14,2,170,88,64,1,-1,160,1,-14,2,169,86,1,-1,64,10,-1,4,-14,169,85,96,4,16,-1,160,-1,16,-13,42,85,86,-1,20,-1,10,-2,64,-12,2,149,85,96,1,64,-1,160,-1,1,-13,37,85,86,-1,65,-1,10,-2,170,-12,10,85,85,168,16,4,-1,160,-1,2,-13,165,85,90,132,-1,16,10,-2,32,-12,10,85,85,90,-2,64,160,32,2,-13,149,170,170,168,-1,1,10,168,-1,32,-6,64,-5,10,104,10,2,160,2,170,168,-1,2,-6,9,64,-4,1,40,-1,170,162,-1,10,170,-1,170,32,-6,170,64,-4,64,2,170,168,128,-2,170,170,2,-6,10,165,-4,16,42,170,149,96,-1,10,170,166,128,32,-6,153,-4,4,10,160,5,104,-1,170,170,149,96,2,-6,8,-4,1,74,160,21,90,-1,170,170,85,90,-1,32,8,-5,128,-4,26,160,21,86,128,170,170,85,85,128,2,-1,160,-4,8,-4,6,160,21,85,160,170,169,85,81,96,-1,32,10,160,-4,128,-3,1,160,5,85,106,42,165,85,85,42,10,170,170,168,-4,8,-4,26,1,85,90,170,169,85,85,82,162,170,170,168,-5,128,-3,6,128,85,85,170,169,85,85,85,42,170,170,-1,42,168,-3,8,-4,160,21,85,90,170,85,85,85,81,168,170,170,170,168,-4,128,-3,26,5,85,85,170,21,21,85,85,22,128,2,170,128,-4,8,-3,4,165,85,85,90,161,81,85,85,81,72,-1,170,8,-5,128,-2,1,10,85,85,85,106,20,21,85,85,6,128,10,160,128,-4,8,-3,64,165,85,85,86,165,69,85,85,84,170,-1,150,8,-5,128,-2,16,10,21,85,85,82,148,85,85,85,74,160,9,96,160,-4,10,160,-1,4,-1,161,85,85,85,74,69,80,-1,20,170,-1,150,10,128,-2,2,170,168,-1,1,-1,10,21,85,85,85,40,80,-2,22,160,41,96,166,-3,10,168,-2,64,-1,161,64,2,170,170,164,-3,90,2,86,138,88,-4,128,-1,16,-1,2,42,170,170,170,170,170,170,161,-1,160,37,88,165,160,-3,8,128,4,-2,42,-1,2,170,170,170,170,170,129,106,2,85,138,88,128,-3,170,1,-3,128,-2,40,170,128,-1,42,42,128,37,88,165,130,-2,2,170,128,64,-5,2,10,170,168,-1,42,128,2,85,138,96,4,-2,10,160,16,-5,2,160,-1,32,-1,2,160,-1,37,88,168,-1,16,-2,8,4,-4,42,170,160,21,88,-2,10,-1,2,85,138,170,130,-3,161,-4,10,-2,5,86,-5,32,26,170,168,32,-3,128,-4,128,-1,20,85,128,-2,9,84,1,170,170,-1,2,-3,2,-4,8,-1,85,69,88,-2,2,-1,85,104,165,160,-1,32,-2,2,8,-3,2,-1,85,84,85,128,-2,149,85,90,137,90,-1,2,-3,40,32,-3,33,85,85,69,88,-2,85,85,86,168,149,160,-1,32,-2,2,170,128,-2,6,21,85,84,85,128,1,85,85,85,166,137,90,-1,2,-3,10,170,-2,1,33,85,85,69,88,-1,85,85,85,105,104,149,160,-1,160,-3,170,152,-2,66,21,85,84,85,128,85,85,85,90,86,137,90,128,10,-3,2,165,96,-1,16,32,85,85,69,86,9,85,85,86,169,160,149,168,-1,160,-4,149,128,4,-1,129,21,84,21,90,165,85,85,106,154,9,90,128,10,-4,2,86,5,-1,2,1,85,81,85,106,149,85,85,169,128,149,168,-1,160,-4,41,89,64,-1,168,-1,21,5,85,170,85,85,22,88,9,90,128,10,168,-3,2,165,104,42,170,165,85,85,85,86,169,80,80,89,128,149,170,170,170,160,-3,38,165,106,170,106,149,85,85,85,90,165,85,-1,106,170,90,170,170,170,-4,150,149,106,169,106,128,-3,2,170,170,170,170,170,170,170,170,160,-3,2,90,149,106,165,170,170,170,170,170,170,170,170,170,170,170,170,170,170,-4,9,90,85,106,149,106,170,170,170,170,170,170,170,170,170,170,170,170,152,-4,37,105,85,170,165,106,170,170,170,170,170,170,170,170,170,170,170,165,128,-4,149,169,85,170,165,106,170,170,170,170,170,170,170,170,170,170,165,104,-4,2,85,169,85,106,165,106,170,170,170,170,170,170,170,170,170,149,105,128,-4,9,85,169,85,106,165,170,170,170,170,170,170,170,170,170,165,106,88,-5,37,85,169,85,90,170,170,170,170,170,170,170,170,165,85,106,90,128,-5,149,85,170,85,85,169,86,170,170,170,170,170,165,90,169,90,152,-5,2,169,85,106,165,85,106,170,170,170,170,170,170,170,149,106,150,128,-5,42,169,85,86,169,85,85,85,85,85,85,85,85,85,106,86,168,-6,165,170,85,85,170,85,85,85,85,85,85,85,85,105,86,166,-6,10,85,106,85,85,106,165,85,85,85,85,85,90,169,90,165,128,-6,170,85,106,85,85,90,170,170,170,170,170,170,149,106,149,104,-6,10,106,85,106,149,85,106,170,170,170,170,170,170,170,85,104,-7,41,106,165,86,170,85,85,85,85,85,85,85,85,85,106,-6,2,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,-2,42,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170],
            },

            // The game arrow was replaced with an anchor :D
            ARROW: {
                res: { w: 16, h: 16 },
                compressed: [-1,26,148,-2,26,160,-1,4,2,128,64,6,2,130,128,26,170,170,144,-1,2,128,-1,24,2,128,96,170,2,130,169,170,2,130,169,24,2,128,96,24,2,128,96,26,2,128,160,10,150,150,128,2,170,170,-2,6,144,-2,1,64,-1]
            },

            TITLE_SEA: {
                res: { w: 800, h: 60 },
                c1: '#05647b',
                c2: '#08172e',
                data: (() => {
                    const image = [];
                    for (let i=0; i<800; i++) 
                    for (let j=0; j<4; j++)
                        image.push(2);
                    for (let i=0; i<800; i++) 
                    for (let j=0; j<56; j++)
                        image.push(1);
                    return image;  
                })()
            },

            BULLET_BONUS: {
                res: { w: 26, h: 13 },
                compressed: [170,170,170,170,170,170,168,42,168,-2,10,170,136,170,138,170,170,-1,168,162,168,-2,10,170,138,106,170,170,170,170,168,166,136,138,138,130,2,138,40,136,168,168,168,168,10,136,138,138,138,138,138,40,136,168,168,40,168,169,136,138,138,138,138,138,152,136,168,168,168,168,2,128,128,128,130,138,170,170,170,170,170,170]
            },

            LIFE_BONUS: {
                res: { w: 26, h: 13 },
                compressed: [170,170,170,170,170,170,170,166,170,170,170,170,170,166,166,154,170,170,170,169,153,153,170,106,170,170,154,105,154,170,170,170,169,170,153,170,101,89,90,150,165,154,166,106,154,170,153,169,170,101,105,106,154,105,154,166,106,154,170,106,105,170,102,169,170,169,154,149,102,106,149,170,166,170,170,170,170,170,170,170,170,170,170,170]
            },

            SHIP_1: {
                res: { w: 32, h: 32 },
                c1: '#85867a',
                c2: '#5c2e22',
                generateInverted: true,
                compressed: [-20,42,-7,37,160,-6,42,-7,32,-7,32,-7,32,-7,32,-6,1,164,-6,4,164,-6,22,36,-6,72,36,-5,1,24,36,-5,4,88,36,-5,16,88,36,-5,64,88,36,-4,1,-1,88,36,-4,4,-1,88,36,-4,16,-1,24,36,-4,64,-1,8,36,-2,32,26,64,-1,2,36,42,170,160,-1,168,-2,164,149,85,160,-1,38,170,160,38,85,85,160,-1,41,85,90,169,86,170,128,-1,2,170,165,85,90,170,-3,42,170,170,170,170,-3,42,170,170,170,168,-3,10,170,170,170,168,-3,2,170,170,170,160,-4,170,170,170,128,-9]
            },

            SHIP_2: {
                res: { w: 32, h: 32 },
                c1: '#85867a',
                c2: '#5c2e22',
                generateInverted: true,
                compressed: [-20,42,-7,38,128,-6,42,-7,32,-7,32,-7,32,-7,32,-6,1,164,-6,4,164,-6,22,36,-6,72,36,-5,1,24,36,-5,4,24,36,-5,16,24,36,-5,64,24,36,-4,1,-1,24,36,-4,4,-1,24,36,-4,16,-1,24,36,-4,64,-1,8,36,-2,32,10,64,-1,2,36,42,170,170,2,168,-2,164,149,85,168,-1,166,170,160,38,85,85,160,-1,41,85,90,169,85,86,128,-1,10,165,85,85,86,170,-2,2,170,85,85,90,170,-3,170,170,170,170,168,-3,42,170,170,170,168,-3,2,170,170,170,160,-4,170,170,170,128,-9]
            },

            BULLET: {
                res: { w: 4, h: 8 },
                compressed: [130, 130, 130, 130, 65, 65, 65, 65]
            },

            HEART: {
                c1: '#FE3333',
                c2: '#000',
                res: { w: 18, h: 18 },
                compressed: [2, 168, 2, 168, 0, 170, 128, 42, 128, 41, 86, 9, 90, 10, 85, 90, 85, 106, 165, 85, 165, 85, 170, 85, 85, 85, 90, 165, 85, 85, 85, 170, 85, 85, 85, 90, 165, 85, 85, 85, 162, 149, 85, 85, 104, 10, 85, 85, 90, 0, 41, 85, 86, 128, 0, 165, 85, 160, 0, 2, 149, 104, 0, 0, 10, 90, 0, 0, 0, 42, 128, 0, 0, 0, 160, 0, 0, 0, 10, 0, 0]
            },

            ENEMY_1_1: {
                c1: '#c5454c',
                c2: '#000',
                res: { w: 32, h: 32 },
                compressed: [-128,10,128,-5,168,37,96,160,-2,2,130,90,165,90,152,-2,9,169,106,41,86,150,-2,37,165,168,10,86,149,138,168,149,165,160,2,149,165,101,86,86,150,160,-1,165,105,101,86,90,90,128,-1,41,90,149,85,169,106,-2,10,86,101,86,101,168,-2,10,89,169,90,153,160,-2,10,89,101,86,89,128,-2,2,150,85,85,101,128,-2,2,165,153,89,150,128,-2,2,170,149,85,170,128,-4,37,86,-6,10,168,-3]
            },

            ENEMY_1_2: {
                c1: '#c5454c',
                c2: '#000',
                res: { w: 32, h: 32 },
                compressed: [-49,128,-5,128,2,160,-4,2,160,10,168,-4,10,104,41,106,-4,41,90,165,86,128,-3,165,88,41,85,160,-2,2,165,96,2,85,104,-2,10,149,88,9,85,90,-2,42,85,106,37,85,90,128,-1,170,85,168,10,165,85,160,2,169,86,-2,37,85,160,2,149,85,128,-1,149,165,160,2,150,149,96,2,86,153,160,2,153,165,160,9,86,150,160,2,165,165,128,9,86,149,170,170,149,166,-1,37,85,165,101,86,86,168,-1,10,165,105,101,86,90,96,-2,42,170,149,85,169,96,-3,2,101,86,102,160,-3,9,169,90,152,-4,9,101,86,88,-4,2,85,85,96,-5,153,89,128,-5,149,85,128,-5,37,86,-6,10,168,-3]
            },

            ENEMY_1_3: {
                c1: '#c5454c',
                c2: '#000',
                res: { w: 32, h: 32 },
                compressed: [-1,8,-4,8,-2,42,-4,42,-2,166,128,-3,166,128,2,149,160,-2,2,149,160,10,85,104,-2,10,85,104,41,89,90,-2,41,85,138,149,86,86,128,-1,165,86,106,37,85,149,160,2,149,90,104,41,85,101,104,10,85,105,96,9,85,105,90,41,85,165,96,9,85,90,86,37,85,149,96,9,85,86,86,37,90,85,104,10,165,101,86,37,89,90,170,-1,37,101,86,37,85,90,170,-1,37,105,86,37,89,86,-2,165,86,86,37,105,86,-2,149,85,170,37,165,86,-1,2,149,165,90,37,86,150,128,10,86,153,86,37,89,170,128,-1,170,150,86,37,101,168,-2,2,149,154,169,149,160,-3,165,101,86,86,128,-3,41,101,86,90,-4,10,149,85,168,-4,2,101,86,96,-4,9,169,90,152,-4,9,101,86,88,-4,2,85,85,96,-5,153,89,128,-5,149,85,128,-5,37,86,-6,10,168,-3]
            },

            WATER_1: {
                c1: '#4ebcb9',
                c2: '#349aa4',
                res: { w: 24, h: 24 },
                compressed: [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,86,85,85,89,85,85,85,85,85,86,149,85,85,85,89,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,169,85,85,85,85,86,86,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,89,85,85,89,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,149,85,85,105,85,85,85,85,85,85,85,85,86,86,85,85,85,85,85,169,85,85,89,85,85,85,85,85,85]
            },

            WATER_2: {
                c1: '#4ebcb9',
                c2: '#349aa4',
                res: { w: 24, h: 24 },
                compressed: [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,89,85,85,101,85,85,90,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,86,86,85,85,85,85,85,169,85,85,85,85,85,85,85,85,85,89,85,85,89,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,86,85,85,85,85,85,85,85,85,85,85,85,85,85,85,86,85,169,85,85,85,85,86,86,85,85,85,85,85,85,85,85,105,85,85,85,85,85,85]
            },

            EXPLOSION_1: {
                res: { w: 32, h: 32 },
                c1: '#716e00',
                c2: '#000',
                compressed: [-27, 64, -18, 4, 0, 0, 16, -26, 16, -14, 26, 64, -6, 42, 165, -4, 4, 0, 42, 106, -6, 41, 90, 0, 1, -4, 105, 89, -6, 169, 89, -6, 106, 106, -6, 26, 169, -6, 6, 144, -6, 1, 64, -4, 1, -30, 1, -3, 64, -9, 16, -28, 64, -3, 16, -8]
            },

            EXPLOSION_2: {
                res: { w: 32, h: 32 },
                c1: '#fff33c',
                c2: '#000',
                compressed: [-3, 16, -29, 16, -4, 64, -20, 4, -6, 64, 9, 9, -5, 36, 10, 105, 1, 64, 20, 0, 0, 26, 90, 170, 89, 0, 64, 0, 0, 10, 170, 170, 168, -4, 6, 170, 170, 169, -3, 1, 26, 170, 170, 170, -4, 106, 170, 170, 169, -4, 42, 170, 106, 169, -4, 42, 169, 90, 170, 165, -3, 106, 170, 106, 170, 84, 0, 4, 0, 106, 170, 170, 169, -3, 1, 170, 170, 170, 164, 0, 4, 0, 6, 90, 170, 170, 164, -4, 6, 170, 170, 85, -4, 6, 170, 86, 64, -4, 4, 5, 6, 64, -5, 1, 1, 64, -7, 64, -19, 80, -4, 4, -4, 1, -20]
            },

            EXPLOSION_3: {
                res: { w: 32, h: 32 },
                c1: '#fff33c',
                c2: '#000',
                compressed: [-8, 20, 0, 1, 0, 0, 64, -9, 4, -11, 80, 4, -4, 128, 0, 16, 20, 0, 20, 0, 4, 36, 0, 5, 64, 1, 160, 0, 0, 9, 0, 26, 148, 1, 128, 0, 0, 6, 70, 170, 169, 164, -4, 26, 170, 170, 168, 0, 0, 16, 1, 170, 170, 170, 169, 0, 1, 0, 6, 170, 169, 170, 169, 2, 0, 0, 10, 170, 170, 165, 170, 65, 0, 2, 74, 169, 169, 170, 170, 128, 0, 0, 6, 170, 89, 150, 170, 128, 0, 0, 6, 170, 153, 106, 170, 144, 0, 0, 10, 170, 150, 90, 170, 160, 64, 4, 10, 169, 101, 106, 170, 165, 148, 0, 6, 170, 166, 101, 170, 144, 0, 1, 134, 170, 154, 106, 170, 64, 0, 6, 166, 170, 106, 106, 169, -3, 2, 170, 170, 170, 169, 0, 1, 0, 0, 106, 170, 170, 164, 0, 64, 0, 64, 26, 170, 170, 144, 80, 0, 0, 1, 133, 170, 169, 64, 96, 0, 0, 2, 0, 25, 100, -6, 20, 6, -3, 4, 0, 0, 20, 6, -6, 16, 1, 64, 4, -10, 64, 16, -4, 16, -5, 1, 0, 0]
            },

            EXPLOSION_4: {
                res: { w: 32, h: 32 },
                c1: '#fff33c',
                c2: '#000',
                compressed: [-3, 20, 4, -3, 16, 0, 1, 106, 90, 100, -3, 16, 170, 170, 90, 169, 64, 1, 16, 2, 170, 169, 10, 170, 164, 0, 0, 42, 170, 144, 5, 170, 169, 0, 0, 42, 164, 0, 0, 106, 170, 0, 0, 170, 160, 0, 0, 6, 170, 0, 17, 170, 64, -3, 106, 0, 1, 169, -4, 21, 0, 0, 80, -5, 80, 5, 64, 0, 1, 0, 0, 1, 160, 42, 144, 1, -3, 6, 168, 42, 144, -4, 6, 168, 42, 128, -4, 6, 168, 42, 128, -4, 2, 169, 170, 64, -4, 1, 169, 170, 128, 64, 0, 16, 0, 2, 168, 106, 64, -5, 164, 41, -6, 80, 4, -6, 0, 6, 64, -4, 18, 128, 10, 144, 0, 0, 4, 0, 10, 144, 10, 164, -4, 26, 160, 10, 169, -4, 42, 144, 6, 170, 64, -3, 42, 144, 6, 170, 144, -3, 42, 128, 1, 170, 161, 64, 0, 42, 70, 64, 0, 106, 138, 170, 128, 106, 64, 0, 0, 5, 74, 170, 168, 170, 128, -3, 6, 170, 168, 106, 64, -3, 1, 106, 164, 21, 0, 4, 4, 0, 0, 4, -4]
            },

            CANNON_BALL: {
                res: { w: 16, h: 16 },
                compressed: [-1,5,64,-2,90,148,-1,1,170,169,-1,6,170,170,64,10,170,150,144,26,170,166,148,42,170,170,164,42,170,170,164,42,170,170,164,42,170,170,164,10,170,170,148,6,170,170,80,2,170,170,64,-1,170,169,-2,42,164,-5]
            },

            LETTER_PEN: {
                res: { w: 40, h: 40 },
                compressed: [1,85,85,85,85,85,64,-3,25,105,85,85,85,85,100,-3,32,10,-4,9,-3,128,2,-4,2,-3,170,170,130,170,170,170,144,128,-4,128,-4,128,-4,32,170,170,170,164,32,-1,160,-2,32,-4,32,10,96,-2,32,-4,32,37,96,-2,40,106,170,170,168,34,149,96,-2,8,-4,41,89,80,-2,8,170,170,170,168,41,101,144,-2,8,-4,85,102,64,-2,8,-3,2,85,149,144,-2,8,21,85,85,86,86,85,128,-2,8,-3,6,86,86,-3,8,42,170,170,170,89,88,-3,8,-3,37,89,100,-3,8,-3,37,101,164,-3,8,42,170,170,165,101,100,-3,8,-3,9,149,96,-3,8,42,170,170,169,149,128,-3,8,-3,37,150,-4,8,1,85,85,102,89,-4,8,21,85,85,90,89,-4,8,-3,2,104,-4,8,10,170,170,170,136,-4,10,-3,2,8,-4,2,-3,2,136,-4,2,2,170,170,170,2,-4,2,-4,2,-4,2,-1,85,85,85,82,-4,2,128,-1,170,170,170,170,168,-3,128,-1,8,-3,2,-3,32,-1,2,-3,1,-3,36,-1,2,-3,1,-3,8,-1,2,-3,1,-3,2,64,8,-3,2,-4,170,165,85,85,85,88,-4,21,64,-4]
            },

            ENEMY_2_1: {
                res: { w: 32, h: 32 },
                c1: '#5b4e9d',
                c2: '#000',
                compressed: [-12,10,170,128,-5,37,85,104,-5,149,170,130,-4,2,86,-2,128,-2,32,9,88,2,-1,128,-2,32,9,88,2,-4,96,9,88,1,128,-3,96,9,88,1,128,-3,96,9,88,1,128,-3,96,9,88,1,128,-3,96,9,88,5,128,-1,4,-1,96,9,88,6,128,-1,25,-1,96,9,88,6,64,8,10,64,32,9,88,6,64,40,2,144,36,9,88,10,1,164,-1,164,36,9,88,10,6,144,-1,41,36,9,88,10,26,64,-1,10,104,25,89,42,105,-1,20,-1,170,41,90,170,164,5,106,144,170,165,86,170,128,170,26,170,162,165,86,162,170,169,-1,42,160,37,86,2,165,-4,169,86,128,-4,2,9,90,32,-4,2,10,104,32,-4,10,9,88,40,-5,2,104,-6,2,160,-6,2,96,-7,128,-11]
            },

            ENEMY_2_2: {
                res: { w: 32, h: 32 },
                c1: '#5b4e9d',
                c2: '#000',
                compressed: [-4,2,-5,1,-1,2,128,-4,1,-1,42,128,-4,1,128,150,128,-3,64,1,130,86,128,-3,64,-1,137,88,1,-3,96,2,137,88,2,-1,64,-1,96,6,137,104,10,-1,64,-1,96,6,137,104,9,-1,64,-1,160,6,137,104,40,1,64,-1,160,6,137,104,104,1,64,-1,160,6,9,104,104,1,-2,160,6,9,104,96,1,-2,148,6,73,104,96,2,-2,152,2,73,104,96,10,-2,40,2,73,104,96,24,-2,8,2,9,104,32,40,1,-1,8,2,9,104,32,96,1,-1,2,106,25,89,160,128,6,20,-1,170,41,90,170,128,26,106,144,170,165,86,170,-1,96,26,170,162,165,86,162,150,128,-1,42,160,37,86,2,170,-4,169,86,128,-4,2,9,90,32,-4,2,10,104,32,-5,9,88,32,-5,2,104,-6,2,160,-6,2,96,-7,128,-11]
            },

            ENEMY_3_1: {
                res: { w: 32, h: 32 },
                c1: '#ac9581',
                c2: '#000',
                compressed: [-3,8,-7,8,-4,8,32,-1,170,8,2,2,8,2,32,128,8,2,8,2,32,-1,160,32,8,-1,160,2,128,10,160,8,8,-1,170,128,168,-1,8,2,8,2,-1,2,-2,2,128,136,8,-1,8,-3,32,40,32,-1,32,-1,42,-1,8,40,32,-1,130,168,2,128,2,8,32,2,40,-2,168,-1,136,160,8,160,-2,10,-1,138,128,32,128,-1,1,66,128,34,128,130,128,-1,2,144,128,10,128,130,1,64,-1,165,64,10,128,130,22,64,-1,170,148,10,128,133,90,64,-1,42,165,10,130,22,169,-2,10,165,90,130,106,164,-2,10,170,170,169,170,148,-2,2,170,165,86,170,80,-3,170,165,86,169,64,-3,42,149,86,169,-4,170,170,170,166,128,-2,2,170,149,85,165,160,-2,2,170,105,105,101,96,-2,10,89,89,101,105,96,-2,9,89,85,85,101,104,-2,9,86,85,85,165,88,-2,10,86,153,89,149,88,-2,2,88,165,86,170,168,-2,2,168,42,170,2,160,-1]
            },

            ENEMY_3_2: {
                res: { w: 32, h: 32 },
                compressed: [8,-1,136,8,-1,8,-2,170,8,160,8,2,8,130,-1,40,2,128,136,128,170,130,8,8,-1,128,42,-1,8,2,40,2,168,160,8,-1,32,2,32,-1,8,8,8,-1,128,2,128,-1,10,2,8,2,2,2,168,-1,130,128,136,8,10,8,-1,10,128,32,40,32,40,32,8,-1,128,8,40,32,32,128,8,-1,128,2,8,32,162,-1,34,-1,168,-1,136,162,136,-1,170,-1,10,-1,138,130,32,10,136,1,66,128,34,136,170,160,10,2,144,128,10,136,128,1,64,-1,165,64,10,136,128,22,64,-1,170,148,10,136,133,90,64,-1,42,165,10,138,22,169,-2,10,165,90,130,106,164,-2,10,170,170,169,170,148,-2,2,170,165,86,170,80,-3,170,165,86,169,64,-3,42,149,86,169,-4,170,170,170,166,128,-2,2,170,149,85,165,160,-2,2,170,105,105,101,96,-2,10,89,89,101,105,96,-2,9,89,85,85,101,104,-2,9,86,85,85,165,88,-2,10,86,153,89,149,88,-2,2,168,165,86,170,160,-4,42,170,-3]
            },

            FISHES: {
                c1: '#26a0a0',
                res: { w: 16, h: 16 },
                compressed: [-6,16,80,-2,21,84,69,64,16,80,85,80,-2,65,-6,84,-6,16,-2,16,85,-2,85,85,64,-1,16,85,-3,16,-1,1,-2,16,5,80,-1,84,1,-3]
            }
        },
        MUSICS: {
            INTRO: createSound('song-intro'),
            BONUS: createSound('bonus'),
            EXPLOSION: createSound('explosion'),
            DAMAGE: createSound('damage')
        }
    };


    /**
     *                                    GAME CONSTANTS             
     * 
     *                     This space is reserved to the game constants
     * 
     */
    const FPS = 60;
    const GAME_STATE = {};
    const GAME_RESOLUTION = { w: 800, h: 600 };
    const FONT_NAME = 'monospace';
    const GAME_STORAGE_PREFIX = '__DEATH_SEA_XIII_storage_';
    const STORAGE_KEY = GAME_STORAGE_PREFIX + '_scores';
    const HIGH_SCORES_LIMIT = 10;

    const SHAPE_SMOKE = 1;
    const SHAPE_SQUARE_GRADIENT = 2;
    const SHAPE_CIRCLE = 3;

    const GAME_SCENE_TITLE_SCREEN = 1;
    const GAME_SCENE_TITLE_SCREEN_TEXT = 1;
    const GAME_SCENE_TITLE_START_GAME_TEXT = 2;
    const GAME_SCENE_TITLE_HIGH_SCORE_TEXT = 3;
    const GAME_SCENE_TITLE_ARROW_SPRITE = 4;
    const GAME_SCENE_TITLE_DRAGON_SPRITE = 5;

    const GAME_FIGHTER_LIFES = 5;

    const GAME_SCENE_LVL_1 = 2;
    const GAME_SCENE_LVL_1_SHIP = 2;
    const GAME_SCENE_LVL_1_ORDINARY_BULLET = 3;
    const GAME_SCENE_LVL_1_ENEMY_1 = 4;
    const GAME_SCENE_LVL_1_BACKGROUND = 5;
    const GAME_SCENE_LVL_1_LIFE = 6;
    const GAME_SCENE_LVL_1_SCORE_TEXT = 7;
    const GAME_SCENE_LVL_1_EXPLOSION = 8;
    const GAME_SCENE_LVL_1_ALLY_BALL = 9;
    const GAME_SCENE_LVL_1_CANNON_READY = 10;
    const GAME_SCENE_LVL_1_SMOKE = 11;
    const GAME_SCENE_LVL_1_ENEMY_2 = 12;
    const GAME_SCENE_LVL_1_ENEMY_3 = 13;
    const GAME_SCENE_LVL_1_BULLET_BONUS = 14;
    const GAME_SCENE_LVL_1_LIFE_BONUS = 15;
    const GAME_SCENE_LVL_1_GAME_OVER = 16;
    const GAME_SCENE_LVL_1_EXPLOSION_WAVE = 17;
    const GAME_SCENE_LVL_1_FISHES = 18;

    const GAME_SCENE_INTERLUDE = 3;
    const GAME_SCENE_HIGH_SCORES = 4;


    /**
     * Removes an sprite from the game scene
     * @param {*} sprite 
     */
    function removeSprite(sprite) {
        GAME_STATE.sprites.splice(GAME_STATE.sprites.indexOf(sprite), 1);
    }

    /**
     * Simple collision box detection
     * @param {*} obj1  x: number, y: number, res: {w: number, h: number}
     * @param {*} obj2  x: number, y: number, res: {w: number, h: number}
     * @returns true for collision detection
     */
    function simpleCollisionBox(obj1, obj2) {
        const obj1XEnd = obj1.x + obj1.res.w;
        const obj2XEnd = obj2.x + obj2.res.w;
        const obj1YEnd = obj1.y + obj1.res.h;
        const obj2YEnd = obj2.y + obj2.res.h;
        return (
            (
                (obj1.x < obj2XEnd) && (obj1.x > obj2.x) &&
                (obj1.y < obj2YEnd) && (obj1.y > obj2.y)
            ) ||
            (
                (obj2.x < obj1XEnd) && (obj2.x > obj1.x) &&
                (obj2.y < obj1YEnd) && (obj2YEnd > obj1YEnd)
            )
        );
    }

    /**
     * High score check and register fn
     * 
     * @param {*} score number of the last score 
     */
    function scoreRegister(score) {
        const highScoreList = getScoreList();
        const highestScores = highScoreList.filter(record => record.score > score);
        if (highestScores.length >= HIGH_SCORES_LIMIT) {
            return;
        }
        const playerName = prompt('New Record! Please, enter your name');
        if (!playerName) {
            return;
        }
        highScoreList.push({ playerName, score, scoreAt: new Date() });
        highScoreList.sort((a, b) => b.score - a.score);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(highScoreList));
    }

    /**
     * Returns a highscore list
     * @returns A list of scores: [{ playserName: string; score: number; scoreAt: string iso date }]
     */
    function getScoreList() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').splice(0, HIGH_SCORES_LIMIT);
    }

    /**
     * Uncompress array of image compressed
     * @param {*} compressed a array with contais compressed matrix of one image, see TODO
     * @returns Array of a matrix image uncompressed (x and y flatted)
     */
    function uncompressImage(compressed) {
        const leftPad = (str, length) => {
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        };
        return compressed.reduce((acc, byte) => {
            if (byte < 0) {
                const zeroQt = byte * -1;
                for (let i = 1; i < (zeroQt + 1); i++) {
                    acc.push(0);
                }
                return acc;
            }
            acc.push(byte);
            return acc;
        }, []).reduce((acc, byte) => {
            let binaryNumber = leftPad((+byte).toString(2), 8);
            while (binaryNumber.length) {
                const twoBits = binaryNumber.substring(0, 2);
                const twoBitsInInt = parseInt(twoBits, 2);
                acc.push(twoBitsInInt);
                binaryNumber = binaryNumber.substring(2, binaryNumber.length);
            }
            return acc;
        }, []);
    }

    /**
     * This function fetch all the images on the GAME_ASSETS.images,
     * for each one, it draws the image on a hidden canvas, and extract
     * its PNG image to the user memory during the game execution.
     * 
     * The png image will be storage in the image object >> png
     * 
     * If the image whas flagged with generateInverted === true, it will generate
     * a mirrored version of a png in the prop object >> invertedPng
     */
    function generateImagesPng() {
        // Shadow generate
        (() => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 20;
            tempCanvas.height = 20;
            const viewportContext = tempCanvas.getContext('2d');
            viewportContext.fillStyle = 'rgba(0, 0, 0, 0.15)';
            viewportContext.beginPath();
            viewportContext.arc(10, 10, 10, 0, 2*Math.PI);
            viewportContext.fill();
            const png = tempCanvas.toDataURL('image/png');
            const pngImage = new Image();
            pngImage.src = png;
            GAME_ASSETS.shadowPng = pngImage;
        })();

        Object.keys(GAME_ASSETS.IMAGES).forEach(imageName => {
            const sprite = GAME_ASSETS.IMAGES[imageName];
            const image = sprite;
            if (!sprite['data']) {
                sprite['data'] = uncompressImage(image.compressed);
            }
            const imageData = sprite['data'];
            const primaryColor = image.c1 || '#999';
            const secondaryColor = image.c2 || '#000';
            const draw = invert => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = sprite.res.w;
                tempCanvas.height = sprite.res.h;
                const tempCtx = tempCanvas.getContext('2d');
                let totalPixels = 0, y = 0;
                do {
                    for (let x = 0; x < sprite.res.w; x++) {
                        const pixel = invert ? imageData[((sprite.res.w-1) - x) + totalPixels] :
                                               imageData[x + totalPixels];
                        if (pixel === 0) {
                            continue;
                        }
                        tempCtx.fillStyle = pixel === 1 ? primaryColor : secondaryColor;
                        tempCtx.fillRect(x, y, 1, 1);
                    }
                    totalPixels += sprite.res.w;
                    y += 1;
                } while (totalPixels < imageData.length);
                const png = tempCanvas.toDataURL('image/png');
                const pngImage = new Image();
                pngImage.src = png;
                sprite[invert ? 'invertedPng' : 'png'] = pngImage;
            };
            draw();
            if (sprite.generateInverted) {
                draw(true);
            }
        });
    }

    /**
     * This function will scale the game canvas to Fit the window size 
     * @param {*} canvas The game canvas 
     */
    function scaleCanvas(canvas) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const scale = (w > h) ?
                        (h / GAME_RESOLUTION.h) :
                        (w / GAME_RESOLUTION.w);
        canvas.style.transform = `scale(${scale})`;
    }

    /**
     * Pure function to generate a random number from a given interval
     * @param {*} min number, min random number
     * @param {*} max number, max random number
     * @returns number, a random number between min and max
     */
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    /**
     * Create audio element on document HTML in order to play sounds
     * The audio element refference will be storage on GAME_STATE.audio
     */
    function createAudio() {
        if (!GAME_STATE.audio) {
            const audio = document.createElement("audio");
            document.body.appendChild(audio);
            GAME_STATE.audio = audio;
        }
    }

    /**
     * Play a song or a sound effect on the game audio element.
     * 
     * @param {*} sound The song or effect byte array. If it is null, the audio will be paused
     * @param {*} repeat if it is true, the song or effect will be repeated
     */
    function playSound(sound, repeat) {
        if (!GAME_STATE.audio) {
            return;
        }
        GAME_STATE.audio.pause();
        GAME_STATE.audio.src = '';
        if (!sound) {
            return;
        }
        const player = new CPlayer();
        player.init(sound);
        let done = false;
        const interval = setInterval(() => {
            done = player.generate() >= 1;
            if (done) {
                const wave = player.createWave();
                GAME_STATE.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
                GAME_STATE.audio.play();
                GAME_STATE.audio.loop = !!repeat;
                clearInterval(interval);
            }
        }, 0);
    }

    /**
     * Create a new game scene, see TODO 
     * 
     * @param {*} scene A game scene constant, for example: the title scene, the lvl1 scene.
     */
    function createScene(scene) {
        switch (scene) {
            case GAME_SCENE_TITLE_SCREEN:
                const centeredText = GAME_RESOLUTION.w * 0.20;
                GAME_STATE.scene = GAME_SCENE_TITLE_SCREEN;
                GAME_STATE.selectedMenu = GAME_SCENE_TITLE_START_GAME_TEXT;
                GAME_STATE.sprites = [
                    {
                        shape: SHAPE_SQUARE_GRADIENT,
                        from: '#FFF',
                        to: '#ffebd8',
                        x: 0,
                        y: 0,
                        w: GAME_RESOLUTION.w,
                        h: GAME_RESOLUTION.h,
                        gradientSize: 300
                    },
                    {
                        id: GAME_SCENE_TITLE_ARROW_SPRITE,
                        frames: [GAME_ASSETS.IMAGES.ARROW.png],
                        res: { w: 16, h: 16 },
                        x: 290,
                        y: GAME_STATE.selectedMenu === GAME_SCENE_TITLE_START_GAME_TEXT ? 320 : 340
                    },
                    {
                        frames: [GAME_ASSETS.IMAGES.TITLE_SEA.png],
                        x: 0,
                        y: 540
                    },
                    {
                        id: GAME_SCENE_TITLE_DRAGON_SPRITE,
                        frames: [GAME_ASSETS.IMAGES.ENEMY_1_1.png,GAME_ASSETS.IMAGES.ENEMY_1_2.png,GAME_ASSETS.IMAGES.ENEMY_1_3.png],
                        res: { w: 32, h: 32 },
                        x: 370,
                        y: 80,
                        scale: 1.6,
                        frame: 0
                    },
                    {
                        frames: [GAME_ASSETS.IMAGES.COVER_SHIP.png],
                        res: { w: 150, h: 85 },
                        x: GAME_RESOLUTION.w - 300,
                        y: 380,
                        scale: 2.4
                    }
                ];
                GAME_STATE.texts = [
                    {
                        id: GAME_SCENE_TITLE_SCREEN_TEXT,
                        text: 'Death Sea XIII',
                        x: centeredText + 60,
                        y: -50,
                        font: '48px \'sans-serif\''
                    },
                    {
                        id: GAME_SCENE_TITLE_START_GAME_TEXT,
                        text: 'Start Game',
                        x: centeredText + 150,
                        y: 300,
                        font: '21px ' + FONT_NAME
                    },
                    {
                        id: GAME_SCENE_TITLE_HIGH_SCORE_TEXT,
                        text: 'High Scores',
                        x: centeredText + 150,
                        y: 330,
                        font: '21px ' + FONT_NAME
                    },
                    {
                        text: 'Use keyboard arrows ←↑→↓  and ↵ enter',
                        x: 10,
                        y: 590,
                        font: '10px ' + FONT_NAME
                    }
                ];
                playSound(GAME_ASSETS.MUSICS.INTRO, true);
                break;


            case GAME_SCENE_INTERLUDE:
                playSound();
                GAME_STATE.scene = GAME_SCENE_INTERLUDE;
                GAME_STATE.sprites = [
                    {
                        frames: [GAME_ASSETS.IMAGES.SHIP_1.png],
                        res: { w: 32, h: 32 },
                        x: 350,
                        y: 50,
                        scale: 2.3
                    },
                    {
                        frames: [GAME_ASSETS.IMAGES.LETTER_PEN.png],
                        res: { w: 40, h: 40 },
                        x: 20,
                        y: GAME_RESOLUTION.h - 70,
                        scale: 1.5
                    }
                ];
                GAME_STATE.texts = [
                    {
                        text: 'Your Majesty,',
                        font: '34px ' + FONT_NAME,
                        x: 20,
                        y: 200,
                    },
                    {
                        text: 'I pen this message knowing it may be my last.',
                        x: 20,
                        y: 240,
                        font: '21px ' + FONT_NAME
                    },
                    {
                        text: 'I can confirm, Your Majesty, that the',
                        x: 20,
                        y: 290,
                        font: '21px ' + FONT_NAME
                    },
                    {
                        text: 'ancient tales of sea monsters are true!',
                        x: 20,
                        y: 310
                    },
                    {
                        text: 'As we prepare to face them in battle, I wish to convey',
                        x: 20,
                        y: 360
                    },
                    {
                        text: 'the honor it has been to serve our house.',
                        x: 20,
                        y: 380
                    },
                    {
                        text: 'Captain Cedric Leviathanhunter, 13th March 1293.',
                        x: 20,
                        y: 460,
                        font: '18px '+ FONT_NAME
                    },
                    {
                        text: 'Press ↵ to continue',
                        x: 650,
                        y: 590,
                        font: '12px '+ FONT_NAME
                    }
                ];
                break;


            case GAME_SCENE_LVL_1:
                GAME_STATE.gameOver = undefined;
                GAME_STATE.scene = GAME_SCENE_LVL_1;
                GAME_STATE.life = 5;
                GAME_STATE.PLAYER_LIMIT_X = (GAME_RESOLUTION.w - GAME_ASSETS.IMAGES.SHIP_1.res.w);
                GAME_STATE.PLAYER_LIMIT_Y = (GAME_RESOLUTION.h - GAME_ASSETS.IMAGES.SHIP_1.res.h);
                GAME_STATE.score = 0;
                GAME_STATE.enemiesCount = 0;
                GAME_STATE.timecontrol = 0;
                GAME_STATE.sprites = [
                    {
                        id: GAME_SCENE_LVL_1_SHIP,
                        frames: [GAME_ASSETS.IMAGES.SHIP_1.png, GAME_ASSETS.IMAGES.SHIP_2.png],
                        invertedFrames: [GAME_ASSETS.IMAGES.SHIP_1.invertedPng, GAME_ASSETS.IMAGES.SHIP_2.invertedPng],
                        res: { w: 32, h: 32 },
                        x: 385,
                        y: 550,
                        forceX: 0,
                        forceY: 0,
                        cannonReady: 0,
                        frame: 0,
                        scale: 1.2,
                        shadow: { color: '#349794' }
                    }
                ];
                for (let i=0; i<randomIntFromInterval(3, 8); i++) {
                    GAME_STATE.sprites.push({
                        id: GAME_SCENE_LVL_1_FISHES,
                        frames: [GAME_ASSETS.IMAGES.FISHES.png],
                        x: -10 - (randomIntFromInterval(0, 300)),
                        y: randomIntFromInterval(50, 500),
                        res: { w: 16, h: 16 },
                        forceX: randomIntFromInterval(0, 5)
                    });
                }
                GAME_STATE.texts = [
                    {
                        id: GAME_SCENE_LVL_1_SCORE_TEXT,
                        prefix: 'SCORE: ',
                        text: '',
                        y: 20,
                        x: GAME_RESOLUTION.w - 80
                    },
                    {
                        id: GAME_SCENE_LVL_1_CANNON_READY,
                        text: 'CANNONS READY!',
                        y: 20,
                        x: (GAME_RESOLUTION.w / 2) - 50,
                        visible: false
                    },
                    {
                        id: GAME_SCENE_LVL_1_GAME_OVER,
                        text: 'GAME OVER',
                        y: 260,
                        x: (GAME_RESOLUTION.w / 2) - 40,
                        visible: false
                    }
                ];
                GAME_STATE.screenForce = 1;
                for (let coverX=0; coverX<(GAME_RESOLUTION.w); coverX += 24) {
                    for (let coverY=-50; coverY<(GAME_RESOLUTION.h * 1.8); coverY += 24) {
                        GAME_STATE.sprites.unshift({
                            id: GAME_SCENE_LVL_1_BACKGROUND,
                            frames: [GAME_ASSETS.IMAGES.WATER_1.png, GAME_ASSETS.IMAGES.WATER_2.png],
                            res: { w: 24, h: 24 },
                            x: coverX,
                            frame: 0,
                            y: coverY
                        });
                    }
                }

                for (let i = 0; i < GAME_FIGHTER_LIFES; i++) {
                    GAME_STATE.sprites.push({
                        id: GAME_SCENE_LVL_1_LIFE,
                        life: i+1,
                        frames: [GAME_ASSETS.IMAGES.HEART.png],
                        res: { w: 18, h: 18 },
                        x: 5 + (18 * i) + (5 * i),
                        y: 5
                    });
                }
                break;
            
            case GAME_SCENE_HIGH_SCORES:
                playSound(GAME_ASSETS.MUSICS.INTRO, true);
                GAME_STATE.scene = GAME_SCENE_HIGH_SCORES;
                GAME_STATE.texts = [
                    {
                        text: 'High Scores',
                        x: (GAME_RESOLUTION.w / 2) - 120,
                        y: 60,
                        font: '34px '+FONT_NAME 
                    },
                    {
                        text: 'Press ↵ to back',
                        x: GAME_RESOLUTION.w - 140,
                        y: GAME_RESOLUTION.h - 20,
                        font: '12px ' + FONT_NAME
                    }
                ];
                const highScores = getScoreList();
                if (!highScores.length) {
                    GAME_STATE.texts.push({
                        text: `No one score have been registered yet.`,
                        x: 155,
                        y: 260,
                        font: '21px '+FONT_NAME
                    })
                } else {
                    const numberPadding = numberStr => numberStr.length < 2 ? ` ${numberStr}` : numberStr;
                    const namePadding = name => (name.length < 30) ? `${name}${' '.repeat(30 - name.length)}` :
                                                                    name.substring(0, 30);

                    highScores.forEach((highScore, index) => GAME_STATE.texts.unshift({
                        text: `${numberPadding((index+1)+'')} - ${namePadding(highScore.playerName)} ${highScore.score} points`,
                        x: 100,
                        y: 260 + ((index)*25),
                        font: '21px '+FONT_NAME
                    }));
                }
                GAME_STATE.sprites = [
                    {
                        frames: [GAME_ASSETS.IMAGES.LETTER_PEN.png],
                        x: (GAME_RESOLUTION.w / 2) - 50,
                        y: 100,
                        res: { w: 40, h: 40 },
                        scale: 1.7
                    }
                ];
                break;
        }
    }

    /**
     * Render a frame of the current scene. It will render all sprites, texts and shapes on the
     * game scene object.
     * 
     * It will called after all the scene calc in a FPS frequency
     * 
     * @param {*} viewportContext the game canvas 2d context
     */
    function render(viewportContext) {

        // Drawing sprites
        for (const sprite of GAME_STATE.sprites) {
            if (sprite.x < -50 || sprite.y < -50 || sprite.x > GAME_RESOLUTION.w || sprite.y > GAME_RESOLUTION.h) {
                continue;
            }
            if (sprite.visible === false) {
                continue;
            }
            if (sprite.isBlinking && sprite.isBlinking % 2 === 0) {
                continue;
            }
            if (sprite.shape) {
                switch (sprite.shape) {
                    case SHAPE_CIRCLE:
                        viewportContext.beginPath();
                        viewportContext.strokeStyle = sprite.color || '#333';
                        viewportContext.arc(sprite.x, sprite.y, sprite.size || 3, 0, 2 * Math.PI);
                        viewportContext.lineWidth = 2;
                        viewportContext.stroke();
                        break;
                    case SHAPE_SMOKE:
                        sprite.lifetime = sprite.lifetime || 0;
                        sprite.lifetime += 1;
                        if (sprite.lifetime > 50) {
                            removeSprite(sprite);
                            break;
                        }
                        viewportContext.beginPath();
                        const opacity = 0.7 - (sprite.lifetime / 100);
                        viewportContext.fillStyle = `rgba(0, 0, 0, ${opacity})`;
                        viewportContext.arc(sprite.x, sprite.y, sprite.size || 3, 0, 2 * Math.PI);
                        viewportContext.fill();
                        break;
                    case SHAPE_SQUARE_GRADIENT:
                        const gradient = viewportContext.createLinearGradient(0, sprite.gradientSize, 0, 0);
                        gradient.addColorStop(0, sprite.from);
                        gradient.addColorStop(1, sprite.to);
                        viewportContext.fillStyle = gradient;
                        viewportContext.fillRect(sprite.x, sprite.y, sprite.w, sprite.h);
                        break;
                    default:
                        break;
                }
                continue;
            }
            if (sprite.shadow) {
                const spriteYEnd = sprite.y + sprite.res.h + (sprite.shadow.distance || 0);
                viewportContext.drawImage(GAME_ASSETS.shadowPng, 0, 0, 20, 20, sprite.x + 5, spriteYEnd, sprite.res.w, sprite.res.h/4);
            }
            const image = sprite.inverted ? sprite.invertedFrames[sprite.frame || 0] : sprite.frames[sprite.frame || 0];
            if (sprite.scale) {
                const width = sprite.res.w;
                const height = sprite.res.h;
                const scale = sprite.scale;
                viewportContext.drawImage(image, 0, 0, width, height, sprite.x, sprite.y, width*scale, height*scale);
            } else {
                viewportContext.drawImage(image, sprite.x, sprite.y);
            }
            viewportContext.fillStyle = '#000';
        }

        // Drawing texts
        for (const text of GAME_STATE.texts) {
            if (text.visible === false) {
                continue;
            }
            if (text.isBlinking && text.isBlinking % 2 === 0) {
                continue;
            }
            viewportContext.font = text.font;
            viewportContext.fillText(text.text, text.x, text.y);
        }
    }

    /**
     * Logic function of the title screen, it will be called before all the frames in a FPS frequency.
     */
    function calcTitleScreen() {
        const arrowReleased = GAME_STATE.DOWN_BUTTON_RELEASED || GAME_STATE.UP_BUTTON_RELEASED;
        if (arrowReleased) {
            GAME_STATE.selectedMenu = (GAME_STATE.selectedMenu === GAME_SCENE_TITLE_HIGH_SCORE_TEXT) ?
                GAME_SCENE_TITLE_START_GAME_TEXT : GAME_SCENE_TITLE_HIGH_SCORE_TEXT;
        }

        if (GAME_STATE.OK_BUTTON_RELEASED) {
            createScene(GAME_STATE.selectedMenu === GAME_SCENE_TITLE_HIGH_SCORE_TEXT ? 
                            GAME_SCENE_HIGH_SCORES : GAME_SCENE_INTERLUDE);
        }

        for (const sprite of GAME_STATE.sprites) {
            if (sprite.id === GAME_SCENE_TITLE_ARROW_SPRITE) {
                sprite.y = (GAME_STATE.selectedMenu === GAME_SCENE_TITLE_START_GAME_TEXT) ? 284 : 313;
                continue;
            }
            if (sprite.id === GAME_SCENE_TITLE_DRAGON_SPRITE) {
                if ((GAME_STATE.delayControl % 8)=== 0) {
                    sprite.frame += 1;
                    sprite.frame = sprite.frame === 2 ? 0 : sprite.frame;
                }
                continue;
            }
        }

        for (const text of GAME_STATE.texts) {
            if (text.id === GAME_SCENE_TITLE_SCREEN_TEXT) {
                if (text.y < 200) {
                    text.y += 5;
                }
                continue;
            }
            if (text.id === GAME_SCENE_TITLE_START_GAME_TEXT) {
                const selected = GAME_STATE.selectedMenu === GAME_SCENE_TITLE_START_GAME_TEXT;
                text.font = selected ? '900 24px Ubuntu' : '21px Ubuntu';
                continue;
            }
            if (text.id === GAME_SCENE_TITLE_HIGH_SCORE_TEXT) {
                const selected = GAME_STATE.selectedMenu === GAME_SCENE_TITLE_HIGH_SCORE_TEXT;
                text.font = selected ? '900 24px Ubuntu' : '21px Ubuntu';
                continue;
            }
        }
    }

    /**
     * Logic function of the game interlude, it will be called before all the frames in a FPS frequency.
     */
    function calcInterlude() {
        if (GAME_STATE.OK_BUTTON_RELEASED) {
            createScene(GAME_SCENE_LVL_1);
        }
    }

    /**
     * Logic function of the game level, it will be called before all the frames in a FPS frequency.
     */
    function calcLvl1() {
        let cannonReady, gameOver;
        gameOver = GAME_STATE.gameOver;
        const delayLvl5 = GAME_STATE.delayControl % 5 === 0;

        if (GAME_STATE.gameOver === 0) {
            scoreRegister(+GAME_STATE.score);
            createScene(GAME_SCENE_HIGH_SCORES);
            return;
        }

        for (const text of GAME_STATE.texts) {
            if (text.isBlinking) {
                text.isBlinking -= 1;
                text.isBlinking = text.isBlinking < 0 ? 0 : text.isBlinking;
            }
            if (text.id === GAME_SCENE_LVL_1_SCORE_TEXT) {
                text.text = text.prefix + GAME_STATE.score;
                continue;
            }
            if (text.id === GAME_SCENE_LVL_1_CANNON_READY) {
                cannonReady = text;
                continue;
            }
            if (text.id === GAME_SCENE_LVL_1_GAME_OVER) {
                text.visible = !!GAME_STATE.gameOver;
                continue;
            }
        }

        const createExplosion = (x, y) => {
            playSound(GAME_ASSETS.MUSICS.EXPLOSION);
            return {
                id: GAME_SCENE_LVL_1_EXPLOSION,
                frames: [
                    GAME_ASSETS.IMAGES.EXPLOSION_1.png,
                    GAME_ASSETS.IMAGES.EXPLOSION_2.png,
                    GAME_ASSETS.IMAGES.EXPLOSION_3.png,
                    GAME_ASSETS.IMAGES.EXPLOSION_4.png
                ],
                x: x,
                y: y,
                res: { w: 32, h: 32 },
                frame: 0
            };
        };

        const createExplosionWave = (x, y) => ({
            id: GAME_SCENE_LVL_1_EXPLOSION_WAVE,
            shape: SHAPE_CIRCLE,
            color: '#58cfcc',
            size: 15,
            x: x,
            y: y
        });

        if (GAME_STATE.bulletBonus) {
            GAME_STATE.bulletBonus -= 1;
        }

        if (GAME_STATE.delayControl % 50 === 0) {
            GAME_STATE.timecontrol += 1;

            const diceVar = randomIntFromInterval(0, 25);

            if (diceVar === 11) {
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_LIFE_BONUS,
                    frames: [GAME_ASSETS.IMAGES.LIFE_BONUS.png],
                    res: { w: 24, h: 13 },
                    x: randomIntFromInterval(10, 750),
                    y: randomIntFromInterval(-100, -400),
                    scale: 1
                });
            }

            if (diceVar === 12) {
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_BULLET_BONUS,
                    frames: [GAME_ASSETS.IMAGES.BULLET_BONUS.png],
                    res: { w: 24, h: 13 },
                    x: randomIntFromInterval(10, 750),
                    y: randomIntFromInterval(-100, -400),
                    scale: 1
                });
            }

            if (GAME_STATE.enemiesCount < 10) {
                GAME_STATE.enemiesCount += 1;
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_ENEMY_1,
                    frames: [GAME_ASSETS.IMAGES.ENEMY_1_1.png, GAME_ASSETS.IMAGES.ENEMY_1_2.png, GAME_ASSETS.IMAGES.ENEMY_1_3.png],
                    res: { w: 32, h: 32 },
                    x: randomIntFromInterval(10, 750),
                    y: randomIntFromInterval(-40, -120),
                    forceX: randomIntFromInterval(-3, 3),
                    forceY: randomIntFromInterval(1, 3) || 1,
                    awaiting: randomIntFromInterval(0, 200),
                    shadow: { color: '#349794', distance: 15 },
                    frame: 0
                });
            }

            if (GAME_STATE.timecontrol > 80 && // FIXME more time
                GAME_STATE.enemiesCount < 13) {

                GAME_STATE.enemiesCount += 1;
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_ENEMY_2,
                    frames: [GAME_ASSETS.IMAGES.ENEMY_2_1.png, GAME_ASSETS.IMAGES.ENEMY_2_2.png],
                    res: { w: 32, h: 32 },
                    frame: 0,
                    x: randomIntFromInterval(10, 750),
                    y: randomIntFromInterval(-40, -120),
                    forceX: randomIntFromInterval(-2, 4),
                    forceY: randomIntFromInterval(1, 3) || 1,
                    awaiting: randomIntFromInterval(0, 200),
                    shadow: { color: '#349794', distance: -5 },
                    life: 2
                });
            }

            if (GAME_STATE.timecontrol > 210 && // FIXME more time
                GAME_STATE.enemiesCount < 16) {

                GAME_STATE.enemiesCount += 1;
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_ENEMY_3,
                    frames: [GAME_ASSETS.IMAGES.ENEMY_3_1.png, GAME_ASSETS.IMAGES.ENEMY_3_2.png],
                    frame: 0,
                    res: { w: 32, h: 32 },
                    x: randomIntFromInterval(10, 750),
                    y: randomIntFromInterval(-40, -120),
                    forceX: randomIntFromInterval(-4, 4),
                    forceY: randomIntFromInterval(1, 4),
                    awaiting: randomIntFromInterval(0, 200),
                    shadow: { color: '#349794', distance: -5 },
                    life: 4
                });
            }
        }

        let shipSprite, enemySprites = [], bullets = [], allyCannonBall, bonuses = [];
        for (const sprite of GAME_STATE.sprites) {
            if (sprite.id === GAME_SCENE_LVL_1_BACKGROUND) {
                sprite.y += GAME_STATE.screenForce;
                if (sprite.y > GAME_RESOLUTION.h) {
                    sprite.y = -24;
                }
                if (GAME_STATE.delayControl % 25 === 0) {
                    sprite.frame += 1;
                    sprite.frame = sprite.frame === 2 ? 0 : sprite.frame;
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_BULLET_BONUS ||
                sprite.id === GAME_SCENE_LVL_1_LIFE_BONUS) {
                sprite.y += 1;
                bonuses.push(sprite);
                // transform animation
                if (delayLvl5) {
                    sprite.pulsing = (sprite.pulsing || 1) + 1;
                    sprite.pulsing = (sprite.pulsing === 20) ? 0 : sprite.pulsing;
                    sprite.scale += ((sprite.pulsing > 10) ? -1 : 1) * 0.02;
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_ENEMY_1) {
                enemySprites.push(sprite);
                sprite.y += sprite.forceY;
                sprite.x += sprite.forceX;
                if (delayLvl5) {
                    sprite.frame += 1;
                    sprite.frame = (sprite.frame === sprite.frames.length) ? 0 : sprite.frame;
                }
                if (GAME_STATE.delayControl % 10 !== 0) {
                    continue;
                }
                if (sprite.awaiting) {
                    sprite.awaiting -= 1;
                }
                if (sprite.y > (GAME_RESOLUTION.h + 45)) {
                    removeSprite(sprite);
                    GAME_STATE.enemiesCount -= 1;
                }
                continue;
            }

            if ((
                sprite.id === GAME_SCENE_LVL_1_ENEMY_2 ||
                sprite.id === GAME_SCENE_LVL_1_ENEMY_3
            ) && shipSprite) {
                if (delayLvl5) {
                    sprite.frame += 1;
                    sprite.frame = sprite.frame === 2 ? 0 : sprite.frame;
                }
                enemySprites.push(sprite);
                sprite.y += sprite.forceY;
                sprite.x += (sprite.forceX) * (() => {
                    if (shipSprite.x === sprite.x) {
                        return 0; // SAME LINE, STOP
                    }
                    return (shipSprite.x > sprite.x ? -1 : 1); // PURSUIT THE PLAYER
                })();
                if (sprite.y > (GAME_RESOLUTION.h + 45)) {
                    removeSprite(sprite);
                    GAME_STATE.enemiesCount -= 1;
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_ALLY_BALL) { // BALL SMOKE
                allyCannonBall = sprite;
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_SMOKE,
                    x: sprite.x + 8,
                    y: sprite.y + sprite.res.h + 2,
                    shape: SHAPE_SMOKE
                });
                sprite.y -= 8;
                if (sprite.y < -200) {
                    removeSprite(sprite);
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_SHIP) {
                shipSprite = sprite;

                if (gameOver) {
                    sprite.visible = false;
                    continue;
                }

                if (shipSprite.cannonReady) {
                    shipSprite.cannonReady -= 1;
                    cannonReady.visible = false;
                } else {
                    cannonReady.visible = true;
                }

                // Gravity
                if (delayLvl5) {
                    // Animation
                    if (GAME_STATE.delayControl % 70 === 0) {
                        sprite.frame += 1;
                        sprite.frame = sprite.frame === 2 ? 0 : sprite.frame;
                    }

                    // Gravity X
                    if (sprite.forceX > 0) {
                        sprite.forceX -= 0.1;
                    } else if (sprite.forceX < 0) {
                        sprite.forceX += 0.1;
                    }

                    // Gravity Y
                    if (sprite.forceY > 0) {
                        sprite.forceY -= 0.1;
                    } else if (sprite.forceY < 0) {
                        sprite.forceY += 0.1;
                    }

                    // Blinking
                    if (sprite.isBlinking) {
                        sprite.isBlinking -= 1;
                        sprite.isBlinking = sprite.isBlinking < 0 ? 0 : sprite.isBlinking;
                    }
                }

                // controls
                if (GAME_STATE.LEFT_BUTTON_PRESSED) {
                    sprite.forceX -= 2;
                    sprite.forceX = sprite.forceX < -4 ? -4 : sprite.forceX;
                    sprite.inverted = false;
                } else if (GAME_STATE.RIGHT_BUTTON_PRESSED) {
                    sprite.forceX += 2;
                    sprite.forceX = sprite.forceX > 4 ? 4 : sprite.forceX;
                    sprite.inverted = true;
                }
                if (GAME_STATE.UP_BUTTON_PRESSED) {
                    sprite.forceY -= 1;
                    sprite.forceY = sprite.forceY < -2 ? -2 : sprite.forceY;
                } else if (GAME_STATE.DOWN_BUTTON_PRESSED) {
                    sprite.forceY += 1;
                    sprite.forceY = sprite.forceY > 2 ? 2 : sprite.forceY;
                }

                // Force apply
                sprite.x += sprite.forceX;
                sprite.x = (sprite.x < 0) ? 0 : sprite.x;
                sprite.x = (sprite.x > GAME_STATE.PLAYER_LIMIT_X) ? GAME_STATE.PLAYER_LIMIT_X : sprite.x;
                sprite.y += sprite.forceY;
                sprite.y = (sprite.y < 0) ? 0 : sprite.y;
                sprite.y = (sprite.y > GAME_STATE.PLAYER_LIMIT_Y) ? GAME_STATE.PLAYER_LIMIT_Y : sprite.y;

                // Auto shoot
                const bulletInterval = GAME_STATE.bulletBonus ? 5 : 30;
                if (GAME_STATE.delayControl % bulletInterval === 0) {
                    GAME_STATE.sprites.push({
                        id: GAME_SCENE_LVL_1_ORDINARY_BULLET,
                        frames: [GAME_ASSETS.IMAGES.BULLET.png],
                        res: { w: 4, h: 8 },
                        x: sprite.x + 15,
                        y: sprite.y + 5,
                    });
                }

                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_ORDINARY_BULLET) {
                bullets.push(sprite);
                sprite.y -= 5;
                if (sprite.y < 1) {
                    removeSprite(sprite);
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_EXPLOSION && GAME_STATE.delayControl % 4 === 0) {
                sprite.frame += 1;
                if (sprite.frame > 3) {
                    removeSprite(sprite);
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_LIFE) {
                sprite.visible = !(sprite.life > GAME_STATE.life);
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_EXPLOSION_WAVE) {
                sprite.size += 15;
                if (sprite.size > 600) {
                    removeSprite(sprite);
                }
                continue;
            }

            if (sprite.id === GAME_SCENE_LVL_1_FISHES) {
                sprite.x += sprite.forceX * 0.1;
                if (sprite.x > 850) {
                    sprite.x = -100;
                    sprite.y = randomIntFromInterval(50, 500);
                }
            }
        }

        // Game Over condition
        if (GAME_STATE.gameOver) {
            GAME_STATE.gameOver -= 1; // Message timing
        } else if (GAME_STATE.life < 1) {
            GAME_STATE.gameOver = 240;
            GAME_STATE.sprites.push(createExplosion(shipSprite.x, shipSprite.y));
            GAME_STATE.sprites.push(createExplosionWave(shipSprite.x, shipSprite.y));
        }

        // Collisions
        // BONUSES
        for (let bonus of bonuses) {
            if (simpleCollisionBox(bonus, shipSprite)) {
                playSound(GAME_ASSETS.MUSICS.BONUS);
                switch (bonus.id) {
                    case GAME_SCENE_LVL_1_LIFE_BONUS:
                        GAME_STATE.life += 1;
                        GAME_STATE.life = GAME_STATE.life > 5 ? 5 : GAME_STATE.life;
                        break;
                    case GAME_SCENE_LVL_1_BULLET_BONUS:
                        GAME_STATE.bulletBonus = 500;
                        break;
                }
                removeSprite(bonus);
            }
        }
        
        for (let bullet of bullets) {
            for (const enemy of enemySprites) {
                if (simpleCollisionBox(enemy, bullet)) {
                    removeSprite(bullet);
                    if (enemy.life) {
                        enemy.life -= 1;
                        if (enemy.life) {
                            continue;
                        }
                    }
                    GAME_STATE.sprites.push(createExplosion(enemy.x, enemy.y));
                    GAME_STATE.sprites.push(createExplosionWave(enemy.x, enemy.y));
                    GAME_STATE.score += (() => {
                        switch (enemy.id) {
                            case GAME_SCENE_LVL_1_ENEMY_1:
                                return 1;
                            case GAME_SCENE_LVL_1_ENEMY_2:
                                return 3;
                            case GAME_SCENE_LVL_1_ENEMY_3:
                                return 6;
                            default:
                                return 1;
                        }
                    })();
                    removeSprite(enemy);
                    GAME_STATE.enemiesCount -= 1;
                }
            }
        }

        for (let enemy of enemySprites) {
            if ((!shipSprite.isBlinking) && simpleCollisionBox(enemy, shipSprite)) {
                shipSprite.isBlinking = 20;
                GAME_STATE.life -= 1;
                playSound(GAME_ASSETS.MUSICS.DAMAGE);
                continue;
            }
            if (allyCannonBall && simpleCollisionBox(allyCannonBall, enemy)) {
                GAME_STATE.sprites.push(createExplosion(enemy.x, enemy.y));
                GAME_STATE.sprites.push(createExplosionWave(enemy.x, enemy.y));
                removeSprite(allyCannonBall);
                allyCannonBall = null;
                enemy.y = GAME_RESOLUTION.h + 200;
                enemy.x = randomIntFromInterval(0, 750);
                GAME_STATE.score += (() => {
                    switch (enemy.id) {
                        case GAME_SCENE_LVL_1_ENEMY_1:
                            return 1;
                        case GAME_SCENE_LVL_1_ENEMY_2:
                            return 3;
                        case GAME_SCENE_LVL_1_ENEMY_3:
                            return 6;
                        default:
                            return 1;
                    }
                })();
                continue;
            }
            if (shipSprite.cannonReady) {
                continue;
            }
            const enemyLocked = shipSprite.x > enemy.x && 
                                shipSprite.x < (enemy.x + enemy.res.w) &&
                                enemy.y > 30;
            if (enemyLocked && enemy.y > 100 && enemy.y < GAME_RESOLUTION.h) {
                shipSprite.cannonReady = 200;
                GAME_STATE.sprites.push({
                    id: GAME_SCENE_LVL_1_ALLY_BALL,
                    frames: [GAME_ASSETS.IMAGES.CANNON_BALL.png],
                    x: shipSprite.x + 12,
                    y: shipSprite.y - 5,
                    res: { w: 16, h: 16 }
                });
            }
        }
    }

    /**
     * Logic function of the high score screen, it will be called before all the frames in a FPS frequency.
     */
    function calcHighScores() {
        if (GAME_STATE.OK_BUTTON_RELEASED) {
            createScene(GAME_SCENE_TITLE_SCREEN);
        }
    }

    /**
     * Generic Logic function all screens, it will be called before all the frames in a FPS frequency.
     * 
     * It does not contains the logic of the screens itself, it will just check what is the current scene
     * and call its calc function.
     */
    function calc() {
        switch (GAME_STATE.scene) {
            case GAME_SCENE_TITLE_SCREEN:
                calcTitleScreen();
                break;

            case GAME_SCENE_INTERLUDE:
                calcInterlude();
                break;

            case GAME_SCENE_LVL_1:
                calcLvl1();
                break;

            case GAME_SCENE_HIGH_SCORES:
                calcHighScores();
                break;
        }
    }

    /**
     * Bootstrapping game function, it will create the game canvas and call some starting functions.
     * Besides, it sill trigger the game setInterval
     */
    function init() {
        generateImagesPng();
        document.body.style = 'margin: 0; padding: 0; background-color: #000';
        const canvas = document.createElement('canvas');
        canvas.style.backgroundColor = '#FFF';
        canvas.width = GAME_RESOLUTION.w;
        canvas.height = GAME_RESOLUTION.h;
        canvas.style.border = '1px solid #333';
        scaleCanvas(canvas);
        document.body.appendChild(canvas);
        createScene(GAME_SCENE_TITLE_SCREEN);
        GAME_STATE.delayControl = 0;
        setInterval(() => {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, GAME_RESOLUTION.w, GAME_RESOLUTION.h);
            GAME_STATE.delayControl++;
            GAME_STATE.delayControl = (GAME_STATE.delayControl > 100) ? 0 : GAME_STATE.delayControl;
            calc();
            render(context);
            resetButtonsReleased();
        }, 1000 / FPS);
    }
    
    /**
     * Function to reset the button releasing flags on the game state
     */
    function resetButtonsReleased() {
        GAME_STATE.UP_BUTTON_RELEASED = GAME_STATE.LEFT_BUTTON_RELEASED =
            GAME_STATE.RIGHT_BUTTON_RELEASED = GAME_STATE.DOWN_BUTTON_RELEASED =
            GAME_STATE.OK_BUTTON_RELEASED = false;
    }

    const registerKeyEvents = () => {
        /**
         * Game keyup event listener. It will flag the buttons on the game state
         */
        document.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 37:
                    GAME_STATE.LEFT_BUTTON_RELEASED = true;
                    GAME_STATE.LEFT_BUTTON_PRESSED = false;
                    break;
                case 38:
                    GAME_STATE.UP_BUTTON_RELEASED = true;
                    GAME_STATE.UP_BUTTON_PRESSED = false;
                    break;
                case 39:
                    GAME_STATE.RIGHT_BUTTON_RELEASED = true;
                    GAME_STATE.RIGHT_BUTTON_PRESSED = false;
                    break;
                case 40:
                    GAME_STATE.DOWN_BUTTON_RELEASED = true;
                    GAME_STATE.DOWN_BUTTON_PRESSED = false;
                    break;
                case 13:
                    GAME_STATE.OK_BUTTON_RELEASED = true;
                    GAME_STATE.OK_BUTTON_PRESSED = false;
                    break;
            }
        });

        /**
         * Game down event listener. It will flag the buttons on the game state
         */
        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37:
                    GAME_STATE.LEFT_BUTTON_PRESSED = true;
                    break;
                case 38:
                    GAME_STATE.UP_BUTTON_PRESSED = true;
                    break;
                case 39:
                    GAME_STATE.RIGHT_BUTTON_PRESSED = true;
                    break;
                case 40:
                    GAME_STATE.DOWN_BUTTON_PRESSED = true;
                    break;
                case 13:
                    GAME_STATE.OK_BUTTON_PRESSED = true;
                    break;
            }
        });
    };

     /**
      * Native html screen wich is show on the page load.
      * It will as the user if he wants to play audio.
      * After that, the game bootstrap fn will be trigger.
      */
    document.body.appendChild((() => {
        const modalDiv = document.createElement('div');
        removeModal = () => modalDiv.parentElement.removeChild(modalDiv);
        modalDiv.classList = 'sound-modal';
        modalDiv.appendChild((() => {
            const title = document.createElement('h1');
            title.textContent = 'Enable sound?';
            return title;
        })());
        modalDiv.appendChild((() => {
            const btnWrp = document.createElement('div');
            btnWrp.classList = 'sound-modal-button-wrp';
            btnWrp.appendChild((() => {
                const btn = document.createElement('button');
                btn.textContent = 'Yes';
                btn.classList = 'primary-button';
                setTimeout(() => btn.focus(), 400);
                btn.addEventListener('click', () => {
                    removeModal();
                    createAudio();
                    init();
                    setTimeout(() => registerKeyEvents(), 500);
                });
                return btn;
            })());
            btnWrp.appendChild((() => {
                const btn = document.createElement('button');
                btn.textContent = 'No';
                btn.classList = 'secondary-button';
                btn.addEventListener('click', () => {
                    removeModal();
                    init();
                    setTimeout(() => registerKeyEvents(), 500);
                });
                return btn;
            })());
            return btnWrp;
        })());

        return modalDiv;
    })());

})();
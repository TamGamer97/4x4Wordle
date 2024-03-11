wordsList = [ 
    [
        'if', 'do', 'as', 'at', 'be', 'by', 'go', 'it', 'in', 'is', 'on', 'or', 'of', 'to', 'we', 'no', 'us', 'up', 'me', 'so'
    ],
    [
        'for', 'var', 'new', 'try', 'let', 'fog', 'pop', 'num', 'log', 'yes', 'map', 'set', 'get', 'has', 'out', 'and', 'not', 'cry', 'bad', 'mad', 'sad', 'fun', 'top', 'min', 'sum', 'met', 'ran', 'bus', 'gum', 'bow', 'toy', 'gym', 'dad', 'mum','sat','fed', 'say', 'day', 'eat', 'bug', 'hut', 'mud', 'age', 'ant', 'dog', 'cat','gas', 'gap', 'gel', 'hat', 'lie', 'you', 'big'
    ],
    [
        'case', 'else', 'true', 'bird', 'null', 'this', 'void', 'down', 'with', 'bike', 'bend', 'barn', 'bone', 'func', 'data', 'deal', 'diet', 'dots', 'eggs', 'euro', 'feed', 'fast', 'gate', 'girl', 'help','life','trap','sung', 'take', 'make', 'bake', 'wake', 'fake', 'late', 'tray', 'clay', 'know', 'slow', 'sand', 'jump', 'swam', 'swim', 'kite', 'site', 'word', 'game', 'grow', 'huge'
    ]


]

function gridGeneration()
{
    function randomNum(min, max)
    {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }
    function generateBlankSpaces()
    {
        const amountOfSquares = randomNum(1,5) // maximum 5 blank sqaured per game

        var blankSpaces = []

        c = 0
        while (c <= amountOfSquares)
        {
            blankSpaces.push(randomNum(1,15))
            c++
        }

        return blankSpaces
    }
    function generateWord(length, letter, placement)
    {
        console.log(letter, placement)
        if(!placement)
        {
            if(length == 4)
            {
                return wordsList[2][randomNum(0,wordsList[2].length - 1)]
            }
            if(length == 3)
            {
                return wordsList[1][randomNum(0,wordsList[1].length - 1)]
            }
            if(length == 2)
            {
                return wordsList[0][randomNum(0,wordsList[0].length - 1)]
            }

            return

        }

        if(placement == 'both')
        {
            console.log('letter both ' + ' ' + letter[0] + ' ' + letter[1])

            const beforeLetter = letter[0]
            const afterLetter = letter[1]

            var c=0
            var wordFound = ''
            while (c<50)
            {
                const word = generateWord(length)
                if(word[word.length-1] == afterLetter)
                {
                    if(word[0] == beforeLetter)
                    {
                        wordFound = word
                        break
                    }
                }
                c+=1
            }
            if(wordFound != '')
            {
                return wordFound
            }else{
                return null
            }
        }
        
        if(placement == 'end'){
            console.log('letter end ' + ' ' + letter)
            var c=0
            var wordFound = ''
            while (c<50)
            {
                const word = generateWord(length)
                if(word[word.length-1] == letter)
                {
                    wordFound = word
                    break
                }
                c+=1
            }
            if(wordFound != '')
            {
                return wordFound
            }else{
                return null
            }
        }

        if(placement == 'before')
        {
            console.log('letter beg ' + letter)
            var c=0
            var wordFound = ''
            while (c<50)
            {
                const word = generateWord(length)
                if(word[0] == letter)
                {
                    wordFound = word
                    break
                }
                c+=1
            }
            if(wordFound != '')
            {
                return wordFound
            }else{
                return null
            }
        }
    }
    function placeWord(grid, word, positions)
    {
        count = 0
        console.log(positions)
        while (count < word.length)
        {
            grid[positions[count]] = word[count]
            console.log(positions[count] + ' asigned with ' + word[count])
            count += 1
        }

        console.log('Placed word: ' + word)

        return grid
    }

    // KEY
    // - space for letter
    // . block
    var grid = [
        '','','','',
        '','','','',
        '','','','',
        '','','',''
    ]
    
    // blankSpaceList = generateBlankSpaces()
    
    // for (blankS in blankSpaceList)
    // {
    //     const pos = blankSpaceList[blankS]
    //     grid[pos] = '.'
    // }

    console.log(grid)
    
    // var filledSpace = blankSpaceList.length
    var filledSpace = 0

    var c=0

    var recentWord = [] // word, direction

    while (filledSpace < 16)
    {
        if(recentWord.length > 0)
        {
            const word = recentWord[0]
            const direction = recentWord[1]

            const wordLength = randomNum(2,4)

            if(direction >= 2)
            {
                var wordToPlace = generateWord(wordLength, word[0], 'end')
            }else{
                var wordToPlace = generateWord(wordLength, word[0], 'before')
            }

            console.log(wordToPlace)

            if(wordToPlace == null)
            {
                wordToPlace = generateWord(wordLength)
            }else{
                if(direction == 0)
                {
                    grid[1] = wordToPlace[1]
                    if(wordToPlace[2] != null)
                    {
                        grid[2] = wordToPlace[2]
                    }
                    if(wordToPlace[3] != null)
                    {
                        grid[3] = wordToPlace[3]

                        grid[15] = '.'

                        const Mword1 = generateWord(3, grid[3], 'before')
                        if(Mword1 != null)
                        {
                            grid[7] = Mword1[1]
                            grid[11] = Mword1[2]
                        }

                        const Mword2 = generateWord(3, grid[12], 'before')
                        if(Mword2 != null)
                        {
                            grid[13] = Mword2[1]
                            grid[14] = Mword2[2]

                            const largeW3 = generateWord(4, [grid[2], grid[14]], 'both')
                            if(largeW3 != null)
                            {
                                grid[6] = largeW3[1]
                                grid[10] = largeW3[2]
                            }else{
                                const medW4 = generateWord(3, grid[8], 'before')
                                if(medW4 != null)
                                {
                                    grid[9] = medW4[1]
                                    grid[10] = medW4[2]
                                }
                            }   

                        }





                    }else{
                        newWord = generateWord(4)
                        grid[3] = newWord[0]
                        grid[7] = newWord[1]
                        grid[11] = newWord[2]
                        grid[15] = newWord[3]

                        if(wordToPlace[2] == null)
                        {
                            const smallW1 = generateWord(2, grid[3], 'end')
                            if(smallW1 != null)
                            {
                                grid[2] = smallW1[1]
                            }else{
                                const smallW2 = generateWord(2, grid[1], 'before')

                                if(smallW2 != null)
                                {
                                    grid[2] = smallW2[1]
                                }
                            }
                        }

                        const bp = randomNum(0,1)
                        if(bp == 0)
                        {
                            grid[13] = '.'
                            grid[9] = '.'

                            const largeW1 = generateWord(4, grid[2], 'before')
                            if(largeW1 != null)
                            {
                                grid[6] = largeW1[1]
                                grid[10] = largeW1[2]
                                grid[14] = largeW1[3]
                            }else{
                                const largeW1 = generateWord(3, grid[2], 'before')
                                if(largeW1 != null)
                                {
                                    grid[6] = largeW1[1]
                                    grid[10] = largeW1[2]
                                }
                            }

                            const sw1 = generateWord(2, grid[4], 'before')
                            grid[5] = sw1[1]
                        }else{
                            grid[6] = '.'
                            grid[13] = '.'

                            if(wordToPlace[2] == null)
                            {
                                const medw3 = generateWord(3, [grid[1], grid[3]], 'both')
                                if(medw3 != null)
                                {
                                    grid[2] = medw3[1]
                                }
                            }

                            const largeW2 = generateWord(4, [grid[8], grid[11]], 'both')
                            if(largeW2 != null)
                            {
                                grid[9] = largeW2[1]
                                grid[10] = largeW2[2]
                            }else{
                                const mediumW1 = generateWord(3, grid[8], 'before')
                                if(mediumW1 != null)
                                {
                                    grid[9] = mediumW1[1]
                                    grid[10] = mediumW1[2]
                                }
                            }

                            if(grid[10] != '')
                            {
                                const smallW5 = generateWord(2,grid[10], 'before')
                                if(smallW5 != null)
                                {
                                    grid[14] = smallW5[1]
                                }else{
                                    const smallW6 = generateWord(2,grid[15], 'end')
                                    if(smallW6 != null)
                                    {
                                        grid[14] = smallW6[0]
                                    }
                                }
                            }else{
                                const smallW7 = generateWord(2)
                                grid[10] = smallW7[0]
                                grid[11] = smallW7[1]
                            }

                            const medW2 = generateWord(3, grid[1], 'before')
                            if(medW2 != null)
                            {
                                grid[5] = medW2[1]
                                grid[9] = medW2[2]
                            }

                        }

                    }

                }
                if(direction == 1)
                {
                    grid[4] = wordToPlace[1]
                    if(wordToPlace[2] != null)
                    {
                        grid[8] = wordToPlace[2]
                    }
                    if(wordToPlace[3] != null)
                    {
                        grid[12] = wordToPlace[3]

                        const medW1 = generateWord(4, grid[4], 'before')
                        if(medW1 != null)
                        {
                            grid[5] = medW1[1]
                            grid[6] = medW1[2]
                            grid[7] = medW1[3]
                        }else{
                            const medW2 = generateWord(3, grid[4], 'before')
                            if(medW2 != null)
                            {
                                grid[5] = medW2[1]
                                grid[6] = medW2[2]
                            }
                        }

                        const smal1w = generateWord(2)
                        grid[10] = smal1w[0]
                        grid[14] = smal1w[1]
                        grid[13] = smal1w[0]



                    }else{
                        newWord = generateWord(4)
                        grid[12] = newWord[0]
                        grid[13] = newWord[1]
                        grid[14] = newWord[2]
                        grid[15] = newWord[3]

                        var bp = randomNum(0,1)
                        if(bp == 0)
                        {
                            grid[5] = '.'
                            grid[10] = '.'
                        }else{
                            grid[6] = '.'
                            grid[9] = '.'
                            grid[7] = '.'
                        }

                        if(wordToPlace[2] == null)
                        {
                            var smallW = generateWord(2)
                            grid[8] = smallW[0]
                            grid[9] = smallW[1]
                        }

                        const smartWord = generateWord(4, [grid[3], grid[15]], 'both')
                        if(smartWord != null)
                        {
                            grid[7] = smartWord[1]
                            grid[11] = smartWord[2]
                        }else{
                            if(bp == 0)
                            {

                                const smallW2 = generateWord(2, grid[3], 'before')
                                
                                if(smallW2 != null)
                                {
                                    grid[7] = smallW2[1]
                                    grid[6] = '.'
                                }else{
                                    const smallW3 = generateWord(2)
                                    grid[6] = smallW3[0]
                                    grid[7] = smallW3[1]
                                }

                                const smallW4 = generateWord(2, grid[15], 'end')
                                if(smallW4 != null)
                                {
                                    grid[11] = smallW4[0]
                                }
                            }
                        }
                    }
                }
                // if(direction == 2)
                // {
                //     grid[2] = wordToPlace[1]
                //     grid[1] = wordToPlace[2]
                //     if(wordToPlace[3])
                //     {
                //         grid[0] = wordToPlace[3]
                //     }
                // }
                // if(direction == 3)
                // {
                //     grid[8] = wordToPlace[1]
                //     grid[4] = wordToPlace[2]
                //     if(wordToPlace[3])
                //     {
                //         grid[0] = wordToPlace[3]
                //     }
                // }
                break
            }


        }else{
            const wordLength = 4
            var direction =randomNum(0,1)
            const word = generateWord(wordLength)

            console.log(word)
            
            filledSpace += wordLength

            recentWord = [word, direction]
    
            if(direction == 0)
            {
                for (letterIndx in word)
                {
                    const letter = word[letterIndx]
                    grid[letterIndx * 4] = letter
                }
            }
            if(direction == 1)
            {
                for (letterIndx in word)
                {
                    const letter = word[letterIndx]
                    grid[letterIndx] = letter
                }
            }
            // if(direction == 2)
            // {
            //     for (letterIndx in word)
            //     {
            //         const letter = word[letterIndx]
            //         grid[(letterIndx*4) + 3] = letter
            //     }
            // }
            // if(direction == 3)
            // {
            //     console.log('dir 3')
            //     for (letterIndx in word)
            //     {
            //         const letter = word[letterIndx]
            //         grid[JSON.parse(letterIndx) + 12] = letter
            //     }
            // }
        }

        c++
    }




    // while (c < 150)
    // {
    //     c+=1
        
    //     const wordLength = randomNum(2,4)
    //     const word = generateWord(wordLength)
        
    //     if(direction == 0)
    //     {
    //         direction = 1
    //     }else{
    //         direction = 0
    //     }

    //     console.log(word)

    //     if(wordLength == 4)
    //     {
    //         if(direction == 0)
    //         {
    //             if(grid[0] == '' && grid[1] == '' && grid[2] == '' && grid[3] == '')
    //             {
    //                 // place word here
    //                 grid = placeWord(grid, word, [0,1,2,3])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
        
    //             }else if (grid[4] == '' && grid[5] == '' && grid[6] == '' && grid[7] == '')
    //             {
    //                 grid = placeWord(grid, word, [4,5,6,7])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[8] == '' && grid[9] == '' && grid[10] == '' && grid[11] == '')
    //             {
    //                 grid = placeWord(grid, word, [8,9,10,11])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[12] == '' && grid[13] == '' && grid[14] == '' && grid[15] == ''){
    //                 grid = placeWord(grid, word, [12,13,14,15])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
    //         if(direction == 1)
    //         {
    //             if(grid[0] == '' && grid[4] == '' && grid[8] == '' && grid[12] == '')
    //             {
    //                 grid = placeWord(grid, word, [0,4,8,12])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[1] == '' && grid[5] == '' && grid[9] == '' && grid[13] == '')
    //             {
    //                 grid = placeWord(grid, word, [1,5,9,13])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[2] == '' && grid[6] == '' && grid[10] == '' && grid[14] == '')
    //             {
    //                 grid = placeWord(grid, word, [2,6,10,14])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[3] == '' && grid[7] == '' && grid[11] == '' && grid[15] == '')
    //             {
    //                 grid = placeWord(grid, word, [3,7,11,15])
    //                 filledSpace += 4
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
    //     }else if(wordLength == 3){
    //         if(direction == 0)
    //         {
    //             if(grid[0] == '' && grid[1] == '' && grid[2] == '')
    //             {
    //                 // place word here
    //                 grid = placeWord(grid, word, [0,1,2])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
        
    //             }else if (grid[4] == '' && grid[5] == '' && grid[6] == '')
    //             {
    //                 grid = placeWord(grid, word, [4,5,6])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[8] == '' && grid[9] == '' && grid[10] == '')
    //             {
    //                 grid = placeWord(grid, word, [8,9,10])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[12] == '' && grid[13] == '' && grid[14] == ''){
    //                 grid = placeWord(grid, word, [12,13,14])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
            
    //         if(direction == 1){
    //             if(grid[0] == '' && grid[4] == '' && grid[8] == '')
    //             {
    //                 grid = placeWord(grid, word, [0,4,8])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[1] == '' && grid[5] == '' && grid[9] == '')
    //             {
    //                 grid = placeWord(grid, word, [1,5,9])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[2] == '' && grid[6] == '' && grid[10] == '')
    //             {
    //                 grid = placeWord(grid, word, [2,6,10])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[3] == '' && grid[7] == '' && grid[11] == '')
    //             {
    //                 grid = placeWord(grid, word, [3,7,11])
    //                 filledSpace += 3
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
    //     }else if(wordLength == 2)
    //     {
    //         if(direction == 0)
    //         {
    //             if(grid[0] == '' && grid[1] == '')
    //             {
    //                 // place word here
    //                 grid = placeWord(grid, word, [0,1])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
        
    //             }else if (grid[4] == '' && grid[5] == '')
    //             {
    //                 grid = placeWord(grid, word, [4,5])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[8] == '' && grid[9] == '')
    //             {
    //                 grid = placeWord(grid, word, [8,9])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if (grid[12] == '' && grid[13] == ''){
    //                 grid = placeWord(grid, word, [12,13])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
            
    //         if(direction == 1)
    //         {
    //             if(grid[0] == '' && grid[4] == '')
    //             {
    //                 grid = placeWord(grid, word, [0,4])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[1] == '' && grid[5] == '')
    //             {
    //                 grid = placeWord(grid, word, [1,5])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[2] == '' && grid[6] == '')
    //             {
    //                 grid = placeWord(grid, word, [2,6])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }else if(grid[3] == '' && grid[7] == '')
    //             {
    //                 grid = placeWord(grid, word, [3,7])
    //                 filledSpace += 2
    //                 attemptsWithoutPlacement = 0
    //                 continue;
    //             }
    //         }
    //     }
    //     attemptsWithoutPlacement+=1
    //     console.log(attemptsWithoutPlacement)
    //     if(attemptsWithoutPlacement > 10)
    //     {
    //         if(16 - filledSpace <= 5)
    //         {
    //             grid = fillInBlank(grid)
    //             break
    //         }
    //     }
    // }
    
    // console.log(grid[0] +' '+ grid[1] +''+ grid[2] +''+ grid[3])
    // console.log(grid[4] +' '+ grid[5] +''+ grid[6] +''+ grid[7])
    // console.log(grid[8] +' '+ grid[9] +''+ grid[10] +''+ grid[11])
    // console.log(grid[12] +' '+ grid[13] +''+ grid[14] +''+ grid[15])
    return grid
}

function countFilledSpace(grid)
{
    var count = 0
    for (boxIndx in grid)
    {
        const box = grid[boxIndx]
        if(box != '')
        {
            count +=1
        }
    }
    return count
}

function fillInBlank(grid)
{
    for (boxIndx in grid)
    {
        const box = grid[boxIndx]
        if(box == '')
        {
            grid[boxIndx] = '.'
        }
    }
    return grid
}

while (true)
{
    console.log('---grid---')
    grid = gridGeneration()
    var fs = countFilledSpace(grid)
    if(fs < 14)
    {
        continue
    }
    grid = fillInBlank(grid)
    const stringedGrid = JSON.stringify(grid)
    Cookies.set('grid', stringedGrid)
    break
}


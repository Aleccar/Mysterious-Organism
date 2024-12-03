// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}


function pAequorFactory(uniqId, strandArray) {
    return {
        specimenNum: uniqId,
        dna: strandArray,
        mutate() {
            const randomNum = Math.floor(Math.random() * this.dna.length)
            let newBase = returnRandBase()
            // Keep generating new ones until they are not the same.
            while (this.dna[randomNum] === newBase) {
                newBase = returnRandBase()
            }

            this.dna[randomNum] = newBase
            return this.dna
        },
        compareDna(pAequorObj) {
            const thisObjDna = this.dna
            const otherObjDna = pAequorObj.dna
            let comparisonList = []

            for (let i = 0; i < this.dna.length; i++) {
                if (thisObjDna[i] === otherObjDna[i]) {
                    comparisonList.push(thisObjDna[i])
                } else continue
            }
            const percentageDiff = (comparisonList.length / thisObjDna.length) * 100


            console.log(`specimen #${this.specimenNum} and specimen #${pAequorObj.specimenNum} have ${Math.floor(percentageDiff)}% DNA in common`)
        },
        willLikelySurvive() {
            let cBaseArray = []
            let gBaseArray = []

            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === 'C') {
                    cBaseArray.push(this.dna[i])
                } else if (this.dna[i] === 'G') {
                    gBaseArray.push(this.dna[i])
                } else continue
            }

            const cPercentDiff = (cBaseArray.length / this.dna.length) * 100
            const gPercentDiff = (gBaseArray.length / this.dna.length) * 100

            // Check that the percentage numbers work
            console.log(Math.floor(cPercentDiff))
            console.log(Math.floor(gPercentDiff))

            if (Math.floor(cPercentDiff) >= 60) {
                return true
            } else if (Math.floor(gPercentDiff) >= 60) {
                return true
            } else return false
        }
    }
}

let PAequorArray = []

for (let i = 1; i < 31; i++) {
    PAequorArray.push(pAequorFactory(i, mockUpStrand()))
}

// const p1 = pAequorFactory(1, mockUpStrand())
// const p2 = pAequorFactory(2, mockUpStrand())

// p1.mutate()
// p1.compareDna(p2)
// console.log(p1)
// console.log(p1.willLikelySurvive())
// console.log(p1.mutate())
console.log(PAequorArray)
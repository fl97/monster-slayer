function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100,
            roundCounter: 0,
            winner: null,
            logMessages: []
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12)
            if (this.monsterHP - attackValue < 0) {
                this.monsterHP = 0
            } else {
                this.monsterHP -= attackValue
            }
            this.roundCounter++
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15)
            if (this.playerHP - attackValue < 0) {
                this.playerHP = 0
            } else {
                this.playerHP -= attackValue
            }
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(10, 25)
            if (this.monsterHP - attackValue < 0) {
                this.monsterHP = 0
            } else {
                this.monsterHP -= attackValue
            }
            this.roundCounter++
            this.addLogMessage('player', 'special-attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            const healValue = getRandomValue(20, 40)
            if (this.playerHP + healValue > 100) {
                this.playerHP = 100
            } else {
                this.playerHP += healValue
            }
            this.roundCounter++
            this.addLogMessage('player', 'heal', healValue)
            this.attackPlayer()
        },
        startNewGame() {
            this.playerHP = 100
            this.monsterHP = 100
            this.roundCounter = 0
            this.winner = null
            this.logMessages = []
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(char, type, value) {
            this.logMessages.unshift({
                actionBy: char,
                actionType: type,
                actionValue: value
            })
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHP + '%' }
        },
        playerBarStyles() {
            return { width: this.playerHP + '%' }
        },
        specialAttackAvailable() {
            return this.roundCounter % 3 !== 0
        },
        healingAvailable() {
            return this.roundCounter % 3 !== 0
        }
    },
    watch: {
        playerHP(value) {
            if (value <= 0 && this.monsterHP <= 0) {
                // A draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster'
            }
        },
        monsterHP(value) {
            if (value <= 0 && this.playerHP <= 0) {
                // A draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player'
            }
        }
    }
})

app.mount('#game')
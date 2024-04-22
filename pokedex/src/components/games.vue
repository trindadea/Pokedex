<script>
    export default {
        props: {
            games: Array,
            color: String,
            name: String
        },

        data(){
            return{
                gamesList: {
                    "red": "rgba(255, 0, 0, 0.7)",
                    "blue": "rgba(0, 0, 255, 0.7)",
                    "yellow": "rgba(255, 255, 0, 0.7)",
                    "gold": "rgba(255, 215, 0, 0.7)",
                    "silver": "rgba(192, 192, 192, 0.7)",
                    "crystal": "rgba(0, 255, 255, 0.7)",
                    "ruby": "rgba(220, 20, 60, 0.7)",
                    "sapphire": "rgba(0, 0, 139, 0.7)",
                    "emerald": "rgba(0, 201, 87, 0.7)",
                    "firered": "rgba(178, 34, 34, 0.7)",
                    "leafgreen": "rgba(50, 205, 50, 0.7)",
                    "diamond": "rgba(255, 250, 250, 0.7)",
                    "pearl": "rgba(255, 192, 203, 0.7)",
                    "platinum": "rgba(229, 228, 226, 0.7)",
                    "heartgold": "rgba(255, 215, 0, 0.7)",
                    "soulsilver": "rgba(192, 192, 192, 0.7)",
                    "black": "rgba(0, 0, 0, 0.7)",
                    "white": "rgba(255, 255, 255, 0.7)",
                    "colosseum": "rgba(139, 69, 19, 0.7)",
                    "xd": "rgba(0, 0, 139, 0.7)",
                    "black-2": "rgba(0, 0, 0, 0.7)",
                    "white-2": "rgba(255, 255, 255, 0.7)",
                    "x": "rgba(65, 105, 225, 0.7)",
                    "y": "rgba(154, 205, 50, 0.7)",
                    "omega-ruby": "rgba(220, 20, 60, 0.7)",
                    "alpha-sapphire": "rgba(0, 0, 139, 0.7)",
                    "sun": "rgba(255, 165, 0, 0.7)",
                    "moon": "rgba(70, 130, 180, 0.7)",
                    "ultra-sun": "rgba(255, 69, 0, 0.7)",
                    "ultra-moon": "rgba(30, 144, 255, 0.7)",
                    "lets-go-pikachu": "rgba(255, 0, 0, 0.7)",
                    "lets-go-eevee": "rgba(238, 130, 238, 0.7)",
                    "sword": "rgba(255, 0, 0, 0.7)",
                    "shield": "rgba(0, 0, 255, 0.7)",
                    "the-isle-of-armor": "rgba(218, 165, 32, 0.7)",
                    "the-crown-tundra": "rgba(169, 169, 169, 0.7)",
                    "brilliant-diamond": "rgba(220, 20, 60, 0.7)",
                    "shining-pearl": "rgba(255, 192, 203, 0.7)",
                    "legends-arceus": "rgba(255, 215, 0, 0.7)",
                    "scarlet": "rgba(220, 20, 60, 0.7)",
                    "violet": "rgba(238, 130, 238, 0.7)",
                    "the-teal-mask": "rgba(0, 128, 128, 0.7)",
                    "the-indigo-disk": "rgba(75, 0, 130, 0.7)"
                }
            }
        },

        methods: {
            getGameColor(gameName, isDark) {
                let cor = this.gamesList[gameName]

                if (isDark) {
                    // Verifica se a cor é escura
                    const rgb = cor.match(/\d+/g); // Extrai os componentes RGB da cor
                    if (rgb) {
                    const luminosidade = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255; // Calcula a luminosidade da cor
                    if (luminosidade < 0.5) {
                        return 'rgba(255, 255, 255, 1)'
                    }
                    else return 'rgba(0, 0, 0, 0.7)'
                }
            }

                return cor;
            }
        }

  };
</script>

<template>
    <div>
        <span :style="{ color: color}">Jogos em que esse Pokémon aparece</span>
        <div class="game-list">
            <div v-for="(game, index) in games" :key="index" class="game" 
            :style="{ 
                backgroundColor: getGameColor(game.version.name).replace(', 1)', '0.5'), 
                border: '3px solid ' + getGameColor(game.version.name),
                'box-shadow': '5px 5px 0px 0px rgba(0, 0, 0, 0.5)',
                color: getGameColor(game.version.name, true)
            }">
                Pokémon {{ game.version.name.split('-').join(' ') }}
            </div>
        </div>
    </div>
</template>
  
<style scoped>
span{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 8px;
}
.game-list {
display: flex;
flex-direction: row;
flex-wrap: wrap;

gap: 1rem;
}

.game {
height: 40px;
border-radius: 8px;
text-transform: capitalize;
font-weight: bold;
font-size: 14px;
display: flex;
justify-content: center;
align-items: center;
padding: 0 1rem;
}

.game-item:hover {
background-color: #e0e0e0;
}
</style>
  
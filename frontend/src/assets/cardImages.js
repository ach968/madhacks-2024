const cardImages = {
    "2_hearts": "https://deckofcardsapi.com/static/img/2H.png",
    "2_clubs": "https://deckofcardsapi.com/static/img/2C.png",
    "2_diamonds": "https://deckofcardsapi.com/static/img/2D.png",
    "2_spades": "https://deckofcardsapi.com/static/img/2S.png",
    "3_hearts": "https://deckofcardsapi.com/static/img/3H.png",
    "3_diamonds": "https://deckofcardsapi.com/static/img/3D.png",
    "3_clubs": "https://deckofcardsapi.com/static/img/3C.png",
    "3_spades": "https://deckofcardsapi.com/static/img/3S.png",
    "4_hearts": "https://deckofcardsapi.com/static/img/4H.png",
    "4_diamonds": "https://deckofcardsapi.com/static/img/4D.png",
    "4_clubs": "https://deckofcardsapi.com/static/img/4C.png",
    "4_spades": "https://deckofcardsapi.com/static/img/4S.png",
    "5_hearts": "https://deckofcardsapi.com/static/img/5H.png",
    "5_diamonds": "https://deckofcardsapi.com/static/img/5D.png",
    "5_clubs": "https://deckofcardsapi.com/static/img/5C.png",
    "5_spades": "https://deckofcardsapi.com/static/img/5S.png",
    "6_hearts": "https://deckofcardsapi.com/static/img/6H.png",
    "6_diamonds": "https://deckofcardsapi.com/static/img/6D.png",
    "6_clubs": "https://deckofcardsapi.com/static/img/6C.png",
    "6_spades": "https://deckofcardsapi.com/static/img/6S.png",
    "7_hearts": "https://deckofcardsapi.com/static/img/7H.png",
    "7_diamonds": "https://deckofcardsapi.com/static/img/7D.png",
    "7_clubs": "https://deckofcardsapi.com/static/img/7C.png",
    "7_spades": "https://deckofcardsapi.com/static/img/7S.png",
    "8_hearts": "https://deckofcardsapi.com/static/img/8H.png",
    "8_diamonds": "https://deckofcardsapi.com/static/img/8D.png",
    "8_clubs": "https://deckofcardsapi.com/static/img/8C.png",
    "8_spades": "https://deckofcardsapi.com/static/img/8S.png",
    "9_hearts": "https://deckofcardsapi.com/static/img/9H.png",
    "9_diamonds": "https://deckofcardsapi.com/static/img/9D.png",
    "9_clubs": "https://deckofcardsapi.com/static/img/9C.png",
    "9_spades": "https://deckofcardsapi.com/static/img/9S.png",
    "10_hearts": "https://deckofcardsapi.com/static/img/0H.png",
    "10_diamonds": "https://deckofcardsapi.com/static/img/0D.png",
    "10_clubs": "https://deckofcardsapi.com/static/img/0C.png",
    "10_spades": "https://deckofcardsapi.com/static/img/0S.png",
    "J_hearts": "https://deckofcardsapi.com/static/img/JH.png",
    "J_diamonds": "https://deckofcardsapi.com/static/img/JD.png",
    "J_clubs": "https://deckofcardsapi.com/static/img/JC.png",
    "J_spades": "https://deckofcardsapi.com/static/img/JS.png",
    "Q_hearts": "https://deckofcardsapi.com/static/img/QH.png",
    "Q_diamonds": "https://deckofcardsapi.com/static/img/QD.png",
    "Q_clubs": "https://deckofcardsapi.com/static/img/QC.png",
    "Q_spades": "https://deckofcardsapi.com/static/img/QS.png",
    "K_hearts": "https://deckofcardsapi.com/static/img/KH.png",
    "K_diamonds": "https://deckofcardsapi.com/static/img/KD.png",
    "K_clubs": "https://deckofcardsapi.com/static/img/KC.png",
    "K_spades": "https://deckofcardsapi.com/static/img/KS.png",
    "A_hearts": "https://deckofcardsapi.com/static/img/AH.png",
    "A_diamonds": "https://deckofcardsapi.com/static/img/AD.png",
    "A_clubs": "https://deckofcardsapi.com/static/img/AC.png",
    "A_spades": "https://deckofcardsapi.com/static/img/AS.png",
};

export const preloadCardImages = () => {
    Object.values(cardImages).forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }
  
  export default cardImages
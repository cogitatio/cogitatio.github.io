const APP_ID = '3074457347777696602';
const URL_ROOT = 'https://cogitatio.github.io/miro-plugin/mrpg/';
const CARDCOUNT = 524;

async function placeCardDeck() {
    vp = await miro.board.viewport.get();
    let deck = {
      x: vp.x + vp.width/2,
      y: vp.y + vp.height/2
    }
    await miro.board.widgets.create({
      type: "image",
      url: URL_ROOT + "cards/mrpg-back.jpg",
      metadata: {
        [APP_ID]: {
          deck: true,
          active: false
        }
      },
      x: deck.x,
      y: deck.y
    })
}

async function activateCardDecks() {
  let decks = await miro.board.widgets.get({metadata: { [APP_ID]: { deck: true}}});
  decks.forEach((deck, i) => {
    miro.board.widgets.update({
      id: deck.id,
      metadata: {
        [APP_ID]: {
          deck: true,
          active: true
        }
      },
      url: "https://cogitatio.github.io/miro-plugin/mrpg/cards/mrpg-back-2.jpg"
    })
  });

}

function formatCardNumber(num) {
    var s = "00000" + num;
    return s.substr(s.length-5);
}

async function spreadOutCards() {
  const CARDWIDTH = 433;
  const CARDHEIGHT = 650;
  const CARDPADDING = 10;

  const columns = Math.ceil(Math.sqrt(CARDCOUNT / 16 * 9) * 16 );
  const rows = Math.ceil(CARDCOUNT / columns);

  for (row = 1; row <= rows; row++) {
    for (column = 1; column <= columns; colum++) {
      let cardNumber = ((row-1) * 16 + column);
      if (cardNumber > CARDCOUNT) break;
      miro.board.widgets.create({
        type: "image",
        url: URL_ROOT + "cards/card" + formatCardNumber(cardNumber) + ".jpg",
        metadata: {
          [APP_ID]: {
            card: true
          }
        },
        x: (column * CARDWIDTH + (column-1) * CARDPADDING),
        y: (row * CARDHEIGHT + (row-1) * CARDPADDING)
      })
    }
  }
}

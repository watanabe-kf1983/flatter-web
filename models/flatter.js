function flatter(name) {
    const praise_words = ['素敵', 'スマート', 'オシャレ'];
    const flatter_words = [];

    for (word of praise_words) {
        flatter_words.push(`${name}さんは${word}ですね`);
    }

    praise_words.forEach(word => {
        flatter_words.push(`${name}さんは本当に${word}ですね`);
    });

    for (let i = 0; i < praise_words.length; i++) {
        flatter_words.push(`${name}さんはつくづく${praise_words[i]}ですね`);
    }

    return { flatteree: { name: name }, words: flatter_words };
}

module.exports = flatter;

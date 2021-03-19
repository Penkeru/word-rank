let HelperUtil = (function () {
    String.prototype.allReplace = function (obj) {
        var retStr = this;
        for (var x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    const stopWords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
        "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot",
        "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few",
        "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll",
        "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll",
        "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most",
        "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
        "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should",
        "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves",
        "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
        "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've",
        "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom",
        "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
        "yourself", "yourselves"];

    function clearHTMLTags(str) {
        return str ? str.replace(/(<([^>]+)>)/ig, '').trim() : str;
    }

    function removeStopWords(str) {
        if (str) {
            str = str.toLowerCase();
            const stopWordsMap = {};
            for (let stopWord of stopWords) {
                stopWordsMap[' ' + stopWord + ' '] = ' ';
            }
            return str.allReplace(stopWordsMap);
        } else {
            return str;
        }
    }

    function clearStringSymbols(str) {
        if (str) {
            return str.replace(/[^a-zA-Z ]/g, "").replace(/  +/g, ' ');
        } else {
            return str;
        }
    }

    return {
        extractText: function (str) {
            let extractString;
            extractString = clearHTMLTags(str);
            extractString = clearStringSymbols(extractString);
            extractString = removeStopWords(extractString);
            return extractString;
        },
        extractQueryText: function (query) {
            if (query) {
                const key = Object.keys(query.pages)[0];
                return query.pages[key].extract;
            } else {
                return query;
            }
        },
        getTitle: function (response) {
            return response && response[1] && response[1][0] || '';
        },
        calculateWordsOccurrences: function (str) {
            const wordsArray = str.split(' ');
            const resultMap = {};
            for (let word of wordsArray) {
                resultMap[word] = resultMap[word] ? resultMap[word] + 1 : 1;
            }
            let sortable = [];
            for (let word in resultMap) {
                if (resultMap.hasOwnProperty(word)) {
                    sortable.push([word, resultMap[word]]);
                }
            }

            sortable.sort(function (a, b) {
                if (b[1] !== a[1]) {
                    return b[1] - a[1];
                } else {
                    return b[0] > a[0] ? -1 : 1;
                }
            });
            return sortable;
        }
    }
})();


class List {
    listInstance;

    constructor(listInstanceObject) {
        this.listInstance = listInstanceObject;
    }

    showCommonWords(query) {
        return new Promise(function (resolve, reject) {
            ApiService.getSearchQueryResult(query).then(function (response) {
                const requiredTitle = HelperUtil.getTitle(response);
                ApiService.getTopicDetails(requiredTitle).then(function (response) {
                    let extractString = HelperUtil.extractQueryText(response.query);
                    extractString = HelperUtil.extractText(extractString);
                    const commonWordsContainer = HelperUtil.calculateWordsOccurrences(extractString);
                    resolve(commonWordsContainer);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    buildListByQuery(query) {
        this.clearList();
        if (query) {
            this.showCommonWords(query).then((result) => {
                for (let wordArr of result) {
                    this.addToList(wordArr[0], wordArr[1]);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    addToList(word, numOfOccurrences) {
        const stars = numOfOccurrences > 5 ? '*'.repeat(5) : '*'.repeat(numOfOccurrences);
        this.listInstance.append(`<li><span>${word} ( ${stars} )</span></li>`);
    }

    clearList() {
        this.listInstance.empty();
    }
}

let ApiService = (function () {
    function ajax(options) {
        return new Promise(function (resolve, reject) {
            $.ajax(options).done(resolve).fail(reject);
        });
    }

    return {
        getSearchQueryResult: function (query) {
            return ajax({
                url: 'wiki/search/' + query,
                type: 'get',
                contentType: 'application/json; charset=utf-8'
            });
        },
        getTopicDetails: function (title) {
            return ajax({
                url: 'wiki/topic/' + title,
                type: 'get',
                contentType: 'application/json; charset=utf-8'
            });
        }
    };
})();

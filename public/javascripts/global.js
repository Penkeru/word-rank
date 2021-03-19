
// DOM Ready =============================================================
$(document).ready(function () {
    const list = new List($('ul#list'));
    $('#searchInput').keypress(function (event) {
        var keycode = event.key;
        if (keycode === 'Enter') {
            list.buildListByQuery(this.value);
        }
    });
});

// DOM Ready - end =============================================================







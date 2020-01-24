function sortMessages(messages) {
    messages.sort(function compare(a, b) {
        var dateA = new Date(a.created_at);
        var dateB = new Date(b.created_at);
        return dateB - dateA ;
    });
}

exports.sortMessages = sortMessages;
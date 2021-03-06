var Base = require('./base').Base;

var Message = exports.Message = function (database) {
    Base.call(this, database);
    this._collectionName = 'message';
};

Message.prototype = Object.create(Base.prototype);

Message.prototype.idProperties = function () {
    return [ 'creator', 'to' ];
};

Message.prototype.all = function (userID, withID, cb) {
    var query;
    if (typeof cb === 'undefined') {
        cb     = withID;
        withID = null;
        query  = { $or: [ { creator: userID }, { to: userID } ] };
    } else {
        query = {
            creator: { $in: [ userID, withID ] },
            to:      { $in: [ userID, withID ] }
        };
    }
    Base.prototype.find.call(this, query, { sort: { created: -1 } }, cb);
};

Message.prototype.create = function (doc, cb) {
    var required = [ 'creator', 'to', 'title', 'content' ],
        missing  = required.filter(function (key) { return (typeof doc[key] === 'undefined'); });
    if (missing.length) {
        return cb(new Error('missing ' + missing.join(', ') + '.'));
    }

    var message = JSON.parse(JSON.stringify(doc));
    doc.created = new Date();

    Base.prototype.create.call(this, doc, cb);
};

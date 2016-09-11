var q = require('q');

var url;
var self;


module.exports.defaults = function(_self, _url){
  url = _url;
  self = _self;
};
/**
 * Executes the query and returns the results by calling the passed in callback
 * @param {String} query - the query to run against youtrack
 * @param {Function} cb - the callback function to call after the response is ready 
 * @return {Object} returns the promise
 */
module.exports.getIssues = function(query, cb){
    var d = q.defer();

    self.request.get({url: url + '/rest/issue/?filter='+query}, function(err, res, body){
        if (err || res.statusCode !== 200){

            err = err || new Error('wrong credentials');
            if (cb) return cb(err);

            return d.reject(err);
        }


        if (cb) return cb(res, body);
        d.resolve();
    });
    return d.promise;
};
/**
 * Use to get the change history of an issue. 
 * @param {String} issueId - the id of the issue that we want its change history
 * @param {Object} workItemObject - An object containing information about the issue. Used as context 
 * @param {Function} cb - the call back function that's called after the result is back from youtrack
 * @return {Object} returns the promise
 */
module.exports.getIssueChanges = function(issueId, workitemObject, cb){
    var d = q.defer();
    self.request.get({url: url + '/rest/issue/'+issueId+'/changes'}, function(err, res, body){
        if (err || res.statusCode !== 200){

            err = err || new Error('wrong credentials');
            if (cb) return cb(err);

            return d.reject(err);
        }
        if (cb) return cb(res, body);
        d.resolve({'workitem':workitemObject, 'body': body});
    });
    return d.promise;
};

module.exports.createIssue = function(project, assignee, summary, description, priority, type, subsystem, state, affectsVersion, fixedVersion, fixedInBuild){};
module.exports.getChangesForIssue = function(issue){};
module.exports.getComments = function(id){};
module.exports.getAttachments = function(id){};
module.exports.getAttachmentContent = function(url){};
module.exports.createAttachmentFromAttachment = function(){};
module.exports.createAttachment = function(issueId, name, content, authorLogin, contentType, contentLength, created, group){};
module.exports.importAttachment = function(issueId, name, content, authorLogin, contentType, contentLength, created, group){};
module.exports.getLinks = function(id, outwardOnly){};
module.exports.executeCommand = function(issueId, command, comment, group, runAs){};
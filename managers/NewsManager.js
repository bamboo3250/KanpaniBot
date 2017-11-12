function NewsManager(bot) {
    this.bot = bot;
    this.newsDict = {};
    this.gameLogsDict = {};
}

NewsManager.prototype.startTimer = function() {
    var self = this;

    this.fetchNews(function() {
        self.fetchGameLogs(function() {

            self.bot.bot.setInterval(function() {
                self.fetchNews(function(newsList) {
                    if (!newsList) return;
                    //self.bot.log(newsList.length + ' news fetched!');

                    for(var i=0;i<newsList.length;i++) {
                        var news = newsList[i];
                        var server = news['server'];
                        var role = self.bot.getRole(server);
                        if (!role) {
                            self.bot.log('Server Role ' + server + ' is not found.');
                            continue;
                        }

                        var messages = [];
                        if (typeof news['messages'] == 'string') {
                            messages = JSON.parse(news['messages']);
                        
                        } else if (typeof news['messages'] == 'array') {
                            messages = news['messages'];
                        }

                        var message = ' ';
                        for(var j=0;j<messages.length;j++) {
                            if (typeof messages[j]['color'] != 'undefined') {
                                message += '**' + messages[j]['text'] + '**';
                            } else {
                                message += messages[j]['text'];
                            }
                        }
                        self.bot.sendMessageToFloatingContinentChannel(role + message);
                    }
                });
                self.fetchGameLogs(function(gameLogList) {
                    if (!gameLogList) return;
                    //self.bot.log(gameLogList.length + ' game logs fetched!');

                    for(var i=0;i<gameLogList.length;i++) {
                        var gameLog = gameLogList[i];
                        var content = gameLog['content'];

                        if (!content.startsWith('discovered')) continue;
                        
                        var startPos = content.indexOf('{');
                        if (startPos < 0) continue;

                        var endPos = content.indexOf('}');
                        var originalText = content.substring(startPos, endPos+1);
                        var text = content.substring(startPos+1, endPos);
                        var params = text.split(',');
                        if (params[0] != 'event') continue;

                        var eventParams = params[1].split('-');
                        var eventName = eventParams[0]; 

                        if (eventName == 'track') {
                            var dungeonId = eventParams[1];
                            var floorId = eventParams[2];
                            var server = eventParams[3]

                            var dungeonName = 'Unknown';
                            if (dungeonId == '1101') {
                                dungeonName = 'アトロナの森';
                            
                            } else if (dungeonId == '1201') {
                                dungeonName = 'ユディシナ群島';
                            
                            } else if (dungeonId == '1301') {
                                dungeonName = 'フルエリナ雪原';
                            }

                            content = content.replace(originalText, '**Footprint** on **Floor ' + floorId + '** in **' + dungeonName + '**');
                            content = ' **' + gameLog['player_name'] + '** ' + content + '!';
                            
                            var role = self.bot.getRole(server);
                            if (!role) {
                                self.bot.log('Server Role ' + server + ' is not found.');
                                continue;
                            }
                            self.bot.sendMessageToMainChannel(role + content, {
                                'files':['../images/misc/track.png']
                            });
                        }
                    }
                });
            }, 60*1000);
        });
    });
};

NewsManager.prototype.fetchNews = function(callback) {
    var self = this;
    this.bot.sendGetRequest('https://kanpanitools.com/dungeon_reports/get_recent/all', function(data) {
        var newNews = [];
        
        if (!data) {
            callback(newNews);
            return;
        }
        try {
            var gameNewsList = JSON.parse(data);
            for (var i=0;i<gameNewsList.length;i++) {
                var news = gameNewsList[i];
                var newsId = news['id'];

                if (typeof self.newsDict[newsId] == 'undefined') {
                    self.newsDict[newsId] = news;
                    newNews.push(news);
                }
            }
        }
        catch (err) {
            self.bot.log('[fetchNews]: ' + err);
        }
        callback(newNews);
    });
}

NewsManager.prototype.fetchGameLogs = function(callback) {
    var self = this;
    this.bot.sendGetRequest('https://kanpanitools.com/game_logs/get_recent', function(data) {
        var newGameLogs = [];
        
        if (!data) {
            callback(newGameLogs);
            return;
        }
        try {
            var parsedNewGameLogs = JSON.parse(data);
            for (var i=0;i<parsedNewGameLogs.length;i++) {
                var gameLog = parsedNewGameLogs[i];
                var gameLogId = gameLog['id'];

                if (typeof self.gameLogsDict[gameLogId] == 'undefined') {
                    self.gameLogsDict[gameLogId] = gameLog;
                    newGameLogs.push(gameLog);
                }
            }
        }
        catch (err) {
            self.bot.log('[fetchGameLogs]: ' + err);
        }
        callback(newGameLogs);
    });
}

module.exports = NewsManager;

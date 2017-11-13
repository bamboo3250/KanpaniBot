function NewsManager(bot) {
    this.bot = bot;
    this.newsDict = {};
    this.gameLogsDict = {};
}

var translation = {
    "DUNGEON_AREA_アトロナの森"             : "Atrona Forest",
    "DUNGEON_AREA_ユディシナ群島"           : "Yudeshina Archipelago",
    "DUNGEON_AREA_フルエリナ雪原"           : "Furuerina Snowfield",

    "DUNGEON_BONUS_宝箱発見率UP"         : "Treasure Chest Discovery Rate UP",
    "DUNGEON_BONUS_宝箱内容グレードUP"      : "Treasure Chest Contents Grade UP",
    "DUNGEON_BONUS_宝箱ドロップ率UP"        : "Treasure Chest Drop Rate UP",
    "DUNGEON_BONUS_ミニバトル遭遇率UP"       : "Mini-battle Encounter Rate UP",
    "DUNGEON_BONUS_モンスターバトル遭遇率UP"   : "Monster Battle Encounter Rate UP",
    "DUNGEON_BONUS_《イエティ》遭遇率UP"       : "《Yeti》 Encounter Rate UP",
    "DUNGEON_BONUS_《ゴブリンズ》遭遇率UP"      : "《Goblin》 Encounter Rate UP",
    "DUNGEON_BONUS_《ピーヨ》遭遇率UP"        : "《Piyo》 Encounter Rate UP",
    "DUNGEON_BONUS_《森の知恵者》遭遇率UP"    : "《Forest Sage》 Encounter Rate UP",
    "DUNGEON_BONUS_《オーシャンシェル》遭遇率UP"  : "《Ocean Shell》 Encounter Rate UP",
    "DUNGEON_BONUS_《アルブサウルス》遭遇率UP"   : "《Albusaurus》 Encounter Rate UP",
    "DUNGEON_BONUS_《シーフェアリー》遭遇率UP"   : "《Sea Fairy》 Encounter Rate UP",
    
    "DUNGEON_BOSS_《シルフィード》"            : "《Sylpheed》",
    "DUNGEON_BOSS_《ゴブリンロード》"           : "《Goblin Lord》",
    "DUNGEON_BOSS_《グーワ》"                : "《Guuwa》",
    "DUNGEON_BOSS_《シアングレイター》"          : "《Cyan Greater》",
    "DUNGEON_BOSS_《ギガントイエティ》"          : "《Gigantic Yeti》",
    "DUNGEON_BOSS_《グラシェサウルス》"          : "《Grassisaurus》",
    "DUNGEON_BOSS_《森のミネルバ》"            : "《Forest Minerva》",
    
    "DUNGEON_REPORT_BONUS_MESSAGE"      : "{area} has {bonus}!",
    "DUNGEON_REPORT_DEFEAT_MESSAGE"     : "{company} has defeated {boss} in {area}!"
};

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

                        var title = ' ';

                        if (messages.length == 5) {
                            var areaName = messages[1].text;
                            var translatedAreaName = translation['DUNGEON_AREA_' + areaName];
                            
                            var bonusName = messages[3].text;
                            var translatedBonusName = translation['DUNGEON_BONUS_' + bonusName];
                            
                            var message = translation['DUNGEON_REPORT_BONUS_MESSAGE'];
                            title += message.replace('{area}', translatedAreaName)
                                            .replace('{bonus}', translatedBonusName);

                        } else if (messages.length == 6) {
                            var companyName = messages[0].text;
                            
                            var areaName = messages[2].text;
                            var translatedAreaName = translation['DUNGEON_AREA_' + areaName];
                            
                            var bossName = messages[4].text;
                            var translatedBossName = translation['DUNGEON_BOSS_' + bossName];

                            var message = translation['DUNGEON_REPORT_DEFEAT_MESSAGE'];
                            title += message.replace('{company}', companyName)
                                            .replace('{area}', translatedAreaName)
                                            .replace('{boss}', translatedBossName);

                        } else {
                            for(var j=0;j<messages.length;j++) {
                                var message = messages[j];
                                if (typeof message.color != 'undefined') {
                                    title += '**' + message.text + '**';
                                } else {
                                    title += message.text;
                                }
                            }
                        }

                        self.bot.sendMessageToFloatingContinentChannel(role + ' ' + title);
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

                            content = content.replace(originalText, '**Footprint** on **Floor ' + floorId + '** in **' + translation['DUNGEON_AREA_'+dungeonName] + '**');
                            content = ' **' + gameLog['player_name'] + '** ' + content + '!';
                            
                            var role = self.bot.getRole(server);
                            if (!role) {
                                self.bot.log('Server Role ' + server + ' is not found.');
                                continue;
                            }
                            self.bot.sendMessageToMainChannel(role + content, {
                                'files':['images/misc/track.png']
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

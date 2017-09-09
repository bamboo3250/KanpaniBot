module.exports = {
    postSchedule: function(message, bot) {
        var now = new Date();

        text = '';
        var shownCount = 0;

        for(var i=0;i<bot.schedule.length;i++) {
            var startTime = new Date(bot.schedule[i].start_time);
            var endTime = new Date(bot.schedule[i].end_time);
            if (now.valueOf() < endTime.valueOf()) {
                if (shownCount >= 5) continue;

                text += "<" + bot.schedule[i].title + ">\n";

                if (now.valueOf() < startTime.valueOf()) {
                    var time = bot.functionHelper.parseTime(startTime.valueOf() - now.valueOf());
                    text += "[Starts in][" + time + "]";
                } else if (now.valueOf() < endTime.valueOf()) {
                    var time = bot.functionHelper.parseTime(endTime.valueOf() - now.valueOf());
                    text += "[Ends in][" + time + "]";
                } else {
                    text += "[Not Available][]";
                }
                text += '\n\n';
                shownCount++;
            }
        }
        if (text.length == 0) {
            text = 'No Event/Maintenance schedule is available.';
        }

        text = "```Markdown\n" + text + "```";
        message.author.send(text);
    },

    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~schedule") return;
        
        var self = this;
        bot.retrieveSchedule(function() {
            self.postSchedule(message, bot);
        });

        
    }
}
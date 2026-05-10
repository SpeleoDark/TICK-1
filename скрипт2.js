var db = 'telegraf'
var rp = 'autogen'
var measurement = 'disk'
var groupBy = ['host', 'path']
var whereFilter = lambda: "path" == '/'

var data = stream
    |from()
        .database(db)
        .retentionPolicy(rp)
        .measurement(measurement)
        .groupBy(groupBy)
        .where(whereFilter)
    |window()
        .period(5m)
        .every(1m)
    |mean('used_percent')
        .as('mean_used_percent')

var trigger = data
    |alert()
        .id('Disk Space Low')
        .message('Disk usage on / is {{ index .Fields "mean_used_percent" }}%')
        .crit(lambda: "mean_used_percent" > 85)
        .log('/tmp/kapacitor_alerts.log')

trigger
var db = 'telegraf'
var rp = 'autogen'
var measurement = 'mem'
var groupBy = ['host']

var data = stream
    |from()
        .database(db)
        .retentionPolicy(rp)
        .measurement(measurement)
        .groupBy(groupBy)
    |window()
        .period(5m)
        .every(1m)
    |mean('used_percent')
        .as('mean_used_percent')

var trigger = data
    |alert()
        .id('Memory High Usage')
        .message('Memory usage is {{ index .Fields "mean_used_percent" }}% for 5 min')
        .crit(lambda: "mean_used_percent" > 90)
        .log('/tmp/kapacitor_alerts.log')

trigger
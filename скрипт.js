var db = 'telegraf'
var rp = 'autogen'
var measurement = 'cpu'
var groupBy = ['host']
var whereFilter = lambda: "cpu" == 'cpu-total'

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
    |mean('usage_idle')
        .as('mean_usage_idle')

var trigger = data
    |eval(lambda: 100 - "mean_usage_idle")
        .as('cpu_used')
        .keep()
    |alert()
        .id('CPU High Usage')
        .message('CPU usage is {{ index .Fields "cpu_used" }}% for 5 min')
        .crit(lambda: "cpu_used" > 90)
        .log('/tmp/kapacitor_alerts.log')

trigger
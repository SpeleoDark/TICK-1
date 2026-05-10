var db = 'telegraf'
var rp = 'autogen'
var measurement = 'procstat'
var groupBy = ['pattern']

var data = stream
    |from()
        .database(db)
        .retentionPolicy(rp)
        .measurement(measurement)
        .groupBy(groupBy)
    |where(lambda: "running" == 0)
    |alert()
        .id('Service Down')
        .message('Service {{ index .Tags "pattern" }} is not running')
        .crit(lambda: TRUE)
        .stateChangesOnly()
        .log('/tmp/kapacitor_alerts.log')

data
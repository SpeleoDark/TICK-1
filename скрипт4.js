var db = 'telegraf'
var rp = 'autogen'
var measurement = 'nginx'

var data = stream
    |from()
        .database(db)
        .retentionPolicy(rp)
        .measurement(measurement)
    |window()
        .period(1m)
        .every(1m)
    |derivative('5xx')
        .as('error_rate')
        .unit(1s)
        .nonNegative()
    |mean('error_rate')
        .as('mean_error_rate')
    |alert()
        .id('Nginx 5xx Errors')
        .message('High rate of 5xx errors: {{ index .Fields "mean_error_rate" }} per sec')
        .crit(lambda: "mean_error_rate" > 5)
        .log('/tmp/kapacitor_alerts.log')

data
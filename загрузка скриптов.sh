kapacitor define cpu_alert    -tick cpu_alert.tick    -type stream -dbrp telegraf.autogen
kapacitor define mem_alert    -tick mem_alert.tick    -type stream -dbrp telegraf.autogen
kapacitor define disk_alert   -tick disk_alert.tick   -type stream -dbrp telegraf.autogen
kapacitor define service_down -tick service_down.tick -type stream -dbrp telegraf.autogen
kapacitor define nginx_5xx    -tick nginx_5xx.tick    -type stream -dbrp telegraf.autogen
kapacitor enable cpu_alert mem_alert disk_alert service_down nginx_5xx
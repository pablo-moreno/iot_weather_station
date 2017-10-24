# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import gc
import webrepl
try:
    # Import to connect to WIFI
    import connection
except:
    pass
import utime
from led_control import LedControl
from weather_station import WeatherStation

webrepl.start()
gc.collect()

ws = WeatherStation(sleep=5 * 60)
for i in range(3):
    ws.lc.pulse()
    time.sleep_ms(250)

ws.run()

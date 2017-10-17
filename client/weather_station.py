import dht
import machine
import urequests as requests
import urandom
import json
import utime
from led_control import LedControl

class WeatherStation:
    """
    Weather Station Main Class
    """
    SERVER_ADDRESS = 'http://192.168.1.250:7890/'

    def __init__(self, sleep=10, debug=False):
        self.running = True
        self.lc = LedControl()
        self.sleep = sleep
        self.debug = debug
        self.dht = dht.DHT22(machine.Pin(4))

    def post(self):
        """
        Reads the data from the sensor and posts it to the HTTP Server
        """
        try:
            if not self.debug:
                self.dht.measure()
                temperature, humidity = self.dht.temperature(), self.dht.humidity()
            else:
                temperature, humidity = urandom.getrandbits(5), urandom.getrandbits(6)
            data = json.dumps({
                'temperature': temperature,
                'humidity': humidity
            })
            r = requests.post(
                '{}{}'.format(WeatherStation.SERVER_ADDRESS, 'measure/'),
                data=data
            )
            self.lc.pulse()
            print('{} => {}'.format(r.status_code, data))
        except:
            print('Error')
            self.lc.pulse(iterations=2)

    def run(self):
        """
        Loops every *self.sleep* seconds and posts the data
        """
        print(WeatherStation.SERVER_ADDRESS)
        while self.running:
            try:
                self.post()
                utime.sleep(self.sleep)
            except:
                self.running = False
                print('Bye')

import machine
import time
import math

class LedControl:
    OFF = 1024
    def __init__(self):
        self.led = machine.PWM(machine.Pin(2), freq=1000)
        self.led.duty(LedControl.OFF)

    def pulse(self, t=20, iterations=1, sleep=0):
        """
        Blinks the builtin LED
        """
        for i in range(iterations):
            for i in range(20):
                self.led.duty(int(math.cos(i / 10 * math.pi) * 500 + 500))
                time.sleep_ms(t)
            self.led.duty(LedControl.OFF)
            time.sleep(sleep)

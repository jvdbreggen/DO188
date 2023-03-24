import time
import signal

# Ignore SIGTERM signals
signal.signal(signal.SIGTERM, signal.SIG_IGN)

while True:
    print('Hello from Red Hat!')
    time.sleep(1)

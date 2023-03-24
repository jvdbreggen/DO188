from os import environ

FILE = environ.get('FILE')

if FILE is None:
    raise RuntimeError('Environment variable FILE not defined')


def read():
    with open(FILE) as f:
        lines = f.readlines()
        print(f"Current content: {lines}")


def write(number):
    with open(FILE, 'a') as f:
        print('Writing another number...')
        f.write(f" {number}")


read()
write(4)
read()

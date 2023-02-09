# remote-ac-controller

The goal of this project is to create a device that can automate my
IR-controllable AC units, either using a DHT sensor or over the internet
while I'm away.

https://user-images.githubusercontent.com/83595468/212430312-2f6c45ab-76fd-4837-91fb-a6bcf532ea33.mp4

## quickstart

requirements:

* redis

```shell
# setup pipenv and install packages
pipenv install
# install npm packages
npm install
# configure app
cp ac_ctl_web/env.example.py ac_ctl_web/env.py
$EDITOR ac_ctl_web/env.py
# database migrations
pipenv run python manage.py migrate
# start development server
honcho start
```

For "deployment" it would be better to use a reverse proxy like nginx. See [`dist/`][dist].

[dist]:https://github.com/prplecake/remote-ac-controller/tree/master/dist

## see also

- [circuit schematic](https://github.com/prplecake/remote-ac-controller/wiki/Schematic)
- [frigidaire ac remote lirc config](https://gist.github.com/prplecake/71c4bc8584541cf7423b922b81733c3a)
- [IRreceiver MCU code](https://github.com/prplecake/IRreceiver)

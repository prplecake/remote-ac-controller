# remote-ac-controller

The goal of this project is to create a device that can automate my
IR-controllable AC units, either using a DHT sensor or over the internet while
I'm away.

<video controls src="https://user-images.githubusercontent.com/83595468/212430312-2f6c45ab-76fd-4837-91fb-a6bcf532ea33.mp4" type="video/mp4">
</video>

## quickstart

This project comes in multiple parts: a [central homeserver][homeserver] that
can support multiple clients. A new [Web UI] and [esp32 sensor] are in
the works.

The old Raspberry Pi client [can be found here][rpi-client].

[homeserver]:https://github.com/prplecake/remote-ac-homeserver
[rpi-client]:https://github.com/prplecake/remote-ac-client
[Web UI]:http://github.com/prplecake/remote-ac-webui
[esp32 sensor]:https://github.com/prplecake/remote-ac-controller-esp32

## see also

- [circuit schematic](https://github.com/prplecake/remote-ac-controller/wiki/Schematic)
- [frigidaire ac remote lirc config](https://gist.github.com/prplecake/71c4bc8584541cf7423b922b81733c3a)
- [IRreceiver MCU code](https://github.com/prplecake/IRreceiver)

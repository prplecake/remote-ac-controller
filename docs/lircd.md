# lircd

[lircd][lircd] is the application that actually sends the codes to the IR blaster.

[lircd]:https://www.lirc.org/html/lircd.html

## setting up lircd

### enable infrared communication on the pi

edit `/boot/config.txt` and uncomment the lines listed for infrared communication, adjusting the `gpio-pin` as necessary.

```text
# Uncomment this to enable infrared communication.
dtoverlay=gpio-ir,gpio_pin=18
dtoverlay=gpio-ir-tx,gpio_pin=17
```

### add the lircd configuration

add the [lircd remote configuration][lircd-config] to `/etc/lirc/lircd.conf.d/`

[lircd-config]:https://gist.github.com/prplecake/71c4bc8584541cf7423b922b81733c3a

## useful lirc commands

* [irrecord](https://www.lirc.org/html/irrecord.html)
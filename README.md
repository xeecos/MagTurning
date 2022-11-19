# MagTurning
### Research
 * Small animal running-wheel activity (RWA) device is used to circadian rhythm research, but the commercial price is high. Here we described how to DIY a simple and intelligent programming rodent RWA device. The running wheel and the Hall-effect sensor was fixed to the cage and the cage cover. The main control board was attached to the computer with the USB cable. Following the steps in this documentation, data were acquired using open-source Magturning in this project. Actogram (https:// www.circadian.org/softwar.html) was used to analysis the output data.
Actogram. 
 * Condition: ﻿housing mice in a 12 h light: 12 h dark cycle
![20221119090704.jpg](https://raw.githubusercontent.com/xeecos/MagTurning/master/images/20221119090704.jpg)

### How To Launch Desktop Software:
1. install nodejs v8.11.3
2. npm install
3. npm run watch && npm start

### Hardware
![1.jpg](https://raw.githubusercontent.com/xeecos/MagTurning/master/images/1.jpg)
```

mCore---                                  |---Slot1 <----> Hall Sensor 1 <----> Magnet 1
       |---Port1 <----> Me RJ25 Adapter---|
       |                                  |---Slot2 <----> Hall Sensor 2 <----> Magnet 2
       |
       |                                  |---Slot1 <----> Hall Sensor 3 <----> Magnet 3
       |---Port2 <----> Me RJ25 Adapter---|
       |                                  |---Slot2 <----> Hall Sensor 4 <----> Magnet 4
       |
       |                                  |---Slot1 <----> Hall Sensor 5 <----> Magnet 5
       |---Port3 <----> Me RJ25 Adapter---|
       |                                  |---Slot2 <----> Hall Sensor 6 <----> Magnet 6
       |
       |                                  |---Slot1 <----> Hall Sensor 7 <----> Magnet 7
       |---Port4 <----> Me RJ25 Adapter---|
                                          |---Slot2 <----> Hall Sensor 8 <----> Magnet 8
```

### Wiring

```
                            |---S1/2 <----> OUT---|
Me RJ25 Adapter---Slot1/2---|---GND  <----> GND---|---Hall Sensor
                            |---VCC  <---->  5V---|
```

![mcore](https://raw.githubusercontent.com/xeecos/MagTurning/master/images/2.jpg)

![rj25 adapter](https://raw.githubusercontent.com/xeecos/MagTurning/master/images/3.jpg)

![hall sensor](https://raw.githubusercontent.com/xeecos/MagTurning/master/images/4.jpg)


#include <Arduino.h>
#include "../lib/IRremote/IRremote.h"

#define DHT_SENSOR_TYPE DHT_TYPE_11

// Initialize pins
static const int IR_RECEIVER_PIN = 3;

// Declare objects
IRrecv irrecv(IR_RECEIVER_PIN);
decode_results results;

/*
 * Initialize the serial port.
 */
__attribute__((unused)) void setup( )
{
    Serial.begin( 9600);
    irrecv.enableIRIn();
}

void translateIR() // takes action based on IR code received
{
    switch(results.value)
    {
        // describing Remote IR codes
        case 0xFFFFFFFF: Serial.println(" REPEAT");break;
        case 0x10AF8877: Serial.println("POWER"); break;
        case 0x10AF708F: Serial.println("TEMP/TIMER UP"); break;
        case 0x10AFB04F: Serial.println("TEMP/TIMER DWN"); break;
        case 0x10AF807F: Serial.println("FAN SPEED+"); break;
        case 0x10AF20DF: Serial.println("FAN SPEED-"); break;
        case 0x10AF906F: Serial.println("COOL"); break;
        case 0x10AF40BF: Serial.println("ENERGY SAVER"); break;
        case 0x10AFE01F: Serial.println("FAN ONLY"); break;
        case 0x10AF00FF: Serial.println("SLEEP"); break;
        case 0x10AFF00F: Serial.println("AUTO FAN"); break;
        case 0x10AF609F: Serial.println("TIMER"); break;
        case 0x10AFF53B: Serial.println("REMOTE SENSING ON"); break;
        case 0x10AFF708: Serial.println("REMOTE SENSING OFF"); break;

        default:
            Serial.print(" other input  ");
            Serial.print("\tvalue: 0x");
            Serial.println(results.value, HEX);

    }// End Case

    delay(500); // Do not get immediate repeat


} //END translateIR


/*
 * Main program loop.
 */
__attribute__((unused)) void loop( )
{

    if (irrecv.decode(&results)) // have we received an IR signal?

    {
        translateIR();
        irrecv.resume(); // receive the next value
    }
}

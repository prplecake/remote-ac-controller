#include <Arduino.h>
#include "../lib/DHT/dht_nonblocking.h"
#include "../lib/IRremote/IRremote.h"

#define DHT_SENSOR_TYPE DHT_TYPE_11

// Initialize pins
static const int DHT_SENSOR_PIN = 2;
static const int IR_RECEIVER_PIN = 11;

// Declare objects
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );
IRrecv irrecv(IR_RECEIVER_PIN);
decode_results results;

/*
 * Initialize the serial port.
 */
void setup( )
{
    Serial.begin( 9600);
    irrecv.enableIRIn();
}

void translateIR() // takes action based on IR code received

// describing Remote IR codes

{

    switch(results.value)

    {
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
 * Poll for a measurement, keeping the state machine alive.  Returns
 * true if a measurement is available.
 */
static bool measure_environment( float *temperature, float *humidity )
{
    static unsigned long measurement_timestamp = millis( );

    /* Measure once every four seconds. */
    if( millis( ) - measurement_timestamp > 3000ul )
    {
        if(dht_sensor.measure(temperature, humidity))
        {
            measurement_timestamp = millis( );
            return( true );
        }
    }

    return( false );
}



/*
 * Main program loop.
 */
void loop( )
{
    float temperature;
    float humidity;

    /* Measure temperature and humidity.  If the functions returns
       true, then a measurement is available. */
    if( measure_environment( &temperature, &humidity ) == true )
    {
        float temp_f = temperature * 1.8000 + 32.00;
        Serial.print( "T = " );
        Serial.print( temp_f, 2 );
        Serial.print( " deg. F, H = " );
        Serial.print( humidity, 2 );
        Serial.println( "%" );
    }

    if (irrecv.decode(&results)) // have we received an IR signal?

    {
        translateIR();
        irrecv.resume(); // receive the next value
    }
}

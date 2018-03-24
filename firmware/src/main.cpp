#include <Arduino.h>
int pins[8] = {11, 12, 9, 10, A2, A3, A0, A1};
int status[8] = {};
int counts[8] = {};
String str = "";
void setup()
{
    Serial.begin(115200);
    for (int i = 0; i < 8; i++)
    {
        pinMode(pins[i], INPUT_PULLUP);
        status[i] = 1;
        counts[i] = 0;
    }
}
String buffer = "";
void loop()
{
    if (Serial.available())
    {
        char c = Serial.read();
        if (c == '\n')
        {
            if (buffer.equals("reset"))
            {
                for (int i = 0; i < 8; i++)
                {
                    counts[i] = 0;
                }
            }
            buffer = "";
        }
        else
        {
            buffer += c;
        }
    }
    bool changed = false;
    for (int i = 0; i < 8; i++)
    {
        int j = digitalRead(pins[i]);
        if (j != status[i])
        {
            status[i] = j;
            counts[i] += 1;
            changed = true;
        }
    }
    if (changed)
    {
        str = "";
        for (int i = 0; i < 8; i++)
        {
            str += counts[i];
            if (i < 7)
                str += ",";
        }
        Serial.println(str);
    }
}
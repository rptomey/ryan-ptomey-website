---
title: cs50x Coursework - Credit Card Number Validation in C
date: "2021-05-19"
description: "Code written in C to validate credit cards using Luhn's algorithm, then detect Visa, Mastercard, or AmEx numbers."
---
## Project Abstract
The second week of Harvard's [cs50x course](https://cs50.harvard.edu/x/2021/) asks students to start working in actual, written code using C. Students were given two homework assignments, each with two levels of difficulty to pick from.

Assignment 2's harder option was to write a code that would accept credit card numbers, then run them though a series of tests. Anything not meeting these conditions should return 'INVALID'; otherwise, the code should return the type of the card.
* All card numbers were expected to be between 13 and 16 numeric characters long and formatted without spaces or dashes.
* Using [Luhn's algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm), the final checksum should end in 0.
* Visa cards begin with 4, Mastercard with 51 through 55, and AmEx with either 34 or 37.

## Project Deliverable
```c
#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>
#include <string.h>

// Declare all the functions we'll need so that compiling works.
bool checkLength(int x);
string checkType(string y);
bool checkLuhn(string z, int q);

int main(void)
{
    long cardLong = get_long("Enter a credit card number: ");

    // I'm more comfortable working with strings, so I did this the hard way.
    char buffer[16];
    sprintf(buffer, "%ld", cardLong);

    string cardString = buffer;

    int cardLength = strlen(cardString);

    bool validLength = checkLength(cardLength);

    // Do some of the validation before even checking for the card type.
    if (validLength && checkLuhn(cardString, cardLength))
    {
        printf("%s\n", checkType(cardString));
    }
    else
    {
        printf("INVALID\n");
    }
}

bool checkLength(int x)
{
    // Could probably have asked for a min and max based on card type, but not important for this assignment.
    if (x >= 13 && x <= 16)
    {
        return true;
    }
    else
    {
        return false;
    }
}

string checkType(string y)
{
    char firstDigit = y[0];
    char secondDigit = y[1];

    // Visa just has to start with 4.
    if (firstDigit == '4')
    {
        return "VISA";
    }
    // Mastercard can start with 51 through 55.
    else if (firstDigit == '5')
    {
        if (secondDigit == '1' || secondDigit == '2' || secondDigit == '3' || secondDigit == '4' || secondDigit == '5')
        {
            return "MASTERCARD";
        }
        else
        {
            return "INVALID";
        }
    }
    // Amex can start with 34 or 37.
    else if (firstDigit == '3')
    {
        if (secondDigit == '4' || secondDigit == '7')
        {
            return "AMEX";
        }
        else
        {
            return "INVALID";
        }
    }
    else
    {
        return "INVALID";
    }
}

bool checkLuhn(string z, int q)
{
    // For more information, look up Luhn's Algorithm.
    int sum = 0;

    for (int i = 0; i < q; i++)
    {
        char digit = z[q - i - 1];
        // As characters, 0-9 are represented by sequential ASCII numbers.
        // Therefore, subtracting the character '0' leaves you with the actual number as an integer.
        // For example, if '1' is 49 and '0' is 48, subtracting 48 from 49 leaves you with 1.
        int num = digit - '0';

        // For every other digit, do some complex math before adding it to the sum.
        if ((i + 1) % 2 == 0)
        {
            int dub = num * 2;

            // If the doubled number is greater than 9, add its digits, not its total (i.e. + 1 + 4, not + 14).
            if (dub > 9)
            {
                sum = sum + (dub % 10) + 1;
            }
            else
            {
                sum = sum + (num * 2);
            }
        }
        // The other digits are easy.
        else
        {
            sum = sum + num;
        }
    }

    // After all this math, if the sum ends in zero, it's good.
    if (sum % 10 == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
```

### Notes and Credits
I'm indebted to StackOverflow for helping me figure out how to change a long to a string, then how to convert a single number stored as a character back into an integer.

I also am thankful to my Discord server for helping me catch an error in my understanding of the algorithm. Originally, I thought that the doubled numbers merely had to be added to the checksum, but instead, it is their digits that should be added. For example, 7 doubled should be added as `+ 1 + 4` instead of `+ 14`.

## Project Details and Discussion
Having done some more research and talked to some folks with more experience in C, I have learned that I probably could have made things easier on myself by leveraging more modular division and using log10 to get the length; however, I initially had a clearer idea of how to approach the problem using strings and arrays.

since this was a an assignment for a class, it felt more academically honest to push through with my original idea. Unfortunately, I also learned through this project that strings aren't very easy to work with in C.

If I had to re-write it for efficiency, I would definitely change my approach. But since we'll be moving onto other assignments in the coming weeks, I don't expect to return to this - unless approaching it in a more modern language.

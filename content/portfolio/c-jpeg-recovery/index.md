---
title: cs50x Coursework - Recovering JPEG Files in C
date: "2021-06-01"
description: "Code written in C to recover JPEG files from a raw file."
---
## Project Abstract
The fifth week of Harvard's [cs50x course](https://cs50.harvard.edu/x/2021/) goes deeper into coding in C, introducing hexadecimal numbering, working with files, and managing memory. Students were given two homework assignments, with the latter being given to all students regardless of comfort level.

In this assignment, we were parsing raw data to find the beginnings of JPEGs, the saving them as discrete .jpg files.

## Project Deliverable

```c
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include <stdint.h>

typedef uint8_t BYTE;

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("ERROR: Expected exactly 1 command line argument of filename.\n");
        return 1;
    }

    // Capture filename from command line argument.
    char *infile = argv[optind];

    // Open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "ERROR: Could not open %s.\n", infile);
        return 1;
    }

    // Initialize other variables.
    BYTE buffer[512];
    int jpgNum = 0;
    char outfile[8];
    FILE *img = NULL;

    // Read from input file to buffer, and keep going until out of data.
    while (fread(&buffer, 512, 1, inptr) == 1)
    {
        // Check whether this is the start of a new jpeg.
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // Closing the open file doesn't make sense on the first go around, but we'll do it every other time.
            if (jpgNum > 0)
            {
                fclose(img);
            }

            // Build output file name and open it.
            sprintf(outfile, "%03i.jpg", jpgNum);
            img = fopen(outfile, "w");

            // Remember to increase the count before we find a new file.
            jpgNum++;
        }

        // Write to the open file, assuming there's at least 1 jpeg.
        if (jpgNum > 0)
        {
            fwrite(&buffer, 512, 1, img);
        }
    }

    fclose(inptr);
    fclose(img);
    return 0;
}
```

## Notes and Credits
Thanks to members of the cs50 Discord for helping me catch my "off by one" errors.

## Project Details and Discussion
To be completed eventually...

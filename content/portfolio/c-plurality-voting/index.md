---
title: cs50x Coursework - Plurality Election in C
date: "2021-06-01"
description: "Code written in C to calculate the results of a plurality election."
---
## Project Abstract
The fourth week of Harvard's [cs50x course](https://cs50.harvard.edu/x/2021/) goes deeper into coding in C, introducing both sorting and algorithms. Students were given two homework assignments, and the latter offered two levels of difficulty to pick from.

*Additional writeup to come later.*

## Project Deliverable

```c
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
}
candidate;

// Array of candidates
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
    }

    int voter_count = get_int("Number of voters: ");

    // Loop over all voters
    for (int i = 0; i < voter_count; i++)
    {
        string name = get_string("Vote: ");

        // Check for invalid vote
        if (!vote(name))
        {
            printf("Invalid vote.\n");
        }
    }

    // Display winner of election
    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    for (int j = 0, n = candidate_count; j < n; j++)
    {
        if (strcmp(candidates[j].name, name) == 0)
        {
            candidates[j].votes++;
            return true;
        }
    }

    return false;
}

// Print the winner (or winners) of the election
void print_winner(void)
{
    int highest_vote_total = 0;

    for (int k = 0, n = candidate_count; k < n; k++)
    {
        if (candidates[k].votes > highest_vote_total)
        {
            highest_vote_total = candidates[k].votes;
        }
    }

    for (int l = 0, n = candidate_count; l < n; l++)
    {
        if (candidates[l].votes == highest_vote_total)
        {
            printf("%s\n", candidates[l].name);
        }
    }

    return;
}
```

## Notes and Credits
*Additional writeup to come later.*

## Project Details and Discussion
*Additional writeup to come later.*

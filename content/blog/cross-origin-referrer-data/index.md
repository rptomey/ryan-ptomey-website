---
title: Cross Origin Referrer Data - Impacts of a Changing Privacy Landscape
date: "2021-05-20"
description: "How default browser privacy settings affect referrer data collection."
---

Recently, I was tasked with an investigation for a client who wondered why the data had changed in one of their custom dimensions. It was a [hit-scoped dimension](/blog/dimensions-metrics-and-scopes) designated for collecting the full referrer responsible for driving a visitor to that page.

To illustrate what I mean by full referrer, imagine that a link to this page lived on `https://www.example.com/good-blog-articles`. When a visitor clicks that link, my site (and tracking) should be able to see where the traffic came from, but there are a few different levels of granularity at play. If I'm getting all of it, then I would expect that full URL, including the `protocol` (https), the `hostname` (www.example.com), and the `page path` (/good-blog-articles). However, in some cases, I might only get the `hostname`, and if the user is on a more privacy-conscious browser like Brave, I might not get anything.

What governs how much data I can get from a referrer? There are two primary factors:
1. The relationship between the site that the user came from and the site that the user landed on.
2. The referrer policy settings.

## Site Relationships
In order to understand referrer policy settings, we have to dive into `origin`. This is going to get technical, so bear with me. If you want some more examples or an explanation of how `same-origin` differs from `same-site`, [this blog by Eiji Kitamura](https://web.dev/same-site-same-origin/) is very helpful.

`origin` comprises 3 parts of a URL: the `protocol`, the `hostname`, and the `port`. Most web users likely won't run into ports outside the context of, perhaps, configuring router settings, so I won't linger on that.

When looking at the relationship between two pages, there are really only two classifications where `origin` is concerned: `same-origin` and `cross-origin`. If all elements remain the same, then it's the former, but if any one of these changes (implicit port number aside), then it's `cross-origin` instead.

To go back to the previous example (`https://www.example.com/good-blog-articles`), that page's origin is `https://www.example.com` - no more, no less. Meanwhile, the `origin` of the page you're looking at right now is `https://ryanptomey.com`. In this case, the relationship between the two sites is `cross-origin`.

To illustrate further, even links on the same site can be considered `cross-origin`. If I had a subdomain of `https://blog.ryanptomey.com`, then any movement between it and my main site would also be considered `cross-origin`.

And to really drive the point home, what would `same-origin` be? If you went from this page to my Resources page [https://ryanptomey.com/resources](/resources), that journey would be considered `same-origin` because the only thing changing is the page path.

## Referrer Policy Settings
This brings us to the other factor at play: referrer policy settings. When a request is sent from one site to another, the referrer policy governs how much data should be included in the request. A site's owner can set referrer policy settings in the HTTP header or the HTML, but if the owner hasn't set one, then the user's browser default will determine the settings used.

There are [a handful of different policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy), but we only need to discuss two: `no-referrer-when-downgrade` and `strict-origin-when-cross-origin`.

The former policy, `no-referrer-when-downgrade` was the default policy for browsers for awhile, and it was the more permissive of the two. Ultimately, it would pass everything (`origin`, `page path`, and `query string`) as long as the protocol between the two sites wasn't a downgrade (i.e. going from HTTPS to HTTP).

Privacy conscious site owners could opt for more strict settings, of course, but under this security policy and the example I keep coming back to, I would be able to see a full referrer of `https://www.example.com/good-blog-articles`. Therefore, I would know not only what site had driven traffic to mine but also what specific content had linked here.

[As of late 2020](https://developers.google.com/web/updates/2020/07/referrer-policy-new-chrome-default), all of the major web browsers have changed their default policy to `strict-origin-when-cross-origin`. This basically does what it says on the tin. If the journey from one site to another is classified as `cross-origin`, then the only thing that the referrer will include is the `origin`. That said, if it's `same-origin`, then we get the full referrer still.

It's worth noting that, as a website owner, I can control my referrer policy settings, but I can't change what the owners of `example.com` have opted to use. If I'm paying for placements, I'll still have ways of evaluating their performance, but in terms of what I can get from a referrer, the landscape has definitely changed.

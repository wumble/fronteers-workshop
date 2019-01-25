---
layout: layouts/base.njk
title: All editions of the meetup
---

## Listings

All the editions past and futureAll editions of the meetups

<ul>
{% for edition in collections.editions | reverse %}
{% set item = edition %}
{% include "edition-details.njk" %}
{% endfor %}
</ul>

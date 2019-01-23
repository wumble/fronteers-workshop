---
layout: layouts/base.njk
title: My meetup is amazing
---


## Is it amazing?

Yes it is. Here are the meetups we've had so far


## Editions
<ul>
{% for edition in collections.editions | reverse %}
{% set item = edition %}
{% include "edition-details.njk" %}
{% endfor %}
</ul>


## Subscribe

Never miss out. You can subscribe to an [RSS feed](/feed.xml) of the meetups.

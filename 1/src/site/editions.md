---
layout: layouts/base.njk
title: Editions
---

## All editions of the meetups

<ul>
{% for edition in collections.editions | reverse %}
{% set item = edition %}
{% include "edition-details.njk" %}
{% endfor %}
</ul>

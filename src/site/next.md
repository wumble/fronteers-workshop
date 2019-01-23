---
layout: layouts/base.njk
title: Next meetup
---

## Next edition

{% if collections.futureEditions.length %}
Next planned edition of the meetup
<ul>
{% set item = collections.futureEditions | first %}
{% include "edition-details.njk" %}
</ul>
{% else %}
There currently are no editions planned. Check out the previous editions:
<ul>
{% for edition in collections.previousEditions | reverse %}
{% set item = edition %}
{% include "edition-details.njk" %}
{% endfor %}
</ul>
{% endif %}

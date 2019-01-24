---
layout: layouts/base.njk
title: About this site
---


## About

Some info about this site.
There is more of this sort of thing on Medium.

<ul class="listing">
{% for item in medium.posts %}
  <li>
    <a href="{{ item.link }}">{{ item.title }}</a>
    <p class="meta">Published on {{ item.pubDate | dateDisplay }} by {{ item['dc:creator'] }}</p>
  </li>
 {% endfor %}
 </ul>


{% extends './layouts/main.swig' %}

{% block content %}
    {% for page in pages %}
        <a href="/calcul/{{page.name}}"/>{{page.name}}</a>
    {% endfor %}
{% endblock %}
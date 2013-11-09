<html>
    <head>
        <title>{{ title }}</title>
        <link rel="stylesheet" href="/stylesheets/libs.css"/>
        <link rel="stylesheet" href="/stylesheets/main.css"/>
    </head>
    <body>

        {% include "../partials/menu.swig" %}

        <div class="container">
            <div class="page-header">
                <div class="col-md-offset-1">
                    <h1>Salut {{ title }}</h1>
                </div>
            </div>
            {% block content %}{% endblock %}
        </div>
        {% include "../partials/footer.swig" %}
    </body>

    <script src="/javascripts/libs.js"></script>
    {% block scripts %}{% endblock %}
</html>
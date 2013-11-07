

{% extends './main.swig' %}

{% block content %}
    <div class="row">
        <div class="col-lg-1">
            {% include "../partials/pub_left.swig" %}
        </div>

        {% block calcul-content %}{% endblock %}

        <div class="col-md-offset-1 col-lg-3">
            {% include "../partials/menu_right.swig" %}
        </div>

    </div>
    
    {% include "../partials/social.swig" %}
{% endblock %}

{% block scripts %}
    <script type="text/javascript" src="/javascripts/{{pageName}}.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.2/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
          tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
        });
    </script>
{% endblock %}

</html>
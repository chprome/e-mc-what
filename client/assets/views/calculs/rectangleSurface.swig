{% extends '../layouts/calcul.swig' %}


{% block calcul-content %}
    <div class="col-md-offset-1 col-lg-6">
        <div id="formula">
            \[\rm surface = largeur \times hauteur\]
        </div>
        <div class="text-center">
            <form role="form" class="form-inline">
                <div class="form-group">
                    <input type="text" class="form-control input-sm" id="width" placeholder="Largeur">
                </div>
                x
                <div class="form-group">
                    <input type="text" class="form-control input-sm" id="height" placeholder="Hauteur">
                </div>
                <div class="form-group" id="result-wrapper">
                    <label> = </label>
                    <span id="result"></span>
                </div>
            </form>
            <canvas id="drawing"></canvas>
        </div>
    </div>
{% endblock %}
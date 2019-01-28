<script id="punto-popupcontent-template" type="text/x-handlebars-template">
    {{#with properties}}
    <p class="mb-0">
        <span class="font-weight-light pr-2">Descripcion:</span>
        <span class="font-weight-bold text-capitalize">{{descripcion}}</span>
    </p>
    {{/with}}
</script>
<script id="region-popupcontent-template" type="text/x-handlebars-template">
    
    {{#with properties}}
    <p class="mb-0">
        <span class="font-weight-light pr-2">Distrito:</span>
        <span class="font-weight-bold text-capitalize">{{NOMBDIST}}</span>
    </p>
    <p class="my-0">
        <span class="font-weight-light pr-2">Provincia:</span>
        <span class="font-weight-bold text-capitalize">{{NOMBPROV}}</span>
    </p>
    <p class="mt-0">
        <span class="font-weight-light pr-2">Departamento:</span>
        <span class="font-weight-bold text-capitalize">{{NOMBDEP}}</span>
    </p>
    {{/with}}
</script>
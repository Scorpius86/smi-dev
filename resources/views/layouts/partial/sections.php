<script id="secciones-template" type="text/x-handlebars-template">
    <ul class="bg-light">
        {{#each secciones}}
        <li class="sidebar-dropdown">
            <a href="#" class="border-2 border-left border-menu-item d-block">
                <div class="d-inline-flex align-items-center pl-2 bg-white">
                    <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                    <span>{{nombre}}</span>
                </div>
            </a>
            {{#if hasChildren}}
            <div class="sidebar-submenu">
                <ul class="py-0">
                    {{#each children}}
                    <li class="bg-light">
                        <a class="d-block" href="#">
                            <div class="d-inline-flex align-items-center">
                                <i class="mr-2 fas fa-map-marker-alt"></i>
                                <!-- custom-control-input-->
                                <input type="checkbox" class="d-none menu-item" data-value="{{json this}}" data-parent="{{json ../this}}" id="{{id}}">
                                <label class="mb-0" for="{{id}}">{{nombre}}</label>
                            </div>
                        </a>
                    </li>
                    {{/each}}
                </ul>
            </div>
            {{/if}}
        </li>
        {{/each}}
        <li class="header-menu">
            <span>Mostrar</span>
            <div class="sidebar-submenu">
                <ul>
                    <li>
                        <a href="#">Google maps</a>
                    </li>
                    <li>
                        <a href="#">Open street map</a>
                    </li>
                </ul>
            </div>
        </li>
        <li>
            <button class="d-block w-100 rounded-0 btn btn-primary">
                <span>Salir</span>
                <i class="fas fa-sign-out-alt ml-1"></i>
            </button>
        </li>
    </ul>
</script>
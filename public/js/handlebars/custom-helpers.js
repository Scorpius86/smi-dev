jQuery(function ($) {
    RegisterHandlebarsHelpers();
});

function RegisterHandlebarsHelpers() {
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
    Handlebars.registerHelper('first', function (items, options) {
        return options.fn(items[0]);
    });
    Handlebars.registerHelper('bold', function (property) {
        return new Handlebars.SafeString("<strong>" + property + "</strong");
    });
    Handlebars.registerHelper('fixed', function (property) {
        return parseFloat(property, 10).toFixed(2);
    });
    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
        var operators, result;
        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }
        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }
        operators = {
            '==': function (l, r) {
                return l == r;
            },
            '===': function (l, r) {
                return l === r;
            },
            '!=': function (l, r) {
                return l != r;
            },
            '!==': function (l, r) {
                return l !== r;
            },
            '<': function (l, r) {
                return l < r;
            },
            '>': function (l, r) {
                return l > r;
            },
            '<=': function (l, r) {
                return l <= r;
            },
            '>=': function (l, r) {
                return l >= r;
            },
            'typeof': function (l, r) {
                return typeof l == r;
            }
        };
        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }
        result = operators[operator](lvalue, rvalue);
        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
}
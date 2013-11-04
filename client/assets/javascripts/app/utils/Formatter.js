function Formatter() {}

Formatter.number = function(number, separator) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

module.exports = Formatter;
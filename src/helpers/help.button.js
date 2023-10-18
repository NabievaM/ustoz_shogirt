const { Keyboard } = require("grammy");

const bolim = new Keyboard().text("Sherik kerak").resized().text("Ish joyi kerak").resized().row()
.text("Hodim kerak").resized().text("Ustoz kerak").resized().row()
.text("Shogird kerak").resized();
const YesNo = new Keyboard().text("Ha").resized().text(`Yoq`).resized();

module.exports = { bolim, YesNo };
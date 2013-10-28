module.exports = function getMenu(app, currentUrl) {
	app.locals({
		menuItems : [
            {url: "/", nom: "accueil", active: currentUrl === "/"}
		]
	});
};

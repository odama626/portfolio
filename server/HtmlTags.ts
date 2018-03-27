let scripts = `
	<script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js'></script>
	<script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js'></script>
	<script defer type='text/javascript' src='/res/main.js'></script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
`;
let styles = `
	<meta name="viewport" content="width=device-width, user-scalable=no"/>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

	<link rel="apple-touch-icon" sizes="180x180" href="/res/icons/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/res/icons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/res/icons/favicon-16x16.png">
	<link rel="manifest" href="/res/icons/site.webmanifest">
	<link rel="mask-icon" href="/res/icons/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="/res/icons/favicon.ico">
	<meta name="msapplication-TileColor" content="#603cba">
	<meta name="msapplication-config" content="/res/icons/browserconfig.xml">
	<meta name="theme-color" content="#262626">
`;

if (ENV.DEPLOY_TARGET === ENV.TARGET_DEV) {
  styles += `<link rel='stylesheet' type='text/css' href='http://localhost:${+ENV.PORT + 1}/main.css'>`;
  scripts = `<script src="http://localhost:${+ENV.PORT + 1}/main.js"></script>`;
} else {
	styles += `<link rel="stylesheet" type="text/css" href="/res/main.css">`;
	scripts += `
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-81658884-4"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-81658884-4');
		</script>
`
}

export default { styles, scripts };

let scripts = `
	<script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js'></script>
	<script defer type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js'></script>
	<script defer type='text/javascript' src='/res/main.js'></script>
`;
let styles = `
	<meta name="viewport" content="width=device-width, user-scalable=no"/>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<meta name="theme-color" content="#262626">
`;

if (ENV.DEPLOY_TARGET === ENV.TARGET_DEV) {
  styles += `<link rel='stylesheet' type='text/css' href='http://localhost:${+ENV.PORT + 1}/main.css'>`;
  scripts = `<script src="http://localhost:${+ENV.PORT + 1}/main.js"></script>`;
} else {
  styles += `<link rel="stylesheet" type="text/css" href="/res/main.css">`;
}

export default { styles, scripts };
